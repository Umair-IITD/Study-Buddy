# Study Buddy 🤖 | AI-Powered Academic Assistant

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS 3.4](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Groq Llama 3.1](https://img.shields.io/badge/Groq-Llama_3.1_8B-F55036?style=for-the-badge&logo=groq)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Study Buddy** is a sophisticated, production-grade AI-powered study companion designed to help students optimize their academic workflow. Built with **Next.js 15**, it leverages the **Groq API** for ultra-fast Llama-3.1 inference to provide instant explanations, personalized study plans, and step-by-step solutions to complex problems.

---

## 🚀 Key Features

- **⚡ Instant AI Tutoring**: High-speed AI responses powered by Groq's Llama-3.1-8b-instant model.
- **📅 Personalized Study Planning**: Intelligent scheduling that adapts to class times, labs, and study goals.
- **🎨 Modern Adaptive UI**: A sleek, user-centric interface with seamless Light and Dark mode transition, designed for high-engagement sessions.
- **🔒 Security First**: Serverless architecture ensures API keys are never exposed on the client-side.
- **📝 Markdown Support**: Perfect rendering of academic formulas, code blocks, and structured notes using `react-markdown`.
- **📂 Session Management**: Local persistent history allows users to maintain multiple study sessions across device reloads.

---

## 🛠️ Technical Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), CSS-in-JS Tokens
- **AI Engine**: [Groq SDK](https://groq.com/) (Llama 3.1 8B Instant)
- **State & Theme**: `localStorage` Persistence, `next-themes`
- **Inference Strategy**: System Prompting for "Academic Mentor" persona to prioritize guidance over direct answers.

---

## 🏗️ Architecture & Core Decisions

### 1. Migrating to Groq for Low Latency
Originally prototyped with Google Gemini, the application was migrated to **Groq** to take advantage of its revolutionary low-latency inference. This provides a "real-time conversation" feel critical for non-disruptive study sessions.

### 2. Next.js Serverless API Routes
By utilizing Next.js Serverless Routes, we've implemented a secure backend bridge. This pattern keeps the `SB_API_KEY` entirely on the server-side, preventing exposure in the browser network tab.

### 3. Design System & UX
The UI uses [Stitch Design System](https://google.github.io/stitch-design-system/) principles:
- **Consistency**: Centralized CSS tokens for light/dark modes.
- **Responsibility**: Fully responsive layout with an intuitive, ChatGPT-style sidebar mechanism.
- **Accessibility**: High contrast, readable typography (Inter), and touch-friendly controls.

---

## 📜 System Design
Detailed documentation on architecture, data flow, and technical implementation can be found in [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md).

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- [Groq API Key](https://console.groq.com/keys)

### Installation & Run
1. Clone the repository:
   ```bash
   git clone https://github.com/Umair-IITD/Study-Buddy.git
   cd Study-Buddy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment:
   Create a `.env.local` file:
   ```env
   SB_API_KEY=your_groq_api_key
   ```
4. Start the engine:
   ```bash
   npm run dev
   ```

---

## 📈 Future Roadmap
- [ ] **RAG Integration**: PDF/Note ingestion for contextual learning.
- [ ] **Cloud Persistence**: Migration to Supabase/Postgres for multi-device sync.
- [ ] **Voice-to-Study**: Integration of Whisper for hands-free queries.

---

Built with ❤️ by **Md Umair Alam** (IIT Delhi)
