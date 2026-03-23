from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.reviews import router as reviews_router

app = FastAPI(title="OnceUponMe Review API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reviews_router)


@app.get("/api/health")
async def health():
    return {"status": "ok"}
