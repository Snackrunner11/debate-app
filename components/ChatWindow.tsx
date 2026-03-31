"use client";

export default function ChatWindow({ messages, input, setInput, onSend, isTyping }: any) {
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m: any, i: number) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm border ${
              m.role === "user" 
                ? "bg-blue-600 text-white border-blue-500 rounded-br-none" 
                : "bg-gray-50 text-gray-800 border-gray-200 rounded-bl-none"
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none animate-pulse text-gray-400 text-xs">
              AI Coach is analyzing your logic...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input 
            className="flex-1 border-2 border-gray-100 rounded-full px-6 py-3 outline-none focus:border-blue-500 transition-all text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Counter the argument..."
          />
          <button 
            onClick={onSend}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 active:scale-95 transition-all"
          >
            Debate
          </button>
        </div>
      </div>
    </div>
  );
}