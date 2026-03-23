from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ReviewComment(BaseModel):
    page_number: int
    text: str
    author: Optional[str] = "Customer"
    created_at: Optional[str] = None


class ReviewSubmission(BaseModel):
    order_id: str
    comments: list[ReviewComment]


class ReviewResponse(BaseModel):
    id: str
    order_id: str
    comments: list[ReviewComment]
    submitted_at: str
    status: str = "submitted"
