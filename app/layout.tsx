import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

export const metadata = { 
  title: "DEBATE.AI | Training Arena",
  description: "Master the art of rhetoric."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      
      {/* This ONE component replaces the entire messy Google script! */}
      <GoogleAnalytics gaId="G-RY0YC4P9TD" />
    </html>
  );
}