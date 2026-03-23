from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone

from ..models import ReviewSubmission, ReviewResponse
from ..database import get_reviews_collection

router = APIRouter(prefix="/api/reviews", tags=["reviews"])


@router.post("/", response_model=ReviewResponse)
async def submit_review(submission: ReviewSubmission):
    """Save a book review submission to MongoDB."""
    collection = get_reviews_collection()

    doc = {
        "order_id": submission.order_id,
        "comments": [c.model_dump() for c in submission.comments],
        "submitted_at": datetime.now(timezone.utc).isoformat(),
        "status": "submitted",
    }

    result = await collection.insert_one(doc)

    return ReviewResponse(
        id=str(result.inserted_id),
        order_id=doc["order_id"],
        comments=submission.comments,
        submitted_at=doc["submitted_at"],
        status=doc["status"],
    )


@router.get("/{order_id}")
async def get_reviews(order_id: str):
    """Fetch all reviews for a given order."""
    collection = get_reviews_collection()

    cursor = collection.find({"order_id": order_id}).sort("submitted_at", -1)
    reviews = []

    async for doc in cursor:
        reviews.append(
            ReviewResponse(
                id=str(doc["_id"]),
                order_id=doc["order_id"],
                comments=doc["comments"],
                submitted_at=doc["submitted_at"],
                status=doc.get("status", "submitted"),
            )
        )

    return reviews
