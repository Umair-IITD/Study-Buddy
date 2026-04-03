"use client";

import { useState, useEffect } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatArea from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import { GraduationCap, Moon, Search, Sun, Settings, PanelLeft } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <main className="flex h-screen bg-[#0F172A] text-slate-200 overflow-hidden font-sans">
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
        <header className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-[#0F172A]/80 backdrop-blur-xl sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <PanelLeft size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="p-1.5 bg-indigo-600 rounded-lg shadow-lg">
                <GraduationCap size={20} className="text-white" />
              </div>
              <h2 className="font-bold tracking-tight text-white flex items-center gap-1.5">
                Study Buddy <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-1.5 py-0.5 rounded border border-indigo-500/20">BETA</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
           <button className="p-2.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all">
              <Search size={18} />
            </button>
            <button className="p-2.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all">
              <Sun size={18} />
            </button>
            <div className="h-8 w-[1px] bg-slate-800 mx-2" />
             <button className="p-2.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all">
              <Settings size={18} />
            </button>
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
