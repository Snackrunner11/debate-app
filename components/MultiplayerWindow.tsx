// components/MultiplayerWindow.tsx
import React from 'react';

export default function MultiplayerWindow() {
  return (
    <div className="flex flex-col items-center justify-center p-8 mt-6 border-2 border-dashed border-blue-400 bg-blue-50 rounded-xl shadow-sm text-center">
      <div className="mb-4 text-blue-600">
        {/* Ein kleines Icon (optional), z.B. zwei Sprechblasen oder User */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Live-Debatten (Kommt bald!)
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        Mach dich bereit! In Zukunft wirst du hier nicht nur gegen unsere KI antreten können, sondern auch in Echtzeit gegen andere Nutzer aus der ganzen Welt debattieren.
      </p>

      <div className="w-full bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <p className="text-sm text-gray-400 italic">
          [Platzhalter für zukünftiges Matchmaking-System & Lobby]
        </p>
      </div>

      <button 
        disabled 
        className="px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed transition-all"
      >
        Gegner suchen (Demnächst verfügbar)
      </button>
    </div>
  );
}