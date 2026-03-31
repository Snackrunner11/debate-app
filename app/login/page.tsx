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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
          <Shield className="text-white" size={32} />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">DEBATE.AI</h1>
        <p className="text-slate-500 text-sm mb-8">Enter your name to join the training arena.</p>

        <form onSubmit={handleJoin} className="space-y-4">
          <input 
            type="text" 
            placeholder="Your Name (e.g. John Doe)" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-center font-medium"
            required
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-200"
          >
            Enter Arena <ArrowRight size={18} />
          </button>
        </form>
      </div>
      <p className="mt-8 text-xs text-slate-400 font-medium">
        By entering, you agree to our Data Monetization Policy.
      </p>
    </div>
  );
}