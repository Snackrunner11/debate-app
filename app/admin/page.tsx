"use client";
import { useState } from "react";
import { TrendingUp, Users, DollarSign, Activity, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <input 
            type="password" 
            placeholder="Enter Admin Secret" 
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-center outline-none focus:border-blue-500 transition-colors"
            onChange={(e) => e.target.value === "admin123" && setIsAuthorized(true)}
          />
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Ad Revenue", value: "$1,420.50", icon: <DollarSign className="text-green-500" />, change: "+12%" },
    { label: "Active Debaters", value: "8,294", icon: <Users className="text-blue-500" />, change: "+5.2%" },
    { label: "Data Logs Processed", value: "142k", icon: <Activity className="text-orange-500" />, change: "+28%" },
    { label: "API Efficiency", value: "99.8%", icon: <TrendingUp className="text-purple-500" />, change: "Optimal" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-sm text-blue-600 flex items-center gap-1 mb-2 hover:underline">
              <ChevronLeft size={14}/> Back to Arena
            </Link>
            <h1 className="text-3xl font-black text-slate-900">Platform Analytics</h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold shadow-sm flex items-center gap-2">
            Live Feed: <span className="text-green-500 animate-pulse">● Connected</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">{s.icon}</div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{s.change}</span>
              </div>
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Argument Data Sales</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 font-bold">
              <tr>
                <th className="px-6 py-3">User ID</th>
                <th className="px-6 py-3">Topic</th>
                <th className="px-6 py-3">Sentiment Score</th>
                <th className="px-6 py-3">Revenue Share</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">USR_829{i}</td>
                  <td className="px-6 py-4">AI Ethics & Liability</td>
                  <td className="px-6 py-4">0.82 (High Logic)</td>
                  <td className="px-6 py-4 text-green-600 font-bold">+$0.45</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}