import type { BookPageData } from "../app/components/book/types";

const API_BASE = "/api/books";

/**
 * Fetch all book page URLs for a given order.
 * Returns an array of { pageNumber, imageUrl } objects.
 */
export async function fetchBookPages(
  orderId: string
): Promise<BookPageData[]> {
  const res = await fetch(`${API_BASE}/${orderId}/pages`);

  if (res.status === 404) {
    // No book uploaded for this order yet
    return [];
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch book pages: ${res.statusText}`);
  }

  const data = await res.json();

  // Map snake_case API response to camelCase frontend types
  return (data.pages || []).map(
    (p: { page_number: number; image_url: string }) => ({
      pageNumber: p.page_number,
      imageUrl: p.image_url,
    })
  );
}
