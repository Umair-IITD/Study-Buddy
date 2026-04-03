"use client";

import { GraduationCap, Timer, BookOpen, Lightbulb } from "lucide-react";

const SUGGESTIONS = [
  {
    icon: <Timer size={18} />,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    title: "Study Planning",
    prompt:
      "I have classes from 9am-12pm and 2pm-4pm. I need to study 3 hours for my math exam tomorrow. Create a plan.",
  },
  {
    icon: <BookOpen size={18} />,
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    title: "Explain Concepts",
    prompt:
      "Explain the difference between photosynthesis and cellular respiration in simple terms.",
  },
  {
    icon: <Lightbulb size={18} />,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    title: "Problem Solving",
    prompt:
      "How do I solve a quadratic equation using the quadratic formula? Provide an example.",
  },
  {
    icon: <GraduationCap size={18} />,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    title: "Research Support",
    prompt:
      "Give me key points to include in a research paper about renewable energy sources.",
  },
];

export default function EmptyState({ onSelectPrompt }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      {/* Hero icon */}
      <div
        style={{
          marginBottom: "24px",
          width: "72px",
          height: "72px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
        }}
      >
        <GraduationCap size={36} color="white" />
      </div>

      <h1
        style={{
          fontSize: "clamp(1.4rem, 4vw, 2rem)",
          fontWeight: 800,
          color: "var(--text-primary)",
          marginBottom: "8px",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
        }}
      >
        How can{" "}
        <span style={{ color: "var(--accent)" }}>Study Buddy</span> help?
      </h1>
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          maxWidth: "380px",
          lineHeight: 1.6,
          marginBottom: "40px",
        }}
      >
        Your AI-powered academic assistant. Ask anything — from study plans to
        explaining complex concepts.
      </p>

      {/* Suggestion cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
          maxWidth: "640px",
          width: "100%",
        }}
      >
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelectPrompt(s.prompt)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "16px",
              background: "var(--bg-card)",
              border: "1.5px solid var(--border-color)",
              borderRadius: "14px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
              boxShadow: "var(--shadow)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = s.color;
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 8px 20px rgba(0,0,0,0.1)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow)";
            }}
          >
            {/* Icon badge */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: s.color,
                marginBottom: "10px",
              }}
            >
              {s.icon}
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {s.title}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {s.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
