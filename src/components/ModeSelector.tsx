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
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    setIsPlayingMusic(audioManager.getIsPlaying());
  }, []);

  const handleToggleMusic = () => {
    audioManager.playClick();
    const playing = audioManager.toggleMute();
    setIsPlayingMusic(playing);
  };

  const handleOpenInvitation = () => {
    audioManager.playClick();
    onSelectInvitation();
  };

  const handleOpenGame = () => {
    audioManager.playClick();
    onSelectGame();
  };

  return (
    <div className="relative w-full min-h-full flex flex-col overflow-x-clip bg-[#ffb6c1] select-none">
      {/* Top Navbar — 44px touch targets (a11y), flexible padding */}
      <div className="bg-[#ff94a8] w-full px-4 py-2 flex justify-end items-center gap-2 border-b-4 border-[#f08080] shrink-0 z-20 shadow-sm">
        <button
          onClick={handleToggleMusic}
          className={`w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded cursor-pointer text-base pixel-btn ${
            isPlayingMusic
              ? "bg-[#ffd93d] text-[#1e3a8a] animate-bounce"
              : "bg-[#87ceeb] text-[#1e3a8a]"
          }`}
          title={isPlayingMusic ? "Matikan Musik" : "Putar Musik"}
        >
          {isPlayingMusic ? "🎶" : "🎵"}
        </button>

        <button
          onClick={() => {
            audioManager.playClick();
            alert("Undangan Pernikahan Aldi & Qisty (#AlQiSAH)\nJumat, 18 September 2026\nMonte Carlo Circuit Theme");
          }}
          className="bg-[#87ceeb] text-[#1e3a8a] w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded cursor-pointer text-base pixel-btn"
          title="Info"
        >
          ℹ️
        </button>
      </div>

      {/* Main Center Area: Frame + Car (car in-flow, overlap derived from frame padding) */}
      <div className="flex-1 w-full px-4 py-3 flex flex-col items-center justify-center min-h-0 z-10">
        {/* Heart decorations */}
        <div className="flex justify-center items-center gap-1.5 text-[clamp(0.875rem,4vw,1.125rem)] mb-2 heart-pulse">
          <span>💜</span>
          <span>❤️</span>
          <span>💜</span>
          <span>❤️</span>
          <span>💜</span>
          <span>❤️</span>
          <span>💜</span>
        </div>

        {/* Main Pink Frame — fluid type, gap spacing, bottom padding reserves car overlap */}
        <div className="w-full max-w-[340px] border-4 border-[#f08080] bg-white rounded-lg px-3 pt-[clamp(1rem,4vw,1.5rem)] pb-[clamp(2.75rem,11vw,3.75rem)] flex flex-col items-center text-center gap-[clamp(2px,1vh,8px)] shadow-xl">
          <h2 className="text-[#1e3a8a] text-pixel-eyebrow tracking-widest uppercase">
            SAVE THE DATE
          </h2>

          <h1 className="text-[#1e3a8a] text-pixel-title">Aldi</h1>

          <span className="text-[#1e3a8a] text-pixel-small">and</span>

          <h1 className="text-[#1e3a8a] text-pixel-title">Qisty</h1>

          <p className="text-[#1e3a8a] text-pixel-small mt-1">
            Game to Forever
          </p>

          <p className="text-[#cc1f2a] text-pixel-small">#AlQiSAH</p>
        </div>

        {/* Car — percentage width, in-flow negative margin (always < frame bottom padding) */}
        <div className="-mt-[clamp(2rem,9vw,3rem)] w-[82%] max-w-[300px] z-10 pointer-events-none">
          <Image
            src="/wedding/sprite-car-transparent.png"
            alt="Aldi & Qisty Wedding Car"
            width={600}
            height={300}
            className="w-full h-auto object-contain pixelated drop-shadow-md"
            priority
          />
        </div>
      </div>

      {/* Bottom Action Buttons — 44px min height */}
      <div className="w-full px-6 pb-6 pb-safe flex flex-col items-center gap-2.5 shrink-0 z-20">
        <button
          onClick={handleOpenInvitation}
          className="w-full max-w-[320px] min-h-[44px] bg-[#1e3a8a] text-white py-3 px-4 tracking-wider uppercase pixel-btn flex items-center justify-center gap-2 cursor-pointer text-pixel-btn"
        >
          <span>❤️</span>
          <span>Buka Undangan</span>
        </button>

        <button
          onClick={handleOpenGame}
          className="w-full max-w-[320px] min-h-[44px] bg-[#cc1f2a] text-white py-3 px-4 tracking-wider uppercase pixel-btn-red flex items-center justify-center gap-2 cursor-pointer text-pixel-btn animate-pulse"
        >
          <span>🏎️</span>
          <span>Main Game F1</span>
        </button>
      </div>
    </div>
  );
}
