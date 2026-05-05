"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Settings2, ChevronDown } from "lucide-react";
import { model } from "../lib/gemini";
import AdBanner from "../components/AdBanner";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";
import MultiplayerWindow from "../components/MultiplayerWindow";

const AI_PERSONAS = [
  { 
    id: "socrates", 
    name: "Sokrates (Standard)", 
    prompt: "Du bist ein sokratischer Sparringspartner. Antworte oft mit tiefgründigen Gegenfragen, um die Logik des Nutzers zu prüfen. Bleibe ruhig, höflich, aber intellektuell extrem fordernd." 
  },
  { 
    id: "provocateur", 
    name: "Der Provokateur", 
    prompt: "Du bist ein aggressiver, sarkastischer Debattierer. Du zeigst keine Gnade, kritisierst scharf und versuchst, die Argumente des Nutzers als lächerlich oder schwach darzustellen." 
  },
  { 
    id: "diplomat", 
    name: "Der Diplomat", 
    prompt: "Du bist extrem verständnisvoll. Du stimmst dem Nutzer in einigen Punkten zu, suchst nach Kompromissen und bringst deine Gegenargumente sehr sanft und konstruktiv ein." 
  }
];

export default function App() {
  const [messages, setMessages] = useState([{ role: "ai", text: "Verbinde..." }]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(AI_PERSONAS[0]);
  
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
        text: `Willkommen in der Arena, ${savedName}. Ich bin bereit für die Debatte. Wähle oben im Menü meinen Charakter aus.` 
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

    const promptWithPersona = `[System-Anweisung: Verhalte dich für die folgende Antwort strikt wie diese Persona: ${selectedPersona.prompt}]\n\nNutzer-Argument: ${currentInput}`;

    try {
      const result = await model.generateContentStream(promptWithPersona);
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
              <button 
                onClick={closeInstructions}
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-200"
              >
                Ich habe verstanden. Arena betreten.
              </button>
            </div>
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
        
        {/* --- ÜBERARBEITETER, SAUBERER HEADER --- */}
        <header className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-20">
          
          {/* Linke Seite: Kontext & Dropdown */}
          <div className="flex items-center gap-4">
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm">AI</div>
              <span className="text-slate-800 font-bold text-sm hidden sm:block">Debattier-Arena</span>
            </div>
            
            {/* Trennlinie */}
            <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
            
            {/* Sauberes Persona-Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 transition-colors">
                <Settings2 size={14} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
                <select 
                  value={selectedPersona.id}
                  onChange={(e) => {
                    const newPersona = AI_PERSONAS.find(p => p.id === e.target.value) || AI_PERSONAS[0];
                    setSelectedPersona(newPersona);
                  }}
                  /* appearance-none versteckt den Standard-Browser-Pfeil, pr-6 macht Platz für unser eigenes Icon */
                  className="bg-transparent border-none text-sm font-semibold text-slate-700 cursor-pointer outline-none appearance-none pr-6 w-full"
                >
                  {AI_PERSONAS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {/* Unser eigenes, sauberes Chevron-Icon über dem Select platziert */}
                <ChevronDown size={14} className="text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

          </div>
          
          {/* Rechte Seite: Benutzer-Profil */}
          <div className="flex items-center">
            <div className="flex items-center gap-3 bg-white border border-slate-200 pl-3 pr-1.5 py-1.5 rounded-full shadow-sm">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-blue-50 rounded-full flex items-center justify-center">
                  <User size={12} className="text-blue-600" />
                </div>
                <span className="text-sm font-bold text-slate-700 pr-2">{userName || "Gast"}</span>
              </div>
              <div className="w-px h-4 bg-slate-200"></div>
              <button 
                onClick={handleLogout} 
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors flex items-center justify-center"
                title="Sicher abmelden"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>

        </header>
        
        <ChatWindow messages={messages} input={input} setInput={setInput} onSend={handleSend} isTyping={isTyping} />
      </main>

      <aside className="w-80 hidden lg:flex flex-col p-6 gap-4 bg-slate-50 overflow-y-auto">
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

        <div className="mt-4 border-t border-slate-200 pt-6">
          <MultiplayerWindow />
        </div>
      </aside>
    </div>
  );
}