"use client";
import { useState, useEffect } from "react";
import { TrendingUp, Users, DollarSign, Database, ChevronLeft, Building2, MousePointerClick, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [localClicks, setLocalClicks] = useState(0);
  const [localMsgs, setLocalMsgs] = useState(0);

  useEffect(() => {
    if (isAuthorized) {
      setLocalClicks(parseInt(localStorage.getItem("ad_clicks") || "0", 10));
      setLocalMsgs(parseInt(localStorage.getItem("msg_count") || "0", 10));
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="text-3xl font-bold">AristotlAI Admin</h1>
          <input 
            type="password" 
            placeholder="Admin-Code eingeben (Tipp: admin123)" 
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-center outline-none focus:border-blue-500 transition-colors"
            onChange={(e) => e.target.value === "admin123" && setIsAuthorized(true)}
          />
        </div>
      </div>
    );
  }

  const globalStats = [
    { label: "B2B Schul-Lizenzen", value: "14 Partner", icon: <Building2 className="text-blue-500" />, change: "+2" },
    { label: "Werbeeinnahmen (Meta/Google)", value: "$1,420.50", icon: <DollarSign className="text-green-500" />, change: "+12%" },
    { label: "Datenverkaufswert", value: "$4,102.00", icon: <Database className="text-orange-500" />, change: "+28%" },
    { label: "Zertifizierungen ($49)", value: "82 Verkäufe", icon: <TrendingUp className="text-purple-500" />, change: "+5.2%" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-sm text-blue-600 flex items-center gap-1 mb-2 hover:underline">
              <ChevronLeft size={14}/> Zurück zur Arena
            </Link>
            <h1 className="text-3xl font-black text-slate-900">AristotlAI Business Analytics</h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold shadow-sm flex items-center gap-2">
            Status: <span className="text-green-500 animate-pulse">● Profitabel</span>
          </div>
        </header>

        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Live Nutzer-Sitzung (Lokal)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/50 rounded-lg"><MousePointerClick size={20}/></div>
              </div>
              <p className="text-sm font-medium text-blue-200">Nutzer Banner-Klicks</p>
              <p className="text-2xl font-black">{localClicks} Klicks</p>
            </div>
            
            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-500/50 rounded-lg"><DollarSign size={20}/></div>
              </div>
              <p className="text-sm font-medium text-green-200">Generierte Einnahmen</p>
              <p className="text-2xl font-black">${(localClicks * 0.45).toFixed(2)}</p>
            </div>

            <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-700 rounded-lg"><MessageSquare size={20}/></div>
              </div>
              <p className="text-sm font-medium text-slate-400">Verfasste Prompts (Daten)</p>
              <p className="text-2xl font-black">{localMsgs} Datensätze</p>
            </div>
          </div>
        </div>

        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Globale KPIs</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {globalStats.map((s) => (
            <div key={s.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">{s.icon}</div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{s.change}</span>
              </div>
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <p className="text-xl font-black text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Aktive B2B & Daten-Netzwerk Verträge</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 font-bold">
              <tr>
                <th className="px-6 py-3">Partner</th>
                <th className="px-6 py-3">Typ</th>
                <th className="px-6 py-3">Volumen</th>
                <th className="px-6 py-3">Ertrag</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">Alphabet/Meta Ads</td>
                <td className="px-6 py-4 italic text-xs">Werbenetzwerk</td>
                <td className="px-6 py-4 text-xs font-mono">142k Anfragen</td>
                <td className="px-6 py-4 text-green-600 font-bold">$640.00</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">Kantonsschule Zürich</td>
                <td className="px-6 py-4 italic text-xs">B2B-Lizenz</td>
                <td className="px-6 py-4 text-xs font-mono">500 Nutzer</td>
                <td className="px-6 py-4 text-green-600 font-bold">$2,400.00</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">OpenAI Training Data</td>
                <td className="px-6 py-4 italic text-xs">Datenmonetarisierung</td>
                <td className="px-6 py-4 text-xs font-mono">80k anonym. Logs</td>
                <td className="px-6 py-4 text-green-600 font-bold">$1,200.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}