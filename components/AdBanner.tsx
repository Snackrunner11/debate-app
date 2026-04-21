"use client";
import { sendGAEvent } from '@next/third-parties/google';

interface AdProps {
  label: string;
  onTrack: () => void;
}

export default function AdBanner({ label, onTrack }: AdProps) {
  
  const handleBannerClick = () => {
    // 1. Zählt das Geld im UI hoch
    onTrack();
    
    // 2. Sendet den Klick an Google Analytics
    sendGAEvent({ event: 'ad_click', value: label });
  };

  return (
    <div 
      onClick={handleBannerClick}
      className="group relative w-full h-48 bg-white border border-slate-200 hover:border-blue-400 flex flex-col items-center justify-center cursor-pointer transition-all rounded-2xl p-6 text-center shadow-sm hover:shadow-md"
    >
      <div className="absolute top-3 left-3 bg-slate-100 text-[10px] text-slate-500 px-2 py-0.5 rounded uppercase tracking-tighter font-bold">
        Sponsored
      </div>
      <p className="text-slate-700 font-bold group-hover:scale-105 transition-transform">{label}</p>
      <div className="mt-4 text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        + Click to simulate click ($0.45)
      </div>
    </div>
  );
}