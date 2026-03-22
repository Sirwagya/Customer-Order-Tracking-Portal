import type { Comment, BookPageData } from "../app/components/book/types";

export const MOCK_BOOK_PAGES: BookPageData[] = [
  {
    pageNumber: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1598618137594-8e7657a6ef6a?auto=format&fit=crop&q=80&w=1080",
  },
  {
    pageNumber: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1558022802-bdce91bf1cf4?auto=format&fit=crop&q=80&w=1080",
  },
  {
    pageNumber: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1505682855160-50d24bf4a04d?auto=format&fit=crop&q=80&w=1080",
  },
  {
    pageNumber: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1080",
  },
  {
    pageNumber: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1080",
  },
];

export const MOCK_INITIAL_COMMENTS: Comment[] = [
  {
    id: "c1",
    pageNumber: 1,
    text: "Love the cover design! The colors are perfect for Emma.",
    status: "resolved",
    createdAt: "2023-10-14T10:24:00Z",
    author: "Mama Sarah",
  },
  {
    id: "c2",
    pageNumber: 2,
    text: "Could we make the dragon in the background look a bit more friendly? Emma's a bit of a scaredy-cat! 🐉",
    status: "open",
    createdAt: "2023-10-14T10:24:00Z",
    author: "Mama Sarah",
  },
  {
    id: "c3",
    pageNumber: 2,
    text: "Absolutely! I'll soften the expression and give him a little wave. How does that sound?",
    status: "open",
    createdAt: "2023-10-14T10:45:00Z",
    author: "Editor Ben",
  },
  {
    id: "c4",
    pageNumber: 2,
    text: 'That would be perfect! Also, on this page, let\'s change "forest" to "enchanted woods".',
    status: "open",
    createdAt: "2023-10-14T11:02:00Z",
    author: "Mama Sarah",
  },
];
