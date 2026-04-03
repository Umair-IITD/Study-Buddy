"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, GraduationCap, User } from "lucide-react";
import { useState } from "react";

export default function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="animate-fade-in-up"
      style={{
        display: "flex",
        gap: "14px",
        padding: "18px 24px",
        background: isUser ? "transparent" : "var(--bg-message-ai)",
        borderBottom: "1px solid var(--border-color)",
        transition: "background 0.3s ease",
      }}
    >
      {/* Avatar */}
      <div style={{ flexShrink: 0, paddingTop: "2px" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isUser
              ? "var(--bg-card)"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: isUser ? "1.5px solid var(--border-color)" : "none",
            boxShadow: isUser ? "none" : "0 2px 8px rgba(99,102,241,0.35)",
            color: isUser ? "var(--text-secondary)" : "white",
          }}
        >
          {isUser ? <User size={16} /> : <GraduationCap size={16} />}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, maxWidth: "48rem", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {isUser ? "You" : "Study Buddy"}
          </span>
          {!isUser && (
            <button
              onClick={copyToClipboard}
              title="Copy to clipboard"
              style={{
                padding: "4px 6px",
                borderRadius: "6px",
                border: "none",
                background: "transparent",
                color: copied ? "#10b981" : "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "11px",
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>

        {/* Markdown rendered message */}
        <div className="prose-light">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
