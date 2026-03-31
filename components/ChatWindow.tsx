"use client";

interface ChatProps {
  messages: { role: string; text: string }[];
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  isTyping: boolean;
}

export default function ChatWindow({ messages, input, setInput, onSend, isTyping }: ChatProps) {
  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] p-4 shadow-sm border ${
              m.role === "user" 
                ? "bg-blue-600 text-white border-blue-500 rounded-2xl rounded-br-none" 
                : "bg-white text-slate-800 border-slate-200 rounded-2xl rounded-bl-none"
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        
        {/* "Thinking..." State */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-200 animate-pulse text-slate-400 text-xs shadow-sm">
              Coach is analyzing your logic...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input 
            className="flex-1 border border-slate-200 bg-slate-50 rounded-full px-6 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Counter the argument..."
          />
          <button 
            onClick={onSend}
            disabled={isTyping}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all shadow-md shadow-blue-200"
          >
            Debate
          </button>
        </div>
      </div>
      
    </div>
  );
}