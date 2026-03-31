"use client";
import { Shield, Rocket, Coins, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ setInput }: { setInput: (t: string) => void }) {
  const topics = [
    { name: "AI Ethics", icon: <Shield size={16} /> },
    { name: "Space Exploration", icon: <Rocket size={16} /> },
    { name: "Bitcoin", icon: <Coins size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-slate-50 border-r border-slate-200">
      {/* Topics Section */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Training Grounds
        </h3>
        {topics.map((t) => (
          <button
            key={t.name}
            onClick={() => setInput(`I want to debate about ${t.name}`)}
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