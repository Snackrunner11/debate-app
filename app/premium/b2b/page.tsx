"use client";
import Link from "next/link";
import { ChevronLeft, Building2, Users, BarChart, CheckCircle2 } from "lucide-react";
import { sendGAEvent } from '@next/third-parties/google';

export default function B2BPage() {
  const handleLeadGen = () => {
    sendGAEvent({ event: 'b2b_lead', value: 'school_license' });
    alert("Demo-Modus: Lead erfasst. Das Event 'b2b_lead' wurde an Google Analytics gesendet!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-sm text-blue-600 font-bold flex items-center gap-1 mb-8 hover:underline">
          <ChevronLeft size={16}/> Zurück zur Arena
        </Link>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Empower Your Students.</h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            AristotlAI für Bildungseinrichtungen. Trainieren Sie kritisches Denken und objektive Argumentation mit Echtzeit-KI-Feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl mb-6">
              <Users size={32} />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Massen-Lizenzen</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Ab 50 Schülern. Komplett werbefrei und ohne Daten-Monetarisierung für maximale Privatsphäre im Unterricht.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl mb-6">
              <BarChart size={32} />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Teacher Dashboard</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Verfolgen Sie Fortschritte und identifizieren Sie häufige Logikfehler der gesamten Klasse auf einen Blick.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl mb-6">
              <Building2 size={32} />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">Custom Topics</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Integrieren Sie spezifische Debatten-Themen, die exakt auf Ihren Lehrplan und aktuelle Unterrichtsinhalte abgestimmt sind.
            </p>
          </div>
        </div>

        {/* CTA Section mit besserem Kontrast auf Dunkel */}
        <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6">Bereit für die Zukunft der Bildung?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Kontaktieren Sie unser Sales-Team für ein maßgeschneidertes Angebot für Ihre Schule oder Universität.
            </p>
            <button 
              onClick={handleLeadGen}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full active:scale-95 transition-all shadow-lg shadow-blue-900/20"
            >
              Demo & Angebot anfordern
            </button>
          </div>
          {/* Subtile Deko im Hintergrund */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>
      </div>
    </div>
  );
}