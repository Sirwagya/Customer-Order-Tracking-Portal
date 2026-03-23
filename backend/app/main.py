from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.reviews import router as reviews_router
from .routes.books import router as books_router

app = FastAPI(title="OnceUponMe Review API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Vercel, localhost, etc)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reviews_router)
app.include_router(books_router)


@app.get("/api/health")
async def health():
    return {"status": "ok"}
