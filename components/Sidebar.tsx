"use client";

export default function Sidebar({ setInput }: { setInput: (t: string) => void }) {
  const topics = ["AI Ethics", "Space Exploration", "School Uniforms", "Bitcoin"];

  return (
    <div className="flex flex-col h-full p-4 space-y-6">
      <div>
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Select Topic</h3>
        <div className="space-y-2">
          {topics.map(t => (
            <button 
              key={t}
              onClick={() => setInput(`I want to debate about ${t}`)}
              className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              # {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 bg-orange-50 border border-orange-100 rounded-xl">
        <h4 className="text-xs font-bold text-orange-800 mb-1">Data Mode: Freemium</h4>
        <p className="text-[10px] text-orange-700 leading-tight">
          Anonymized argument logs are being processed for AI model training. This covers your service costs.
        </p>
      </div>
    </div>
  );
}