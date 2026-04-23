"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Rocket, Coins, BarChart3, GraduationCap, Building2, Star, HelpCircle, FileText, Check, XCircle, LogOut } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  setInput: (t: string) => void;
  onShowHelp: () => void;
}

export default function Sidebar({ setInput, onShowHelp }: SidebarProps) {
  const [stance, setStance] = useState<"Pro" | "Contra">("Pro");
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("debater_name");
    router.push("/login");
  };

  const topics = [
    { name: "KI-Ethik", icon: <Shield size={16} /> },
    { name: "Raumfahrt", icon: <Rocket size={16} /> },
    { name: "Bitcoin & Finanzen", icon: <Coins size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-slate-50 border-r border-slate-200 overflow-y-auto">
      <div className="space-y-6">
        
        <div>
          <h3 className="px-3 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Position</h3>
          <div className="flex gap-2 px-3">
            <button 
              onClick={() => setStance("Pro")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all border ${stance === "Pro" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"}`}
            >
              <Check size={14} /> Pro
            </button>
            <button 
              onClick={() => setStance("Contra")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all border ${stance === "Contra" ? "bg-red-500 text-white border-red-500" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"}`}
            >
              <XCircle size={14} /> Contra
            </button>
          </div>
        </div>

        <div>
          <h3 className="px-3 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Trainings-Arena</h3>
          <div className="space-y-1">
            {topics.map((t) => (
              <button
                key={t.name}
                onClick={() => setInput(`Ich nehme die ${stance}-Position zum Thema ${t.name} ein. Fordere mich heraus!`)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm hover:text-blue-600 rounded-lg transition-all"
              >
                {t.icon}
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="px-3 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Premium & B2B</h3>
          <div className="space-y-1">
            <Link href="/premium/certificate" className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <GraduationCap size={16} />
              Debattier-Zertifikat ($49)
            </Link>
            <Link href="/premium/b2b" className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-lg transition-all hover:text-slate-900 hover:shadow-sm border border-transparent hover:border-slate-200">
              <Building2 size={16} />
              Schul-Lizenzen
            </Link>
          </div>
        </div>
        
        <div>
          <h3 className="px-3 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Support</h3>
          <div className="space-y-1">
            <button onClick={onShowHelp} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-lg transition-all hover:text-blue-600 hover:shadow-sm border border-transparent hover:border-slate-200">
              <HelpCircle size={16} />
              Anleitung lesen
            </button>
            <Link href="/policy" className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-lg transition-all hover:text-blue-600 hover:shadow-sm border border-transparent hover:border-slate-200">
              <FileText size={16} />
              Datenschutzerklärung
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 space-y-4">
        <div className="space-y-1">
          <Link href="/admin" className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-tight">
            <BarChart3 size={14} />
            Admin-Dashboard
          </Link>
          
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors uppercase tracking-tight cursor-pointer">
            <LogOut size={14} />
            Ausloggen
          </button>
        </div>

        <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl text-white shadow-lg border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <p className="text-[10px] font-bold uppercase tracking-tighter">Freemium-Plan</p>
          </div>
          <p className="text-[11px] text-slate-400 mb-2">Refinanziert durch Daten-Monetarisierung.</p>
          <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}