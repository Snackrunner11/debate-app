"use client";
import { useState, useEffect } from "react";
import { GoogleAnalytics } from '@next/third-parties/google';
import { ShieldCheck, X } from "lucide-react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showPolicy, setShowPolicy] = useState(true);

  return (
    <html lang="de">
      <body className="relative">
        {children}
        
        {/* Data Monetization Policy Banner */}
        {showPolicy && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md bg-slate-900 text-white p-5 rounded-2xl shadow-2xl z-[100] border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold mb-1">Data Monetization Policy</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  AristotlAI nutzt anonymisierte Argumentationsdaten zur Optimierung von KI-Modellen für Drittanbieter. Durch die Nutzung stimmst du der Datenmonetarisierung zu, um unseren Socratic Sparring Partner kostenlos zu halten.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setShowPolicy(false)} className="text-[10px] bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md font-bold transition-colors">
                    Akzeptieren & Starten
                  </button>
                  <button className="text-[10px] text-slate-500 hover:text-white transition-colors">
                    Mehr erfahren
                  </button>
                </div>
              </div>
              <button onClick={() => setShowPolicy(false)} className="text-slate-500 hover:text-white">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <GoogleAnalytics gaId="G-RY0YC4P9TD" />
      </body>
    </html>
  );
}