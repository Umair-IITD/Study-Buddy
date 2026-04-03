"use client";

import { useState, useEffect } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatArea from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import { GraduationCap, Moon, Search, Sun, Settings, PanelLeft } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { theme, setTheme } = useTheme();

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("study_buddy_history");
    if (saved) {
      setChatHistory(JSON.parse(saved));
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

      if (!response.ok) throw new Error("Failed to fetch response");
      const data = await response.json();

      const botMessage = { role: "model", text: data.text };
      const finalMessages = [...newMessages, botMessage];
      setMessages(finalMessages);

      // Save current chat session to history if it's the first message
      if (newMessages.length === 1) {
        const newHistory = [{ title: text.slice(0, 30) + "...", date: new Date().toISOString() }, ...chatHistory];
        setChatHistory(newHistory);
        localStorage.setItem("study_buddy_history", JSON.stringify(newHistory));
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { role: "model", text: "⚠️ Error: Connection issue. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const deleteChatHistory = (idx) => {
    const updated = chatHistory.filter((_, i) => i !== idx);
    setChatHistory(updated);
    localStorage.setItem("study_buddy_history", JSON.stringify(updated));
  };

  return (
    <main className="flex h-screen bg-white dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar - Collapsible */}
      <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full absolute"} lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out z-20`}>
        <ChatSidebar 
          chatHistory={chatHistory} 
          onNewChat={handleNewChat} 
          onDeleteChat={deleteChatHistory}
          onSelectConversation={(index) => console.log("Select", index)} 
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header Area */}
        <header className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl sticky top-0 z-10 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <PanelLeft size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="p-1.5 bg-indigo-600 rounded-lg shadow-lg">
                <GraduationCap size={20} className="text-white" />
              </div>
              <h2 className="font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Study Buddy <span className="bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-[10px] px-1.5 py-0.5 rounded border border-indigo-500/20">BETA</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all"
            >
              <Search size={18} />
            </button>
            
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />
            
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all"
            >
              <Settings size={18} />
            </button>

            {/* Simple Modals/Dropdowns */}
            {showSettings && (
              <div className="absolute top-14 right-0 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl p-4 z-50 animate-in fade-in slide-in-from-top-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Settings</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Manage your preferences.</p>
                <div className="space-y-2">
                  <button onClick={() => { localStorage.clear(); setChatHistory([]); setMessages([]); setShowSettings(false); }} className="w-full text-left px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg transition-colors">
                    Clear All Data
                  </button>
                 </div>
              </div>
            )}

            {showSearch && (
              <div className="absolute top-14 right-16 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl justify-between items-center p-2 z-50 animate-in fade-in slide-in-from-top-4 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Search chats (Coming Soon)..." 
                  disabled
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-2"
                />
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Chat Area */}
        <ChatArea messages={messages} onSelectPrompt={handleSendMessage} />

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </main>
  );
}
