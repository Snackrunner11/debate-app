"use client";
import { useState } from "react";
import { model } from "../lib/gemini";
import AdBanner from "../components/AdBanner";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

export default function App() {
  const [messages, setMessages] = useState([{ role: "ai", text: "Welcome. Let's debate." }]);
  const [input, setInput] = useState("");
  const [clicks, setClicks] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const currentInput = input;
    setMessages(prev => [...prev, { role: "user", text: currentInput }]);
    setInput("");
    setIsTyping(true);

    setMessages(prev => [...prev, { role: "ai", text: "" }]);

    try {
      const result = await model.generateContentStream(currentInput);
      
      let fullText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        
        // 2. Update the LAST message in the list with the new text
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: "ai", text: fullText };
          return newMsgs;
        });
      }
    } catch (err: any) {
      console.error("Gemini Error:", err);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1] = { role: "ai", text: `Error: ${err.message}. Try again!` };
        return newMsgs;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-slate-900">
      <aside className="w-72 border-r bg-gray-50 flex flex-col">
        <div className="p-6 border-b bg-white"><h1 className="text-xl font-black text-blue-600 italic">DEBATE.AI</h1></div>
        <Sidebar setInput={setInput} />
      </aside>

      <main className="flex-1 flex flex-col relative">
        <header className="h-16 border-b flex items-center justify-between px-8 bg-white">
          <div className="text-sm font-bold text-gray-400 italic">⚡ Powered by Gemini 1.5 Flash (Ultra Fast)</div>
          <div className="text-right"><p className="text-lg font-black text-green-600">${(clicks * 0.45).toFixed(2)}</p></div>
        </header>
        <ChatWindow messages={messages} input={input} setInput={setInput} onSend={handleSend} isTyping={isTyping} />
      </main>

      <aside className="w-80 border-l bg-gray-50 p-6 flex flex-col gap-6">
        <AdBanner label="Debate Masterclass" onTrack={() => setClicks(c => c + 1)} position="right" />
        <AdBanner label="Premium Rhetoric Pro" onTrack={() => setClicks(c => c + 1)} position="right" />
      </aside>
    </div>
  );
}