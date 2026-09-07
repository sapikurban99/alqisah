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
    <div className="relative w-full h-auto flex flex-col bg-[#fbf9f5] select-none home-auto-height" style={{ height: "auto", minHeight: "auto" }}>
      {/* Top Bar — stitch: bg-primary-container */}
      <div className="bg-[#ff6b97] px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-[2px] bg-white opacity-90 inline-block shadow-[1px_1px_0px_#8c0c41]" />
          <span className="font-rubik text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#6e0030]">ROMANCE.EXE</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleMusic} aria-label="Music" className="w-8 h-8 rounded-lg bg-[#316bf3] text-white grid place-items-center shadow-[2px_2px_0px_#003ea8] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
            <span className="material-symbols-outlined text-[18px]">{isPlayingMusic ? "music_note" : "music_off"}</span>
          </button>
          <button onClick={() => audioManager.playClick()} aria-label="Settings" className="w-8 h-8 rounded-lg bg-[#316bf3] text-white grid place-items-center shadow-[2px_2px_0px_#003ea8] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
            <span className="material-symbols-outlined text-[18px]">settings</span>
          </button>
          <button onClick={() => audioManager.playClick()} aria-label="Menu" className="w-8 h-8 rounded-lg bg-[#316bf3] text-white grid place-items-center shadow-[2px_2px_0px_#003ea8] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
            <span className="material-symbols-outlined text-[18px]">menu</span>
          </button>
        </div>
      </div>

      {/* Heart Garland — stitch: bg-surface-container-low */}
      <div className="bg-[#f5f3ef] py-2 px-3 flex justify-around items-center overflow-hidden select-none">
        {[
          { c: "#ff6b97", s: 20 },
          { c: "#a88cfb", s: 16 },
          { c: "#ff6b97", s: 20 },
          { c: "#674bb5", s: 16 },
          { c: "#ff6b97", s: 20 },
          { c: "#a88cfb", s: 16 },
          { c: "#ffb1c3", s: 20 },
        ].map((h, i) => (
          <span key={i} className="material-symbols-outlined" style={{ color: h.c, fontSize: `${h.s}px`, fontVariationSettings: "'FILL' 1", lineHeight: 1 }}>favorite</span>
        ))}
      </div>

      {/* Inner Viewport — stitch: p-window-frame-padding bg-surface-container-lowest */}
      <div className="p-5 flex flex-col items-center bg-white gap-4">
        {/* Title Box — stitch: bg-surface-container-low rounded-xl p-4 shadow-inner */}
        <div className="w-full bg-[#f5f3ef] rounded-xl p-4 flex flex-col items-center text-center shadow-inner">
          <div className="inline-flex items-center gap-1.5 bg-[#ffd9e0] text-[#3f0019] px-3 py-1 rounded-full mb-2 shadow-[2px_2px_0px_#ffb1c3]">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="font-rubik text-[10px] font-bold tracking-[0.08em] uppercase">SAVE THE DATE</span>
          </div>
          <h1 className="font-rubik text-[28px] font-extrabold leading-[36px] tracking-[0.02em] uppercase text-[#0051d5] mt-1">Aldi</h1>
          <span className="font-rubik text-[16px] font-semibold text-[#674bb5] lowercase -mt-1 -mb-1">and</span>
          <h1 className="font-rubik text-[28px] font-extrabold leading-[36px] tracking-[0.02em] uppercase text-[#0051d5] mb-2">Qisty</h1>
          <div className="flex flex-col items-center">
            <p className="font-rubik text-[16px] font-semibold tracking-[0.04em] text-[#574145]">Game to Forever</p>
            <div className="mt-1 inline-block bg-[#e8ddff] text-[#21005e] font-rubik text-[12px] font-semibold px-2 py-0.5 rounded"> #ALQISAH </div>
          </div>
        </div>

        {/* Car Illustration — stitch: w-full h-64 rounded-xl bg-surface-container shadow[0_6px_0_0] */}
        <div className="relative w-full flex justify-center items-center">
          <div className="absolute -top-3 left-4 animate-bounce">
            <span className="material-symbols-outlined text-[#ffb1c3] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div className="absolute -top-1 right-6 animate-pulse">
            <span className="material-symbols-outlined text-[#a88cfb] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-[0_6px_0_0_#efeeea] relative flex items-center justify-center bg-[#efeeea]">
            <Image src="/wedding/sprite-car-transparent.png" alt="Aldi & Qisti car" width={600} height={400} className="w-full h-full object-cover pixelated" priority />
          </div>
        </div>

        {/* Event Details Card — stitch: bg-secondary-fixed */}
        <div className="w-full bg-[#dbe1ff] text-[#00174b] rounded-xl p-3 mb-1 shadow-[3px_3px_0px_#b4c5ff] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0051d5] text-white flex items-center justify-center shadow-[1px_1px_0px_#003ea8]">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-rubik text-[16px] font-semibold leading-tight text-[#00174b]">Jumat, 18 September 2026</span>
              <span className="font-jakarta text-[12px] text-[#003ea8]">Hotel Indies Style, Bandung</span>
            </div>
          </div>
          <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-[#0051d5]">
            <span className="material-symbols-outlined text-[16px]">pin_drop</span>
          </div>
        </div>

        {/* Countdown — stitch: 4 boxes bg-surface-container shadow 2px */}
        <div className="w-full flex flex-col items-center mb-1">
          <div className="flex items-center gap-1 mb-2 text-[#574145]">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span className="font-rubik text-[10px] font-bold tracking-[0.08em] uppercase">LEVEL STARTS IN</span>
          </div>
          <div className="grid grid-cols-4 gap-2 w-full">
            {[
              { l: "DAYS", v: timeLeft.days, c: "text-[#ad2b58]" },
              { l: "HOURS", v: timeLeft.hours, c: "text-[#674bb5]" },
              { l: "MINS", v: timeLeft.mins, c: "text-[#0051d5]" },
              { l: "SECS", v: timeLeft.secs, c: "text-[#ff6b97]" },
            ].map((b) => (
              <div key={b.l} className="flex flex-col items-center bg-[#efeeea] py-2 rounded-lg shadow-[2px_2px_0px_#dbdad6]">
                <span className={`font-rubik text-[22px] font-bold leading-[28px] ${b.c}`}>{String(b.v).padStart(2, "0")}</span>
                <span className="font-rubik text-[10px] font-bold tracking-[0.08em] text-[#574145] uppercase">{b.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons — stitch: primary shadow 4px */}
        <div className="w-full flex flex-col gap-3">
          <button onClick={openInvite} className="w-full py-3 px-4 bg-[#ad2b58] text-white font-rubik text-[14px] font-bold tracking-[0.05em] uppercase rounded-xl shadow-[4px_4px_0px_#6e0030] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#6e0030] transition-all flex items-center justify-center gap-2">
            <span>BUKA UNDANGAN</span>
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          </button>
          <button onClick={() => { audioManager.playClick(); onSelectGame(); }} className="w-full py-3 px-4 bg-[#e8ddff] text-[#21005e] font-rubik text-[14px] font-bold tracking-wide rounded-xl shadow-[4px_4px_0px_#cebdff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#cebdff] transition-all flex items-center justify-center gap-2">
            <span>PLAY MINI GAME</span>
            <span className="material-symbols-outlined text-[18px]">sports_esports</span>
          </button>
        </div>

        {/* Insert Coin */}
        <div className="mt-2 flex items-center gap-1.5 text-[#0051d5] animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5]" />
          <span className="font-rubik text-[10px] font-bold tracking-[0.08em] uppercase">★ PRESS START TO JOIN PARTY ★</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5]" />
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
