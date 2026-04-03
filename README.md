# Study Buddy 🤖 | AI-Powered Academic Assistant

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama_3_8B-F55036?style=for-the-badge&logo=groq)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Study Buddy** is a production-grade AI chatbot designed to help students optimize their academic workflows. From generating personalized study plans to explaining complex STEM concepts, Study Buddy acts as a 24/7 tutor and productivity coach.

## 🚀 Key Features

- **Personalized Study Planning**: Generates detailed timetables based on user-provided class schedules and goals.
- **STEM Concept Clarification**: Uses Groq's high-speed inference with the Llama 3 8B model to provide step-by-step explanations for Math, Physics, and Coding.
- **Premium UX/UI**: A sleek, dark-themed interface built with Tailwind CSS, featuring glassmorphism, responsive sidebars, and smooth animations.
- **Smart Markdown Rendering**: Fully supports Markdown for AI responses, including code highlighting and academic formatting via `react-markdown`.
- **Persistent Sessions**: Uses `localStorage` to save user chat history locally, providing a seamless experience across page refreshes.
- **Security-First Architecture**: Implements Serverless API Routes to keep LLM API keys hidden from the client-side.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS
- **AI**: Groq SDK (groq-sdk) with Llama 3 8B
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🏗️ Architecture & Decisions

### Why Next.js over Vite?
The original prototype was built with Vite. While fast, Vite exposes environment variables to the browser's network tab. I migrated the project to **Next.js** to utilize **Serverless Functions**. This architectural shift ensures that the `SB_API_KEY` stays securely on the server, a critical requirement for production-level AI applications.

### Design Philosophy
The UI follows modern design trends:
- **Glassmorphism**: Subtle translucent backgrounds for headers and inputs.
- **Interactive Feedback**: Loading states, auto-resizing textareas, and copy-to-clipboard functionality to minimize user friction.
- **Accessibility**: High-contrast text and mobile-first responsive design.

### Prompt Engineering
The system instructions (found in `lib/groq.js`) are carefully crafted to ensure the AI maintains an "Academic Mentor" persona—prioritizing explanation over just giving direct answers to prevent plagiarism.

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- A Groq API Key ([Get one here](https://console.groq.com/keys))

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Umair-IITD/Study-Buddy.git
   cd Study-Buddy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   SB_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📈 Future Roadmap
- [ ] **Supabase Integration**: Persistent cloud-based chat history and user accounts.
- [ ] **RAG (Retrieval-Augmented Generation)**: Allow students to upload PDFs/Notes for the AI to reference.
- [ ] **Voice Interaction**: Implement Web Speech API for hands-free study sessions.

---

Built with ❤️ by **Md Umair Alam** (IIT Delhi)
