"use client";

import { GraduationCap, Timer, BookOpen, Lightbulb } from "lucide-react";

const SUGGESTIONS = [
  {
    icon: <Timer className="text-amber-400" size={18} />,
    title: "Study Planning",
    prompt: "I have classes from 9am-12pm and 2pm-4pm. I need to study 3 hours for my math exam tomorrow. Create a plan.",
  },
  {
    icon: <BookOpen className="text-emerald-400" size={18} />,
    title: "Explain Concepts",
    prompt: "Explain the difference between photosynthesis and cellular respiration in simple terms.",
  },
  {
    icon: <Lightbulb className="text-sky-400" size={18} />,
    title: "Problem Solving",
    prompt: "How do I solve a quadratic equation using the quadratic formula? Provide an example.",
  },
  {
    icon: <GraduationCap className="text-indigo-400" size={18} />,
    title: "Research Support",
    prompt: "Give me some key points to include in a research paper about renewable energy sources.",
  },
];

export default function EmptyState({ onSelectPrompt }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-2xl animate-pulse">
        <GraduationCap size={48} className="text-indigo-500" />
      </div>
      
      <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
        How can <span className="text-indigo-500">Study Buddy</span> help you today?
      </h1>
      <p className="text-slate-400 max-w-sm mb-12">
        Solve doubts, plan your study routine, and stay productive with your AI-powered academic assistant.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelectPrompt(s.prompt)}
            className="flex flex-col items-start p-4 bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 hover:border-indigo-500/50 rounded-xl transition-all group text-left shadow-sm active:scale-95"
          >
            <div className="flex items-center gap-2 mb-2">
              {s.icon}
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">
                {s.title}
              </span>
            </div>
            <p className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors line-clamp-2 italic">
               "{s.prompt}"
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
