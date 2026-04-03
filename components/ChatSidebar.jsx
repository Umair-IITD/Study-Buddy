"use client";

import { useState } from "react";
import { MessageSquare, Plus, Trash2, GraduationCap } from "lucide-react";

/* ── Small hover-aware button used inside sidebar ─── */
function SidebarItem({ chat, idx, onDelete }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 10px",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "2px",
        background: hovered ? "var(--bg-secondary)" : "transparent",
        transition: "background 0.15s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden", flex: 1 }}>
        <MessageSquare
          size={14}
          style={{ color: hovered ? "var(--accent)" : "var(--text-muted)", flexShrink: 0, transition: "color 0.15s ease" }}
        />
        <span
          style={{
            fontSize: "0.8rem",
            color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            transition: "color 0.15s ease",
          }}
        >
          {chat.title || `Chat ${idx + 1}`}
        </span>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(idx); }}
        style={{
          padding: "3px 4px",
          border: "none",
          background: "transparent",
          color: "var(--text-muted)",
          cursor: "pointer",
          borderRadius: "4px",
          flexShrink: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.15s ease, color 0.15s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}

export default function ChatSidebar({ chatHistory, onNewChat, onDeleteChat }) {
  const [newBtnHovered, setNewBtnHovered] = useState(false);

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
      {/* Logo + New button */}
      <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
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
              flexShrink: 0,
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

        {/* New Session button with hover */}
        <button
          onClick={onNewChat}
          onMouseEnter={() => setNewBtnHovered(true)}
          onMouseLeave={() => setNewBtnHovered(false)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px",
            background: newBtnHovered ? "var(--accent-hover)" : "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: newBtnHovered
              ? "0 6px 16px rgba(99,102,241,0.45)"
              : "0 2px 8px rgba(99,102,241,0.3)",
            transform: newBtnHovered ? "translateY(-1px)" : "translateY(0)",
          }}
        >
          <Plus size={16} />
          New Session
        </button>
      </div>

      {/* Chat history list */}
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
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic", padding: "8px 4px" }}>
            No recent chats
          </p>
        ) : (
          chatHistory.map((chat, idx) => (
            <SidebarItem key={idx} chat={chat} idx={idx} onDelete={onDeleteChat} />
          ))
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-color)" }}>
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
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>Study Buddy</p>
            <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>v2.0 · Powered by Groq</p>
          </div>
        </div>
      </div>
    </div>
  );
}
