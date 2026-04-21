"use client";
import { Shield, Rocket, Coins, BarChart3, GraduationCap, Building2, Star } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ setInput }: { setInput: (t: string) => void }) {
  const topics = [
    { name: "KI-Ethik", icon: <Shield size={16} /> },
    { name: "Raumfahrt", icon: <Rocket size={16} /> },
    { name: "Bitcoin & Finanzen", icon: <Coins size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-slate-50 border-r border-slate-200">
      <div className="space-y-6">
        {/* Training Area */}
        <div>
          <h3 className="px-3 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Training Arena</h3>
          <div className="space-y-1">
            {topics.map((t) => (
              <button
                key={t.name}
                onClick={() => setInput(`Ich möchte über ${t.name} debattieren.`)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm hover:text-blue-600 rounded-lg transition-all"
              >
                {t.icon}
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* B2B & Premium Section mit echten Links */}
        <div>
          <h3 className="px-3 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Premium & B2B</h3>
          <div className="space-y-1">
            <Link href="/premium/certificate" className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <GraduationCap size={16} />
              Debate-Zertifikat ($49)
            </Link>
            <Link href="/premium/b2b" className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-lg transition-all hover:text-slate-900 hover:shadow-sm border border-transparent hover:border-slate-200">
              <Building2 size={16} />
              Schul-Lizenzen
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        {/* Admin Link */}
        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-tight">
          <BarChart3 size={14} />
          Admin Dashboard
        </Link>

        {/* Status Card */}
        <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl text-white shadow-lg border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <p className="text-[10px] font-bold uppercase tracking-tighter">Freemium Plan</p>
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