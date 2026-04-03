"use client";

import { MessageSquare, Plus, Trash2, GraduationCap } from "lucide-react";

export default function ChatSidebar({ chatHistory, onNewChat, onDeleteChat }) {
  return (
    <div
      style={{
        width: "256px",
        height: "100vh",
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.3s ease",
      }}
    >
      {/* Logo area */}
      <div
        style={{
          padding: "20px 16px 12px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(99,102,241,0.4)",
            }}
          >
            <GraduationCap size={20} color="white" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
              Study Buddy
            </p>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                background: "var(--accent-soft)",
                color: "var(--accent)",
                padding: "1px 6px",
                borderRadius: "4px",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              BETA
            </span>
          </div>
        </div>
        <button
          onClick={onNewChat}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px",
            background: "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-hover)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--accent)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <Plus size={16} />
          New Session
        </button>
      </div>

      {/* History list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "8px",
            padding: "0 4px",
          }}
        >
          Recent Chats
        </p>
        {chatHistory.length === 0 ? (
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
              padding: "8px 4px",
            }}
          >
            No recent chats
          </p>
        ) : (
          chatHistory.map((chat, idx) => (
            <div
              key={idx}
              className="group"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "2px",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  overflow: "hidden",
                  flex: 1,
                }}
              >
                <MessageSquare size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chat.title || `Chat ${idx + 1}`}
                </span>
              </div>
              <button
                onClick={() => onDeleteChat(idx)}
                style={{
                  padding: "4px",
                  border: "none",
                  background: "transparent",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  borderRadius: "4px",
                  flexShrink: 0,
                  opacity: 0,
                  transition: "opacity 0.15s ease, color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ef4444";
                  e.currentTarget.parentElement.querySelector("button").style.opacity = 1;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "11px",
              flexShrink: 0,
            }}
          >
            SB
          </div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>
              Study Buddy
            </p>
            <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>v2.0 · Powered by Groq</p>
          </div>
        </div>
      </div>
    </div>
  );
}
