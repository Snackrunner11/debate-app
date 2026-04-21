"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { model } from "../lib/gemini";
import AdBanner from "../components/AdBanner";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

export default function App() {
  const [messages, setMessages] = useState([{ role: "ai", text: "Connecting..." }]);
  const [input, setInput] = useState("");
  const [clicks, setClicks] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Check for user login
    const savedName = localStorage.getItem("debater_name");
    if (!savedName) {
      router.push("/login");
    } else {
      setMessages([{ 
        role: "ai", 
        text: `Welcome to the arena, ${savedName}. I am your Socratic Sparring Partner. Select a topic and your stance to begin.` 
      }]);
    }

    // 2. Load existing clicks from local storage so earnings persist
    const savedClicks = parseInt(localStorage.getItem("ad_clicks") || "0", 10);
    setClicks(savedClicks);
  }, [router]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const currentInput = input;
    setMessages(prev => [...prev, { role: "user", text: currentInput }, { role: "ai", text: "" }]);
    setInput("");
    setIsTyping(true);

    // --- ADMIN PANEL TRACKING: Track total messages sent ---
    const currentCount = parseInt(localStorage.getItem("msg_count") || "0", 10);
    localStorage.setItem("msg_count", (currentCount + 1).toString());

    try {
      const result = await model.generateContentStream(currentInput);
      let fullText = "";
      for await (const chunk of result.stream) {
        fullText += chunk.text();
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: "ai", text: fullText };
          return newMsgs;
        });
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: "ai", text: "Connection error. Please try again." };
        return newMsgs;
      });
    } finally {
      setIsTyping(false);
    }
  };

  // --- ADMIN PANEL TRACKING: Track ad clicks ---
  const handleAdClick = () => {
    setClicks(prev => {
      const newCount = prev + 1;
      localStorage.setItem("ad_clicks", newCount.toString());
      return newCount;
    });
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900 font-sans relative">
      
      {/* --- INSTRUCTIONS MODAL --- */}
      {showInstructions && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-slate-200 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-black text-blue-600 italic tracking-tighter mb-4">DEBATE.AI</h2>
            <h3 className="text-xl font-bold text-slate-800 mb-4">How to Use Your Socratic Sparring Partner</h3>
            
            <div className="text-slate-600 space-y-4 mb-8 text-sm leading-relaxed">
              <p>
                Welcome to rigorous intellectual combat. Your AI opponent is designed to improve your critical thinking, logical consistency, and persuasive ability.
              </p>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800 mb-2">Use the left sidebar to select your stance (Pro/Con) and pick a training ground.</p>
              </div>

              <ul className="list-disc pl-5 space-y-2">
                <li><strong>The Debate:</strong> The AI will use <em>Steel-manning</em> to represent the opposing view in its strongest possible form.</li>
                <li><strong>The Coaching:</strong> After every turn, check the <span className="font-bold">COACH'S CORNER</span> at the bottom of the AI's response for a logic check, a strength rating (1-10), and strategic tips.</li>
                <li><strong>The Goal:</strong> You must provide irrefutable, evidenced-backed points to force a concession.</li>
              </ul>
            </div>

            <button 
              onClick={() => setShowInstructions(false)}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-200"
            >
              I Understand. Enter the Arena.
            </button>
          </div>
        </div>
      )}

      <aside className="w-72 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h1 className="text-xl font-black text-blue-600 italic tracking-tighter">DEBATE.AI</h1>
        </div>
        <Sidebar setInput={setInput} />
      </aside>

      <main className="flex-1 flex flex-col relative border-x border-slate-200 bg-white shadow-xl z-10">
        <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md shadow-blue-200">DL</div>
            <div className="text-sm font-bold text-slate-700">Arena <span className="text-slate-300 mx-2">/</span> <span className="text-blue-600">Standard Debate</span></div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Session Earnings</p>
            <p className="text-lg font-black text-green-600 tracking-tighter">${(clicks * 0.45).toFixed(2)}</p>
          </div>
        </header>
        <ChatWindow messages={messages} input={input} setInput={setInput} onSend={handleSend} isTyping={isTyping} />
      </main>

      <aside className="w-80 hidden lg:flex flex-col p-6 gap-4 bg-slate-50">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Marketplace Offers</h3>
        {/* Ad Banners now use the handleAdClick function */}
        <AdBanner label="Unlock Debate Certification - $49" onTrack={handleAdClick} />
        <AdBanner label="Hire a Pro Rhetoric Coach" onTrack={handleAdClick} />
      </aside>
    </div>
  );
}