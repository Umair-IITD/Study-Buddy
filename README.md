# 📚 Study Buddy – AI Assignment Planner
Author: Md Umair Alam; 
Institute: IIT Delhi; 
Department: Biotechnology and Biochemical Engineering

## Overview
**Study Buddy** is an AI-powered chatbot designed to help students plan, schedule, and manage their studies.  
It acts as a personal tutor and productivity assistant by:
- Explaining academic concepts in simple terms
- Helping with assignments and coding tasks
- Suggesting personalized study plans and timetables
- Tracking progress and keeping students motivated

This project was built as part of the **SDE Assignment Round**.

---

## ✨ Features
- 🤖 **Interactive Chatbot UI**: Built with React, togglable chatbot popup  
- 📘 **Assignment Helper**: Explains concepts across subjects (math, science, programming, etc.)  
- 📝 **Study Planner & Scheduler**: Suggests timetables, breaks, and task organization  
- 📊 **Progress Tracking**: Helps track completed vs. pending tasks  
- 🎯 **Motivation & Guidance**: Acts as a friendly mentor with encouragement  

---

## 🛠️ Tech Stack
- **Frontend**: React + Vite  
- **Language Model**: Google Gemini API (`gemini-2.5-flash`)  
- **Styling**: CSS  
- **Deployment**: Vercel (recommended)  

---

## 📂 Project Structure
Study-Buddy/
│── src/
│ ├── components/ # UI components (ChatForm, ChatMessage, ChatbotIcon)
│ ├── StudyBuddyInfo.js # AI context & instructions
│ ├── App.jsx # Main application logic
│ └── index.css # Styles
│── .env # Environment variables (API key & URL)
│── index.html
│── package.json


---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/Umair-IITD/Study-Buddy.git
cd Study-Buddy
```
### 2. Install dependencies
```bash
npm install
```
### 3. Add environment variables
Create a .env file in the root and add:
```bash
VITE_GEMINI_API_KEY=your_api_key_here
VITE_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```
### 4. Run locally
```bash
npm run dev
```
The app will run on http://localhost:5173.
