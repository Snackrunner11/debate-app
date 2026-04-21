"use client";
import Link from "next/link";
import { ChevronLeft, GraduationCap, CheckCircle } from "lucide-react";
import { sendGAEvent } from '@next/third-parties/google';

export default function CertificatePage() {
  const handleBuyClick = () => {
    sendGAEvent({ event: 'premium_click', value: 'certificate_49' });
    alert("Demo-Modus: Kaufprozess simuliert. Das Event 'premium_click' wurde an Google Analytics gesendet!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm text-blue-600 flex items-center gap-1 mb-8 hover:underline">
          <ChevronLeft size={14}/> Zurück zur Arena
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200">
          <div className="p-10 md:w-1/2 flex flex-col justify-center bg-slate-900 text-white relative overflow-hidden">
            <GraduationCap size={120} className="absolute -top-10 -right-10 opacity-10" />
            <h1 className="text-4xl font-black mb-4 z-10">AristotlAI<br/>Rhetorik-Diplom</h1>
            <p className="text-slate-400 mb-8 z-10">Zertifiziere deine Überzeugungskraft. Das offizielle Diplom, ausgestellt von unserer KI nach einer strengen 60-minütigen Live-Debatte.</p>
            <div className="text-5xl font-black text-green-400 z-10">$49<span className="text-lg text-slate-400 font-medium"> / Prüfung</span></div>
          </div>
          
          <div className="p-10 md:w-1/2 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Was du erhältst:</h3>
            <ul className="space-y-4 mb-8">
              {['Offizielles PDF-Zertifikat für LinkedIn', 'Detail-Analyse deiner Logikfehler', 'Abzeichen im AristotlAI Arena Profil', 'Bevorzugter API-Zugang (Keine Wartezeiten)'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle size={20} className="text-blue-500" /> {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={handleBuyClick}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
            >
              Jetzt Prüfung buchen
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">Sichere Zahlung via Stripe.</p>
          </div>
        </div>
      </div>
    </div>
  );
}