"use client";

import { SendHorizontal, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSendMessage, isLoading }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto flex items-end gap-2 bg-slate-800/80 p-2 rounded-2xl border border-slate-700 shadow-xl focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "Thinking..." : "Ask your Study Buddy anything..."}
          disabled={isLoading}
          className="flex-1 bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-500 resize-none py-2 px-3 scrollbar-hide max-h-48 text-sm"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 text-white transition-all disabled:opacity-50 active:scale-90"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>
      </form>
      <p className="text-[10px] text-center text-slate-600 mt-2">
        Study Buddy can make mistakes. Check important information.
      </p>
    </div>
  );
}
