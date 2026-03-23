import React, { useState, useRef } from "react";
import { X, ChevronLeft } from "lucide-react";
import { BookPage } from "./BookPage";
import { PageComments } from "./PageComments";
import { ReviewActions } from "./ReviewActions";
import type { Comment } from "./types";
import { MOCK_BOOK_PAGES } from "../../../data/mockData";
import { submitReview } from "../../../api/reviewApi";

interface BookViewerProps {
  readonly onClose: () => void;
  readonly orderId: string;
  readonly childName?: string;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  onClose,
  orderId,
  childName = "Emma",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track IDs of comments added in this session (new/unsaved ones)
  const sessionCommentIds = useRef<Set<string>>(new Set());

  const totalPages = MOCK_BOOK_PAGES.length;
  const currentImage =
    MOCK_BOOK_PAGES.find((p) => p.pageNumber === currentPage)?.imageUrl || "";
  const currentComments = comments.filter((c) => c.pageNumber === currentPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleAddComment = (text: string) => {
    const id = crypto.randomUUID();
    const newComment: Comment = {
      id,
      pageNumber: currentPage,
      text,
      status: "open",
      createdAt: new Date().toISOString(),
      author: "You",
    };
    sessionCommentIds.current.add(id);
    setComments((prev) => [...prev, newComment]);
  };

  const handleRequestChanges = async () => {
    // Only submit comments from this session
    const newComments = comments.filter((c) => sessionCommentIds.current.has(c.id));
    if (newComments.length === 0) return;

    setIsSubmitting(true);
    try {
      await submitReview(orderId, newComments);
      sessionCommentIds.current.clear();
      setComments([]);
      alert("Changes submitted successfully! We'll get right on it ✨");
      onClose();
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const approvalComment: Comment = {
        id: crypto.randomUUID(),
        pageNumber: 0,
        text: "Book approved for printing",
        status: "resolved",
        createdAt: new Date().toISOString(),
        author: "You",
      };
      await submitReview(orderId, [approvalComment]);
      sessionCommentIds.current.clear();
      setComments([]);
      alert("Book approved for printing! Your story is on its way 🌟");
      onClose();
    } catch (err) {
      console.error("Failed to approve:", err);
      alert("Failed to approve. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#FDFBF7] overflow-hidden flex flex-col font-['OnceUponMe','Nunito',sans-serif]">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 h-16 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-slate-500 hover:text-[#1E293B] transition-colors font-bold text-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to Order</span>
        </button>

        <h1 className="text-lg sm:text-xl font-extrabold text-[#1E293B] absolute left-1/2 -translate-x-1/2">
          Review {childName}'s Story
        </h1>

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-6 pb-32 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          {/* Left: Book Page View (60%) */}
          <div className="lg:col-span-6">
            <BookPage
              imageUrl={currentImage}
              pageNumber={currentPage}
              totalPages={totalPages}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>

          {/* Right: Comments Panel (40%) */}
          <aside className="lg:col-span-4">
            <PageComments
              comments={currentComments}
              onAddComment={handleAddComment}
            />
          </aside>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <ReviewActions
        onRequestChanges={handleRequestChanges}
        onApprove={handleApprove}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default BookViewer;
