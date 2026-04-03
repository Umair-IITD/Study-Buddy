"use client";

import { MessageSquare, Plus, Trash2 } from "lucide-react";

export default function ChatSidebar({ chatHistory, onNewChat, onDeleteChat }) {
  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-700 flex flex-col transition-all duration-300">
      <div className="p-4 border-b border-slate-700">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-lg active:scale-95"
        >
          <Plus size={18} />
          <span className="font-medium text-sm">New Session</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Chat History
        </h3>
        {chatHistory.length === 0 ? (
          <p className="text-sm text-slate-600 italic">No recent chats</p>
        ) : (
          chatHistory.map((chat, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-between p-2 rounded-md hover:bg-slate-800 transition-colors cursor-pointer text-slate-300 hover:text-white"
            >
              <div className="flex items-center gap-3 truncate">
                <MessageSquare size={16} className="text-slate-500 group-hover:text-indigo-400" />
                <span className="text-sm truncate">{chat.title || `Chat ${idx + 1}`}</span>
              </div>
              <button
                onClick={() => onDeleteChat(idx)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
            SB
          </div>
          <div className="truncate">
            <p className="text-sm font-medium text-slate-200">Study Buddy</p>
            <p className="text-xs text-slate-500 truncate">v1.2 Global</p>
          </div>
        </div>
      </div>
    </div>
  );
}
