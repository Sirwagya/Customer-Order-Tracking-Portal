"""Book upload and page retrieval routes."""

import io
from fastapi import APIRouter, HTTPException, UploadFile, File
from pdf2image import convert_from_bytes
from PIL import Image

from ..models import BookPageResponse, BookUploadResponse
from ..database import get_books_collection
from ..storage import upload_file, delete_folder

router = APIRouter(prefix="/api/books", tags=["books"])

# WebP conversion settings
WEBP_DPI = 150
WEBP_QUALITY = 90


def pdf_page_to_webp(pil_image: Image.Image) -> bytes:
    """Convert a PIL Image (from pdf2image) to WebP bytes."""
    buffer = io.BytesIO()
    pil_image.save(buffer, format="WEBP", lossless=True, quality=WEBP_QUALITY)
    return buffer.getvalue()


@router.post("/{order_id}", response_model=BookUploadResponse)
async def upload_book(order_id: str, file: UploadFile = File(...)):
    """Upload a PDF book for an order. Converts each page to WebP and stores in Supabase."""

    # Validate file type
    if not file.content_type or "pdf" not in file.content_type.lower():
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    # Read the PDF bytes
    pdf_bytes = await file.read()
    if len(pdf_bytes) == 0:
        raise HTTPException(status_code=400, detail="Empty file uploaded")

    # Convert PDF pages to PIL images
    try:
        pil_pages = convert_from_bytes(pdf_bytes, dpi=WEBP_DPI)
    except Exception as e:
        raise HTTPException(
            status_code=422,
            detail=f"Failed to process PDF: {str(e)}. Is Poppler installed?",
        )

    # Delete existing pages for this order (in case of re-upload)
    delete_folder(order_id)

    # Convert each page to WebP and upload to Supabase
    pages = []
    for i, pil_page in enumerate(pil_pages):
        page_number = i + 1
        webp_bytes = pdf_page_to_webp(pil_page)
        storage_path = f"{order_id}/page_{page_number}.webp"

        try:
            public_url = upload_file(storage_path, webp_bytes)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to upload page {page_number}: {str(e)}",
            )

        pages.append({
            "page_number": page_number,
            "image_url": public_url,
        })

    # Save page metadata to MongoDB
    collection = get_books_collection()

    # Upsert: replace if book already exists for this order
    await collection.update_one(
        {"order_id": order_id},
        {"$set": {
            "order_id": order_id,
            "pages": pages,
            "total_pages": len(pages),
        }},
        upsert=True,
    )

    return BookUploadResponse(
        order_id=order_id,
        total_pages=len(pages),
        pages=[BookPageResponse(**p) for p in pages],
    )


@router.get("/{order_id}/pages")
async def get_book_pages(order_id: str):
    """Fetch all page URLs for a book by order ID."""
    collection = get_books_collection()

    doc = await collection.find_one({"order_id": order_id})
    if not doc:
        raise HTTPException(status_code=404, detail="No book found for this order")

    return {
        "order_id": order_id,
        "total_pages": doc.get("total_pages", 0),
        "pages": doc.get("pages", []),
    }
