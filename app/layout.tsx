// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

export const metadata = { title: "Debate AI Learning" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      
      {/* Das ist das unsichtbare Skript, das alles trackt */}
      <GoogleAnalytics gaId="G-RY0YC4P9TD" />
    </html>
  );
}