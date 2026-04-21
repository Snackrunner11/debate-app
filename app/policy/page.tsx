import Link from "next/link";
import { ChevronLeft, ShieldCheck, Database, Lock } from "lucide-react";

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
        <Link href="/" className="text-sm text-blue-600 flex items-center gap-1 mb-8 hover:underline">
          <ChevronLeft size={14}/> Zurück zur Arena
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Data Monetization Policy</h1>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Database size={20} className="text-blue-500"/> 1. Wie wir AristotlAI kostenlos halten
            </h2>
            <p>Unser Ziel ist es, hochwertige rhetorische Bildung für jeden zugänglich zu machen. Anstatt monatliche Abo-Gebühren für Privatnutzer zu verlangen, refinanziert sich AristotlAI durch die Monetarisierung von anonymisierten Argumentationsdaten.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lock size={20} className="text-green-500"/> 2. Strikte Anonymisierung
            </h2>
            <p>Wenn du mit unserem Socratic Sparring Partner debattierst, trennen wir deine Logik-Strukturen und Argumente von deiner Identität (Name, IP-Adresse). <strong>Es werden niemals persönliche Daten an Dritte verkauft.</strong> Wir verkaufen ausschließlich die abstrakten Debatten-Muster.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Wer sind unsere Partner?</h2>
            <ul className="list-disc ml-6 space-y-2 mt-2">
              <li><strong>Alphabet & Meta:</strong> Nutzen die Daten, um kognitives User-Targeting in ihren Werbenetzwerken zu verbessern.</li>
              <li><strong>KI-Entwickler (z.B. OpenAI):</strong> Nutzen die hochqualitativen Argumentations-Logs, um zukünftige Sprachmodelle (LLMs) im Bereich "Logical Reasoning" zu trainieren.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}