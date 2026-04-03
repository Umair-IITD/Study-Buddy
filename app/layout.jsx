import "./globals.css";

export const metadata = {
  title: "Study Buddy | AI Assignment & Study Planner",
  description: "An intelligent study companion that helps you plan your study sessions and clarify academic doubts.",
};

import { ThemeProvider } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
