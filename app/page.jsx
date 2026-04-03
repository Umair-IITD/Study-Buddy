"use client";

import { useState, useEffect } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatArea from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import {
  Moon,
  Search,
  Sun,
  Settings,
  PanelLeft,
  X,
  Trash2,
} from "lucide-react";
import { useTheme } from "next-themes";

/* ── small reusable icon-button ─────────────────────── */
function IconBtn({ onClick, active, title, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "7px",
        borderRadius: "8px",
        border: "none",
        background: active
          ? "var(--accent-soft)"
          : hovered
          ? "var(--bg-card)"
          : "transparent",
        color: active ? "var(--accent)" : hovered ? "var(--text-primary)" : "var(--text-secondary)",
        cursor: "pointer",
        transition: "all 0.15s ease",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}

/* ── main page ──────────────────────────────────────── */
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("study_buddy_history");
    if (saved) {
      try { setChatHistory(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleSendMessage = async (text) => {
    const userMessage = { role: "user", text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: newMessages }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server error");

      const botMessage = { role: "assistant", text: data.text };
      const finalMessages = [...newMessages, botMessage];
      setMessages(finalMessages);

      if (newMessages.length === 1) {
        const newHistory = [
          { title: text.slice(0, 35) + (text.length > 35 ? "…" : ""), date: new Date().toISOString() },
          ...chatHistory,
        ];
        setChatHistory(newHistory);
        localStorage.setItem("study_buddy_history", JSON.stringify(newHistory));
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `⚠️ **Error:** ${error.message || "Connection issue. Please try again."}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => setMessages([]);

  const deleteChatHistory = (idx) => {
    const updated = chatHistory.filter((_, i) => i !== idx);
    setChatHistory(updated);
    localStorage.setItem("study_buddy_history", JSON.stringify(updated));
  };

  const clearAllData = () => {
    localStorage.clear();
    setChatHistory([]);
    setMessages([]);
    setShowSettings(false);
  };

  const isDark = mounted && theme === "dark";

  return (
    <main
      style={{
        display: "flex",
        height: "100vh",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/* ── Sidebar: slides in/out, collapses to zero width ── */}
      <div
        style={{
          width: sidebarOpen ? "256px" : "0px",
          flexShrink: 0,
          overflow: "hidden",
          transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* The inner sidebar keeps its 256px, parent clips it */}
        <div style={{ width: "256px", height: "100%" }}>
          <ChatSidebar
            chatHistory={chatHistory}
            onNewChat={handleNewChat}
            onDeleteChat={deleteChatHistory}
          />
        </div>
      </div>

      {/* ── Main content: grows to fill all space when sidebar closes ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative" }}>
        
        {/* Header */}
        <header
          style={{
            height: "60px",
            padding: "0 20px",
            borderBottom: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--bg-secondary)",
            backdropFilter: "blur(16px)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            boxShadow: "var(--shadow)",
            transition: "background 0.3s ease",
          }}
        >
          {/* Left: sidebar toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconBtn onClick={() => setSidebarOpen(!sidebarOpen)} title={sidebarOpen ? "Close sidebar" : "Open sidebar"}>
              <PanelLeft size={20} />
            </IconBtn>
            {!sidebarOpen && (
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Study Buddy
              </span>
            )}
          </div>

          {/* Right: controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", position: "relative" }}>
            <IconBtn
              onClick={() => { setShowSearch(!showSearch); setShowSettings(false); }}
              active={showSearch}
              title="Search"
            >
              <Search size={18} />
            </IconBtn>

            <IconBtn
              onClick={() => setTheme(isDark ? "light" : "dark")}
              title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
            >
              {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />}
            </IconBtn>

            {/* Divider */}
            <div style={{ width: "1px", height: "28px", background: "var(--border-color)", margin: "0 4px" }} />

            <IconBtn
              onClick={() => { setShowSettings(!showSettings); setShowSearch(false); }}
              active={showSettings}
              title="Settings"
            >
              <Settings size={18} />
            </IconBtn>

            {/* ── Settings dropdown ── */}
            {showSettings && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  width: "260px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "14px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                  padding: "16px",
                  zIndex: 100,
                  animation: "fadeInUp 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>Settings</h3>
                  <IconBtn onClick={() => setShowSettings(false)} title="Close">
                    <X size={15} />
                  </IconBtn>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
                  Manage your Study Buddy preferences.
                </p>
                <ClearButton onClick={clearAllData} />
              </div>
            )}

            {/* ── Search dropdown ── */}
            {showSearch && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  width: "300px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "14px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                  padding: "10px 12px",
                  zIndex: 100,
                  animation: "fadeInUp 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Search size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search chats… (coming soon)"
                  disabled
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                    fontFamily: "inherit",
                  }}
                />
                <IconBtn onClick={() => setShowSearch(false)} title="Close">
                  <X size={14} />
                </IconBtn>
              </div>
            )}
          </div>
        </header>

        {/* Chat area */}
        <ChatArea messages={messages} onSelectPrompt={handleSendMessage} />

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

      {/* Click outside to close dropdowns */}
      {(showSettings || showSearch) && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9 }}
          onClick={() => { setShowSettings(false); setShowSearch(false); }}
        />
      )}
    </main>
  );
}

/* ── Clear button with hover state ─────────────────── */
function ClearButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 12px",
        background: hovered ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.08)",
        color: "#ef4444",
        border: "1px solid rgba(239,68,68,0.25)",
        borderRadius: "8px",
        fontSize: "0.85rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.15s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered ? "0 4px 12px rgba(239,68,68,0.15)" : "none",
      }}
    >
      <Trash2 size={14} />
      Clear All Chat Data
    </button>
  );
}
