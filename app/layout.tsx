// app/layout.tsx
import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import PolicyBanner from "../components/PolicyBanner"; // Banner importieren
import "./globals.css";

// --- HIER STEHT JETZT DEIN TAB-TITEL UND DEIN BILD ---
export const metadata: Metadata = {
  title: "AristotlAI | Sokratischer Sparringspartner",
  description: "Tritt gegen unsere KI an und verbessere deine Debattier-Fähigkeiten.",
  icons: {
    icon: "/logo.png", // Hier wird dein umbenanntes Bild geladen
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="relative">
        {children}
        
        {/* Hier wird das Banner eingefügt */}
        <PolicyBanner />
        
        <GoogleAnalytics gaId="G-RY0YC4P9TD" />
      </body>
    </html>
  );
}