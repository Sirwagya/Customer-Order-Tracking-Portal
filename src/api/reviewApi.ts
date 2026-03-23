import type { Comment } from "../app/components/book/types";

const API_BASE = "/api/reviews";

interface ReviewPayload {
  order_id: string;
  comments: {
    page_number: number;
    text: string;
    author: string;
    created_at: string;
  }[];
}

export async function submitReview(
  orderId: string,
  comments: Comment[]
): Promise<void> {
  const payload: ReviewPayload = {
    order_id: orderId,
    comments: comments.map((c) => ({
      page_number: c.pageNumber,
      text: c.text,
      author: c.author || "Customer",
      created_at: c.createdAt,
    })),
  };

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit review: ${res.statusText}`);
  }
}

export async function fetchReviews(orderId: string) {
  const res = await fetch(`${API_BASE}/${orderId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch reviews: ${res.statusText}`);
  }
  return res.json();
}
