"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { audioManager } from "@/utils/audio";

interface ModeSelectorProps {
  onSelectInvitation: () => void;
  onSelectGame: () => void;
}

export default function ModeSelector({
  onSelectInvitation,
  onSelectGame,
}: ModeSelectorProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(() => audioManager.getIsPlaying());
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const target = new Date("2026-09-18T08:00:00+07:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleMusic = () => {
    audioManager.playClick();
    const p = audioManager.toggleMute();
    setIsPlayingMusic(p);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const openInvite = () => {
    audioManager.playClick();
    audioManager.startBgm();
    setIsPlayingMusic(true);
    if ("vibrate" in navigator) try { navigator.vibrate([40, 60, 40]); } catch {}
    onSelectInvitation();
  };

  return (
    <div className="relative w-full min-h-full flex flex-col bg-white select-none">
      {/* Top Bar */}
      <div className="bg-[#ff6b97] px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded bg-white shadow-[1px_1px_0px_#8c0c41]" />
          <span className="font-rubik text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#6e0030]">ROMANCE.EXE</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleMusic} aria-label="Music" className="w-8 h-8 rounded-lg bg-[#316bf3] text-white grid place-items-center shadow-[2px_2px_0px_#003ea8] active:translate-y-0.5 active:shadow-none transition-all">
            <span className="material-symbols-outlined text-[18px]">{isPlayingMusic ? "music_note" : "music_off"}</span>
          </button>
          <button onClick={() => audioManager.playClick()} aria-label="Settings" className="w-8 h-8 rounded-lg bg-[#316bf3] text-white grid place-items-center shadow-[2px_2px_0px_#003ea8] active:translate-y-0.5 active:shadow-none transition-all">
            <span className="material-symbols-outlined text-[18px]">settings</span>
          </button>
          <button onClick={() => audioManager.playClick()} aria-label="Menu" className="w-8 h-8 rounded-lg bg-[#316bf3] text-white grid place-items-center shadow-[2px_2px_0px_#003ea8] active:translate-y-0.5 active:shadow-none transition-all">
            <span className="material-symbols-outlined text-[18px]">menu</span>
          </button>
        </div>
      </div>

      {/* Heart Garland */}
      <div className="bg-[#f5f3ef] border-y border-[#efeeea] py-2 px-4 flex justify-between items-center">
        {["#ff6b97","#a88cfb","#ffb1c3","#674bb5","#ff6b97","#a88cfb","#ff6b97"].map((c, i) => (
          <span key={i} className="material-symbols-outlined text-[16px]" style={{ color: c, fontVariationSettings: "'FILL' 1" }}>favorite</span>
        ))}
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto bg-[#fbf9f5] p-4 flex flex-col gap-4">
        {/* Title Box */}
        <div className="bg-[#f5f3ef] rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
          <div className="inline-flex items-center gap-1.5 bg-[#ffd9e0] text-[#3f0019] px-3 py-1 rounded-full shadow-[2px_2px_0px_#ffb1c3]">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="font-rubik text-[10px] font-bold tracking-[0.08em] uppercase">SAVE THE DATE</span>
          </div>
          <h1 className="font-rubik text-[32px] font-extrabold leading-none uppercase text-[#0051d5] mt-3">Aldi</h1>
          <span className="font-rubik text-[13px] font-bold text-[#674bb5] lowercase -my-1">and</span>
          <h1 className="font-rubik text-[32px] font-extrabold leading-none uppercase text-[#0051d5]">Qisty</h1>
          <p className="font-rubik text-[14px] font-semibold text-[#574145] mt-3 tracking-wide">Game to Forever</p>
          <div className="mt-2 bg-[#e8ddff] text-[#21005e] font-rubik text-[11px] font-bold px-3 py-1 rounded-full tracking-widest">#ALQISAH</div>
        </div>

        {/* Car */}
        <div className="relative bg-white rounded-xl p-3 shadow-[0_6px_16px_rgba(173,43,88,0.06)]">
          <div className="absolute -top-2 left-4">
            <span className="material-symbols-outlined text-[#ffb1c3] text-[18px] animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div className="absolute -top-2 right-6">
            <span className="material-symbols-outlined text-[#a88cfb] text-[18px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div className="bg-[#f5f3ef] rounded-xl h-[190px] flex items-center justify-center overflow-hidden p-2">
            <Image src="/wedding/sprite-car-transparent.png" alt="Aldi & Qisti car" width={600} height={300} className="w-full h-full object-contain pixelated" priority />
          </div>
        </div>

        {/* Event Card */}
        <div className="bg-[#dbe1ff] rounded-xl p-3 flex items-center justify-between shadow-[3px_3px_0px_#b4c5ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0051d5] text-white grid place-items-center shadow-[2px_2px_0px_#003ea8]">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div>
              <p className="font-rubik text-[13px] font-bold text-[#00174b] leading-tight">Jumat, 18 September 2026</p>
              <p className="font-jakarta text-xs text-[#003ea8]">Hotel Indies Style, Bandung</p>
            </div>
          </div>
          <span className="w-8 h-8 rounded-lg bg-white grid place-items-center text-[#0051d5] shadow-sm">
            <span className="material-symbols-outlined text-[18px]">pin_drop</span>
          </span>
        </div>

        {/* Countdown */}
        <div className="bg-white rounded-xl p-4 shadow-[0_4px_16px_rgba(173,43,88,0.06)]">
          <div className="flex items-center justify-center gap-1.5 mb-3 text-[#574145]">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span className="font-rubik text-[10px] font-bold tracking-[0.12em] uppercase">LEVEL STARTS IN</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { l: "DAYS", v: timeLeft.days, c: "text-[#ad2b58]" },
              { l: "HOURS", v: timeLeft.hours, c: "text-[#674bb5]" },
              { l: "MINS", v: timeLeft.mins, c: "text-[#0051d5]" },
              { l: "SECS", v: timeLeft.secs, c: "text-[#a88cfb]" },
            ].map((b) => (
              <div key={b.l} className="bg-[#f5f3ef] rounded-xl py-3 flex flex-col items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] border border-[#efeeea]">
                <span className={`font-rubik text-[18px] font-extrabold leading-none ${b.c}`}>{String(b.v).padStart(2, "0")}</span>
                <span className="font-rubik text-[10px] font-bold text-[#8a7175] tracking-widest mt-1">{b.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button onClick={openInvite} className="w-full py-3.5 bg-[#ad2b58] text-white rounded-xl font-rubik text-[13px] font-bold tracking-[0.08em] uppercase shadow-[0_4px_0_#6e0030] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2">
            BUKA UNDANGAN <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          </button>
          <button onClick={() => { audioManager.playClick(); onSelectGame(); }} className="w-full py-3.5 bg-[#e8ddff] text-[#21005e] rounded-xl font-rubik text-[13px] font-bold tracking-wide shadow-[0_4px_0_#cebdff] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 border border-[#cebdff]">
            PLAY MINI GAME <span className="material-symbols-outlined text-[18px]">sports_esports</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 py-2 text-[#0051d5]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5] animate-pulse" />
          <span className="font-rubik text-[10px] font-bold tracking-[0.14em] uppercase">★ PRESS START TO JOIN PARTY ★</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5] animate-pulse" />
        </div>
      </div>

      {/* Toast */}
      <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] bg-white border border-[#efeeea] rounded-xl p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center justify-between transition-all ${showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        <span className="flex items-center gap-2 font-jakarta text-xs font-medium text-[#1b1c1a]">
          <span className="material-symbols-outlined text-[#0051d5] text-[18px]">volume_up</span>
          {isPlayingMusic ? "Retro 8-bit theme active!" : "Musik dimatikan"}
        </span>
        <button onClick={() => setShowToast(false)} className="text-[#8a7175] p-1">
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
}
