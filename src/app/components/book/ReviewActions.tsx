import React from "react";

interface ReviewActionsProps {
  readonly onRequestChanges: () => void;
  readonly onApprove: () => void;
  readonly className?: string;
}

export const ReviewActions: React.FC<ReviewActionsProps> = ({
  onRequestChanges,
  onApprove,
  className = "",
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgb(0,0,0,0.03)] ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-5 gap-4">
        <p className="text-sm font-medium text-slate-500 hidden md:block">
          Happy with the story? Approve it for printing
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onRequestChanges}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-slate-200 text-[#1E293B] font-bold text-sm hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            Request Changes
          </button>
          <button
            onClick={onApprove}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F5A623] text-white font-bold text-sm shadow-lg shadow-amber-500/30 hover:bg-amber-500 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Send to Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewActions;
