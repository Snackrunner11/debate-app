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
  const router = useRouter();

  useEffect(() => {
    const savedName = localStorage.getItem("debater_name");
    if (!savedName) {
      router.push("/login");
    } else {
      setMessages([{ role: "ai", text: `Welcome to the arena, ${savedName}. Select a topic or state your position to begin.` }]);
    }
  }, [router]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const currentInput = input;
    setMessages(prev => [...prev, { role: "user", text: currentInput }, { role: "ai", text: "" }]);
    setInput("");
    setIsTyping(true);

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

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900 font-sans">
      <aside className="w-72 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 bg-white"><h1 className="text-xl font-black text-blue-600 italic tracking-tighter">DEBATE.AI</h1></div>
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
        <AdBanner label="Unlock Debate Certification - $49" onTrack={() => setClicks(c => c + 1)} />
        <AdBanner label="Hire a Pro Rhetoric Coach" onTrack={() => setClicks(c => c + 1)} />
      </aside>
    </div>
  );
}