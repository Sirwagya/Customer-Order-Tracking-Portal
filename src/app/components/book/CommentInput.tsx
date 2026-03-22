import React, { useState } from "react";
import { Send } from "lucide-react";

interface CommentInputProps {
  readonly onSubmit: (text: string) => void;
  readonly className?: string;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  className = "",
}) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="✨ Suggest a change..."
        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-[#F5A623] transition-all text-[#1E293B]"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex-shrink-0 bg-[#F5A623] text-white rounded-full p-2.5 hover:bg-amber-500 hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Send comment"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

export default CommentInput;
