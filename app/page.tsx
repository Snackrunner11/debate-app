"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { model } from "../lib/gemini";
import AdBanner from "../components/AdBanner";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

export default function App() {
  const [messages, setMessages] = useState([{ role: "ai", text: "Verbinde..." }]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedName = localStorage.getItem("debater_name");
    const instructionsRead = localStorage.getItem("instructions_read");

    if (!savedName) {
      router.push("/login");
    } else {
      setUserName(savedName);
      setMessages([{ 
        role: "ai", 
        text: `Willkommen in der Arena, ${savedName}. Ich bin dein Sokratischer Sparringspartner. Wähle links ein Thema und deine Position, um zu beginnen.` 
      }]);
    }

    if (!instructionsRead) {
      setShowInstructions(true);
    }
  }, [router]);

  const closeInstructions = () => {
    localStorage.setItem("instructions_read", "true");
    setShowInstructions(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("debater_name");
    router.push("/login");
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const currentInput = input;
    setMessages(prev => [...prev, { role: "user", text: currentInput }, { role: "ai", text: "" }]);
    setInput("");
    setIsTyping(true);

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
        newMsgs[newMsgs.length - 1] = { role: "ai", text: "Verbindungsfehler. Bitte versuche es erneut." };
        return newMsgs;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleAdClick = () => {
    const savedClicks = parseInt(localStorage.getItem("ad_clicks") || "0", 10);
    localStorage.setItem("ad_clicks", (savedClicks + 1).toString());
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900 font-sans relative">
      
      {showInstructions && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-slate-200 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-black text-blue-600 italic tracking-tighter mb-4">AristotlAI</h2>
            <h3 className="text-xl font-bold text-slate-800 mb-4">So nutzt du deinen Sokratischen Sparringspartner</h3>
            
            <div className="text-slate-600 space-y-4 mb-8 text-sm leading-relaxed">
              <p>Willkommen zum intellektuellen Zweikampf. Dein KI-Gegner ist darauf ausgelegt, dein kritisches Denken, deine logische Konsistenz und deine Überzeugungskraft herauszufordern und zu verbessern.</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800 mb-2">Nutze die linke Seitenleiste, um deine Position (Pro/Contra) und ein Thema auszuwählen.</p>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Die Debatte:</strong> Die KI wird <em>Steel-Manning</em> nutzen, um die gegnerische Ansicht in ihrer stärkstmöglichen Form zu vertreten.</li>
                <li><strong>Das Coaching:</strong> Überprüfe nach jedem Zug die <span className="font-bold">COACH'S CORNER</span> am Ende der KI-Antwort für einen Logik-Check, eine Bewertungsnote (1-10) und strategische Tipps.</li>
                <li><strong>Das Ziel:</strong> Du musst unwiderlegbare, evidenzbasierte Argumente liefern, um die KI zur Aufgabe zu zwingen.</li>
              </ul>
            </div>

            <button 
              onClick={closeInstructions}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-200"
            >
              Ich habe verstanden. Arena betreten.
            </button>
          </div>
        </div>
      )}

      <aside className="w-72 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h1 className="text-xl font-black text-blue-600 italic tracking-tighter">AristotlAI</h1>
        </div>
        <Sidebar setInput={setInput} onShowHelp={() => setShowInstructions(true)} />
      </aside>

      <main className="flex-1 flex flex-col relative border-x border-slate-200 bg-white shadow-xl z-10">
        <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md shadow-blue-200">AI</div>
            <div className="text-sm font-bold text-slate-700">Arena <span className="text-slate-300 mx-2">/</span> <span className="text-blue-600">Standard-Debatte</span></div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 pl-3 pr-2 py-1.5 rounded-lg shadow-sm">
              <User size={14} className="text-blue-600" />
              <div className="pr-2 border-r border-slate-200">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-0.5">Nutzer</p>
                <p className="text-xs font-black text-slate-700 leading-none">{userName || "Gast"}</p>
              </div>
              <button 
                onClick={handleLogout} 
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                title="Sicher abmelden"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </header>
        <ChatWindow messages={messages} input={input} setInput={setInput} onSend={handleSend} isTyping={isTyping} />
      </main>

      <aside className="w-80 hidden lg:flex flex-col p-6 gap-4 bg-slate-50">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Marktplatz-Angebote</h3>
        
        <AdBanner 
          label="Debattier-Zertifikat freischalten - $49" 
          href="/premium/certificate" 
          onTrack={handleAdClick} 
        />
        
        <AdBanner 
          label="Grammarly Premium - 20% Rabatt" 
          href="https://www.grammarly.com" 
          onTrack={handleAdClick} 
        />
      </aside>
    </div>
  );
}