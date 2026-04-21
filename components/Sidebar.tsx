"use client";
import { useState } from "react";
import { Shield, Rocket, Coins, BarChart3, ThumbsUp, ThumbsDown } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ setInput }: { setInput: (t: string) => void }) {
  const [stance, setStance] = useState<"Pro" | "Con">("Pro");

  const topics = [
    { name: "AI Ethics", icon: <Shield size={16} /> },
    { name: "Space Exploration", icon: <Rocket size={16} /> },
    { name: "Bitcoin", icon: <Coins size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-slate-50 border-r border-slate-200">
      
      {/* NEW: Stance Selector */}
      <div className="mb-6">
        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Your Stance
        </h3>
        <div className="flex gap-2 px-2">
          <button 
            onClick={() => setStance("Pro")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all border ${
              stance === "Pro" 
                ? "bg-green-100 text-green-700 border-green-300 shadow-sm" 
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <ThumbsUp size={14} /> Pro
          </button>
          <button 
            onClick={() => setStance("Con")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all border ${
              stance === "Con" 
                ? "bg-red-100 text-red-700 border-red-300 shadow-sm" 
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <ThumbsDown size={14} /> Con
          </button>
        </div>
      </div>

      {/* Topics Section */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Training Grounds
        </h3>
        {topics.map((t) => (
          <button
            key={t.name}
            onClick={() => setInput(`I want to debate about ${t.name}. I will take the ${stance} side. You start.`)}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm hover:text-blue-600 rounded-lg transition-all border border-transparent hover:border-slate-200"
          >
            {t.icon}
            {t.name}
          </button>
        ))}
      </div>

      {/* Bottom Section (Admin & Status) */}
      <div className="mt-auto space-y-2">
        <Link href="/admin" className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600">
          <BarChart3 size={16} />
          Admin Analytics
        </Link>
        <div className="p-4 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
          <p className="text-[10px] font-bold uppercase opacity-80 mb-1">Status</p>
          <p className="text-xs font-medium">Freemium Active</p>
          <div className="mt-2 h-1 w-full bg-blue-400 rounded-full overflow-hidden">
            <div className="h-full bg-white w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}