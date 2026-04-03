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
    <div
      style={{
        borderTop: "1px solid var(--border-color)",
        background: "var(--bg-primary)",
        padding: "12px 16px 16px",
        backdropFilter: "blur(12px)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          background: "var(--bg-input)",
          padding: "8px",
          borderRadius: "16px",
          border: "1.5px solid var(--border-color)",
          boxShadow: "var(--shadow-md)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12), var(--shadow-md)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border-color)";
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
        }}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "Thinking…" : "Ask your Study Buddy anything…"}
          disabled={isLoading}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-primary)",
            fontSize: "0.9rem",
            padding: "6px 8px",
            maxHeight: "160px",
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          style={{
            padding: "8px",
            borderRadius: "10px",
            background: input.trim() && !isLoading ? "var(--accent)" : "var(--border-color)",
            color: "white",
            border: "none",
            cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
            flexShrink: 0,
          }}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>
      </form>
      <p
        style={{
          textAlign: "center",
          fontSize: "11px",
          color: "var(--text-muted)",
          marginTop: "8px",
        }}
      >
        Study Buddy can make mistakes. Verify important information.
      </p>
    </div>
  );
}
