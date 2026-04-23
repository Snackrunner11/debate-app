"use client";
import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';

interface AdProps {
  label: string;
  href: string;
  onTrack: () => void;
}

export default function AdBanner({ label, href, onTrack }: AdProps) {
  
  const handleBannerClick = () => {
    onTrack(); 
    sendGAEvent({ event: 'ad_click', value: label });
  };

  return (
    <Link 
      href={href}
      onClick={handleBannerClick}
      className="group relative w-full h-48 bg-white border border-slate-200 hover:border-blue-400 flex flex-col items-center justify-center cursor-pointer transition-all rounded-2xl p-6 text-center shadow-sm hover:shadow-md"
    >
      <div className="absolute top-3 left-3 bg-slate-100 text-[10px] text-slate-500 px-2 py-0.5 rounded uppercase tracking-tighter font-bold">
        Anzeige
      </div>
      <p className="text-slate-700 font-bold group-hover:scale-105 transition-transform">{label}</p>
    </Link>
  );
}