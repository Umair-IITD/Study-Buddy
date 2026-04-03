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
      className="flex-1 overflow-y-auto scroll-smooth flex flex-col space-y-2 bg-slate-900/20"
    >
      {messages.length === 0 ? (
        <EmptyState onSelectPrompt={onSelectPrompt} />
      ) : (
        <div className="flex flex-col py-4">
          {messages.map((m, index) => (
            <ChatMessage key={index} message={m} />
          ))}
          <div className="h-20" /> {/* Extra spacing at bottom */}
        </div>
      )}
    </div>
  );
}
