"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, MessageSquare, MousePointerClick, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    user: "Loading...",
    messages: 0,
    clicks: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Fetching the TRUE data from local storage
    const name = localStorage.getItem("debater_name") || "No active user";
    const clicks = parseInt(localStorage.getItem("ad_clicks") || "0", 10);
    const messages = parseInt(localStorage.getItem("msg_count") || "0", 10);
    
    setStats({
      user: name,
      messages: messages,
      clicks: clicks,
      revenue: clicks * 0.45, // $0.45 per click as defined in your app
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Live session metrics and user activity.</p>
          </div>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-all"
          >
            <ArrowLeft size={16} /> Back to Arena
          </Link>
        </header>

        {/* Real Data KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Active User</h3>
              <User size={18} className="text-blue-600" />
            </div>
            <p className="text-xl font-bold text-slate-800 truncate">{stats.user}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Messages</h3>
              <MessageSquare size={18} className="text-blue-600" />
            </div>
            <p className="text-3xl font-black text-slate-800">{stats.messages}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ad Clicks</h3>
              <MousePointerClick size={18} className="text-blue-600" />
            </div>
            <p className="text-3xl font-black text-slate-800">{stats.clicks}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-green-500 uppercase tracking-widest">Session Revenue</h3>
              <DollarSign size={18} className="text-green-500" />
            </div>
            <p className="text-3xl font-black text-green-600">${stats.revenue.toFixed(2)}</p>
          </div>
        </div>

      </div>
    </div>
  );
}