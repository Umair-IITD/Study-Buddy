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
    <div className={`group flex gap-4 p-6 ${isUser ? "" : "bg-slate-800/30 border-y border-slate-700/50 shadow-inner"}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
          isUser ? "bg-slate-700 text-slate-300 ring-1 ring-slate-600" : "bg-indigo-600 text-white ring-1 ring-indigo-400"
        }`}>
          {isUser ? <User size={18} /> : <GraduationCap size={18} />}
        </div>
      </div>

      <div className="flex-1 min-w-0 max-w-4xl mx-auto space-y-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
            {isUser ? "You" : "Study Buddy"}
          </span>
          {!isUser && (
            <button
              onClick={copyToClipboard}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-indigo-400 transition-all active:scale-90"
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          )}
        </div>

        <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-xl prose-code:text-indigo-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
