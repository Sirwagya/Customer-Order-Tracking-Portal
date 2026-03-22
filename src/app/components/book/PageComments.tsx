import React, { useRef, useEffect } from "react";
import type { Comment } from "./types";
import { CommentInput } from "./CommentInput";

interface PageCommentsProps {
  readonly comments: Comment[];
  readonly onAddComment: (text: string) => void;
  readonly className?: string;
}

export const PageComments: React.FC<PageCommentsProps> = ({
  comments,
  onAddComment,
  className = "",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 h-[600px] flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <h2 className="font-extrabold text-lg text-[#1E293B] flex items-center gap-2">
          <span className="text-xl">💬</span> Page Comments
        </h2>
        {comments.length > 0 && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {comments.length} NEW
          </span>
        )}
      </div>

      {/* Scrollable Comments */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 pb-4 space-y-5"
      >
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-4xl mb-3">✨</span>
            <p className="text-slate-500 text-sm font-medium">
              No comments on this page yet.
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          comments.map((comment, index) => {
            const isEditor = comment.author === "Editor Ben";
            return (
              <div
                key={comment.id}
                className={`flex flex-col gap-1 ${isEditor ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-2xl p-4 max-w-[90%] ${
                    isEditor
                      ? "bg-amber-50 border border-amber-100"
                      : "bg-slate-50"
                  }`}
                >
                  <span
                    className={`block font-bold text-sm mb-1 ${
                      isEditor ? "text-[#F5A623]" : "text-slate-600"
                    }`}
                  >
                    {comment.author || "You"}
                  </span>
                  <p className="text-sm text-[#1E293B] leading-relaxed">
                    {comment.text}
                  </p>
                </div>
                <span
                  className={`text-[10px] text-slate-400 ${isEditor ? "mr-2" : "ml-2"}`}
                >
                  {formatTime(comment.createdAt)}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-slate-100">
        <CommentInput onSubmit={onAddComment} />
      </div>
    </div>
  );
};

export default PageComments;
