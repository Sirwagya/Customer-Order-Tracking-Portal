export type Comment = {
  id: string;
  pageNumber: number;
  text: string;
  status: "open" | "resolved";
  createdAt: string;
  author?: string;
};

export type OrderStatus =
  | "placed"
  | "customization"
  | "review"
  | "changes_requested"
  | "approved"
  | "production"
  | "shipped"
  | "delivered";

export type BookPageData = {
  pageNumber: number;
  imageUrl: string;
};
