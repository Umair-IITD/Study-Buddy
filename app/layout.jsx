import "./globals.css";

export const metadata = {
  title: "Study Buddy | AI Assignment & Study Planner",
  description: "An intelligent study companion that helps you plan your study sessions and clarify academic doubts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
