"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";

export default function ChatArea({ messages, onSelectPrompt }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-primary)",
        transition: "background 0.3s ease",
      }}
    >
      {messages.length === 0 ? (
        <EmptyState onSelectPrompt={onSelectPrompt} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", paddingBottom: "20px" }}>
          {messages.map((m, index) => (
            <ChatMessage key={index} message={m} />
          ))}
        </div>
      )}
    </div>
  );
}
