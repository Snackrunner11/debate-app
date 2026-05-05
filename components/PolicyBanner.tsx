"use client";
import { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";
import Link from "next/link";

export default function PolicyBanner() {
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem("policy_accepted");
    if (!isAccepted) {
      setShowPolicy(true);
    }
  }, []);

  const acceptPolicy = () => {
    localStorage.setItem("policy_accepted", "true");
    setShowPolicy(false);
  };

  if (!showPolicy) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md bg-slate-900 text-white p-5 rounded-2xl shadow-2xl z-[100] border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-600 rounded-lg">
          <ShieldCheck size={20} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold mb-1">Daten-Monetarisierungsrichtlinie</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            AristotlAI nutzt anonymisierte Argumentationsdaten zur Optimierung von KI-Modellen für Drittanbieter. Durch die Nutzung stimmst du der Datenmonetarisierung zu, damit dein Sokratischer Sparringspartner kostenlos bleibt.
          </p>
          <div className="flex gap-3">
            <button onClick={acceptPolicy} className="text-[10px] bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md font-bold transition-colors">
              Akzeptieren & Starten
            </button>
            <Link href="/policy" onClick={acceptPolicy} className="text-[10px] text-slate-400 hover:text-white transition-colors underline">
              Mehr erfahren
            </Link>
          </div>
        </div>
        <button onClick={() => setShowPolicy(false)} className="text-slate-500 hover:text-white">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}