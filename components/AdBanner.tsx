// components/AdBanner.tsx
"use client";
import { sendGAEvent } from '@next/third-parties/google';

interface AdProps {
  label: string;
  onTrack: () => void;
  position: "left" | "right";
}

export default function AdBanner({ label, onTrack, position }: AdProps) {
  
  // Diese Funktion macht beides: Optisches Update + Google Analytics Tracking
  const handleBannerClick = () => {
    // 1. Zählt das Geld in der App hoch
    onTrack();
    
    // 2. Schickt den genauen Klick an Google Analytics
    sendGAEvent({ event: 'ad_click', value: label });
  };

  return (
    <div 
      onClick={handleBannerClick}
      className="group relative w-full h-72 bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all rounded-xl p-6 text-center"
    >
      <div className="absolute top-2 left-2 bg-gray-500 text-[10px] text-white px-2 py-0.5 rounded uppercase tracking-tighter font-bold">
        Sponsored
      </div>
      <p className="text-gray-800 font-bold group-hover:scale-105 transition-transform">{label}</p>
      <div className="mt-4 text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        Click to generate $0.45 revenue
      </div>
    </div>
  );
}