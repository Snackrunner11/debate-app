"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ArrowRight } from "lucide-react";

export default function Login() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("debater_name", name);
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
          <Shield className="text-white" size={32} />
        </div>
        
        {/* Name geändert zu AristotlAI */}
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">AristotlAI</h1>
        <p className="text-slate-500 text-sm mb-8">Gib deinen Namen ein, um die Trainings-Arena zu betreten.</p>

        <form onSubmit={handleJoin} className="space-y-4">
          <input 
            type="text" 
            placeholder="Dein Name (z.B. Max Mustermann)" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            // HIER GEFIXT: text-slate-900 macht die Schriftfarbe dunkel
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-center font-medium text-slate-900 placeholder-slate-400"
            required
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-200"
          >
            Arena betreten <ArrowRight size={18} />
          </button>
        </form>
      </div>
      <p className="mt-8 text-xs text-slate-400 font-medium">
        Mit dem Betreten stimmst du unserer Daten-Monetarisierungsrichtlinie zu.
      </p>
    </div>
  );
}