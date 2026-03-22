import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookPageProps {
  readonly imageUrl: string;
  readonly pageNumber: number;
  readonly totalPages: number;
  readonly onNext: () => void;
  readonly onPrev: () => void;
  readonly className?: string;
}

export const BookPage: React.FC<BookPageProps> = ({
  imageUrl,
  pageNumber,
  totalPages,
  onNext,
  onPrev,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Book Image Card */}
      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 sm:p-6 border border-slate-100 overflow-hidden">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={`Page ${pageNumber}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex gap-3">
          <button
            onClick={onPrev}
            disabled={pageNumber <= 1}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-[#1E293B] hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            disabled={pageNumber >= totalPages}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-[#1E293B] hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Page Indicator Pill */}
        <div className="bg-amber-50 text-amber-700 px-6 py-2.5 rounded-full font-bold text-sm border border-amber-100">
          Page {pageNumber} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
