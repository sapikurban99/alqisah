"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { audioManager } from "@/utils/audio";

interface CoverSectionProps {
  onOpen: () => void;
  onPlayGame?: () => void;
}

export default function CoverSection({ onOpen, onPlayGame }: CoverSectionProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isPlaying, setIsPlaying] = useState(() => audioManager.getIsPlaying());

  useEffect(() => {
    const t = new Date("2026-09-18T08:00:00+07:00").getTime();
    const tick = () => {
      const d = t - Date.now();
      if (d > 0) setTimeLeft({
        days: Math.floor(d / (86400000)),
        hours: Math.floor((d % 86400000) / 3600000),
        mins: Math.floor((d % 3600000) / 60000),
        secs: Math.floor((d % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleOpen = () => {
    audioManager.playClick();
    audioManager.startBgm();
    setIsPlaying(true);
    onOpen();
  };

  return (
    <div className="w-full min-h-full flex flex-col bg-white select-none">
      <div className="bg-[#ff6b97] px-4 py-3 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded bg-white shadow-[1px_1px_0px_#8c0c41]" />
          <span className="font-rubik text-[11px] font-extrabold tracking-[0.12em] text-[#6e0030] uppercase">ROMANCE.EXE</span>
        </span>
        <button onClick={() => setIsPlaying(audioManager.toggleMute())} className="w-8 h-8 rounded-lg bg-[#316bf3] text-white grid place-items-center shadow-[2px_2px_0px_#003ea8]">
          <span className="material-symbols-outlined text-[18px]">{isPlaying ? "music_note" : "music_off"}</span>
        </button>
      </div>

      <div className="bg-[#f5f3ef] border-y border-[#efeeea] py-2 px-4 flex justify-between">
        {["#ff6b97","#a88cfb","#ffb1c3","#674bb5","#ff6b97","#a88cfb","#ff6b97"].map((c,i)=>(
          <span key={i} className="material-symbols-outlined text-[16px]" style={{ color:c, fontVariationSettings:"'FILL' 1"}}>favorite</span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#fbf9f5] p-4 flex flex-col gap-4">
        <div className="bg-[#f5f3ef] rounded-xl p-5 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#ffd9e0] text-[#3f0019] px-3 py-1 rounded-full shadow-[2px_2px_0px_#ffb1c3]">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings:"'FILL' 1"}}>favorite</span>
            <span className="font-rubik text-[10px] font-bold tracking-[0.08em] uppercase">SAVE THE DATE</span>
          </div>
          <h1 className="font-rubik text-[32px] font-extrabold leading-none uppercase text-[#0051d5] mt-3">Aldi</h1>
          <span className="font-rubik text-[13px] font-bold text-[#674bb5] lowercase -my-1">and</span>
          <h1 className="font-rubik text-[32px] font-extrabold leading-none uppercase text-[#0051d5]">Qisty</h1>
          <p className="font-rubik text-[14px] font-semibold text-[#574145] mt-3">Game to Forever</p>
          <div className="mt-2 bg-[#e8ddff] text-[#21005e] font-rubik text-[11px] font-bold px-3 py-1 rounded-full">#ALQISAH</div>
        </div>

        <div className="bg-white rounded-xl p-3 shadow-[0_6px_16px_rgba(173,43,88,0.06)]">
          <div className="bg-[#f5f3ef] rounded-xl h-[190px] flex items-center justify-center p-2">
            <Image src="/wedding/sprite-car-transparent.png" alt="car" width={600} height={300} className="w-full h-full object-contain pixelated" priority />
          </div>
        </div>

        <div className="bg-[#dbe1ff] rounded-xl p-3 flex items-center justify-between shadow-[3px_3px_0px_#b4c5ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0051d5] text-white grid place-items-center">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div>
              <p className="font-rubik text-[13px] font-bold text-[#00174b]">Jumat, 18 September 2026</p>
              <p className="font-jakarta text-xs text-[#003ea8]">Hotel Indies Style, Bandung</p>
            </div>
          </div>
          <span className="w-8 h-8 rounded-lg bg-white grid place-items-center text-[#0051d5]">
            <span className="material-symbols-outlined">pin_drop</span>
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-center gap-1.5 mb-3 text-[#574145]">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span className="font-rubik text-[10px] font-bold tracking-[0.12em] uppercase">LEVEL STARTS IN</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { l:"DAYS", v:timeLeft.days },
              { l:"HOURS", v:timeLeft.hours },
              { l:"MINS", v:timeLeft.mins },
              { l:"SECS", v:timeLeft.secs },
            ].map(b=>(
              <div key={b.l} className="bg-[#f5f3ef] rounded-xl py-3 flex flex-col items-center border border-[#efeeea]">
                <span className="font-rubik text-[16px] font-extrabold text-[#ad2b58]">{String(b.v).padStart(2,"0")}</span>
                <span className="font-rubik text-[9px] font-bold text-[#8a7175]">{b.l}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleOpen} className="w-full py-3.5 bg-[#ad2b58] text-white rounded-xl font-rubik text-[13px] font-bold uppercase tracking-[0.08em] shadow-[0_4px_0_#6e0030] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2">
          BUKA UNDANGAN <span className="material-symbols-outlined text-[18px]">play_arrow</span>
        </button>
        {onPlayGame && (
          <button onClick={onPlayGame} className="w-full py-3.5 bg-[#e8ddff] text-[#21005e] rounded-xl font-rubik text-[13px] font-bold shadow-[0_4px_0_#cebdff] flex items-center justify-center gap-2 border border-[#cebdff]">
            PLAY MINI GAME <span className="material-symbols-outlined">sports_esports</span>
          </button>
        )}
      </div>
    </div>
  );
}
