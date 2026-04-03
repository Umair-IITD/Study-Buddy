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
      try {
        setChatHistory(JSON.parse(saved));
      } catch {}
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

      if (!response.ok) {
        throw new Error(data.error || "Server error");
      }

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
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 19,
            display: "none",
          }}
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          flexShrink: 0,
        }}
      >
        <ChatSidebar
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onDeleteChat={deleteChatHistory}
        />
      </div>

      {/* Main content */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                padding: "7px",
                borderRadius: "8px",
                border: "none",
                background: "transparent",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <PanelLeft size={20} />
            </button>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", position: "relative" }}>
            {/* Search button */}
            <button
              onClick={() => { setShowSearch(!showSearch); setShowSettings(false); }}
              style={{
                padding: "7px",
                borderRadius: "8px",
                border: "none",
                background: showSearch ? "var(--accent-soft)" : "transparent",
                color: showSearch ? "var(--accent)" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = showSearch ? "var(--accent-soft)" : "transparent";
              }}
              title="Search"
            >
              <Search size={18} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              style={{
                padding: "7px",
                borderRadius: "8px",
                border: "none",
                background: "transparent",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
            >
              {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />}
            </button>

            {/* Divider */}
            <div
              style={{
                width: "1px",
                height: "28px",
                background: "var(--border-color)",
                margin: "0 6px",
              }}
            />

            {/* Settings */}
            <button
              onClick={() => { setShowSettings(!showSettings); setShowSearch(false); }}
              style={{
                padding: "7px",
                borderRadius: "8px",
                border: "none",
                background: showSettings ? "var(--accent-soft)" : "transparent",
                color: showSettings ? "var(--accent)" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = showSettings ? "var(--accent-soft)" : "transparent";
              }}
              title="Settings"
            >
              <Settings size={18} />
            </button>

            {/* Settings dropdown */}
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
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  padding: "16px",
                  zIndex: 100,
                  animation: "fadeInUp 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "2px" }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
                  Manage your Study Buddy preferences.
                </p>
                <button
                  onClick={clearAllData}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 12px",
                    background: "rgba(239,68,68,0.08)",
                    color: "#ef4444",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                >
                  <Trash2 size={14} />
                  Clear All Chat Data
                </button>
              </div>
            )}

            {/* Search dropdown */}
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
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  padding: "10px",
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
                <button
                  onClick={() => setShowSearch(false)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "2px" }}
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Chat area */}
        <ChatArea messages={messages} onSelectPrompt={handleSendMessage} />

        {/* Input area */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

      {/* Click outside to close modals */}
      {(showSettings || showSearch) && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9 }}
          onClick={() => { setShowSettings(false); setShowSearch(false); }}
        />
      )}
    </main>
  );
}
