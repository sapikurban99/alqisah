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

  return (
    <div className="relative w-full min-h-full flex flex-col overflow-x-clip bg-[#FFF8EC] select-none">
      {/* Checkerboard top strip */}
      <div className="checker-sm w-full h-4 shrink-0 border-b-[3px] border-black" />

      {/* Top utility bar */}
      <div className="w-full px-4 py-2 flex justify-between items-center border-b-[3px] border-black bg-white shrink-0">
        <span className="font-display text-[11px] tracking-wide">
          #ALQISAH
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMusic}
            className={`w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer text-base ${
              isPlayingMusic ? "brut-btn-yellow" : "brut-btn bg-white"
            }`}
            title={isPlayingMusic ? "Matikan Musik" : "Putar Musik"}
          >
            {isPlayingMusic ? "🎶" : "🎵"}
          </button>
          <button
            onClick={() => {
              audioManager.playClick();
              alert(
                "Undangan Pernikahan Aldi & Qisti (#AlQiSAH)\nMinggu, 8 November 2026\nHotel Indies Style Bandung"
              );
            }}
            className="brut-btn bg-white w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer text-base"
            title="Info"
          >
            ℹ️
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 w-full px-4 py-5 flex flex-col justify-center min-h-0">
        <div className="brut-card-red inline-flex self-start px-3 py-1 mb-3">
          <span className="font-display text-[11px] tracking-widest">
            ★ SAVE THE DATE ★
          </span>
        </div>

        <h1 className="font-display text-hero text-[#111]">
          ALDI
          <br />
          <span className="text-[#E10600]">&</span> QISTI
        </h1>

        <p className="mt-3 text-base font-bold">
          Game to Forever — Grand Prix of Love
        </p>

        {/* Info cards */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="brut-card-yellow px-3 py-2.5">
            <p className="font-display text-[10px]">TANGGAL</p>
            <p className="text-sm font-bold leading-tight">
              Minggu,
              <br />
              8 Nov 2026
            </p>
          </div>
          <div className="brut-card px-3 py-2.5">
            <p className="font-display text-[10px]">LOKASI</p>
            <p className="text-sm font-bold leading-tight">
              Hotel Indies
              <br />
              Style Bandung
            </p>
          </div>
        </div>

        {/* Car cut-out */}
        <div className="mt-2 w-[86%] max-w-[320px] self-center">
          <Image
            src="/wedding/sprite-car-transparent.png"
            alt="Mobil pengantin Aldi & Qisti"
            width={600}
            height={300}
            className="w-full h-auto object-contain pixelated"
            priority
          />
        </div>
      </div>

      {/* CTAs */}
      <div className="w-full px-4 pb-6 pb-safe flex flex-col gap-3 shrink-0">
        <button
          onClick={() => {
            audioManager.playClick();
            onSelectInvitation();
          }}
          className="brut-btn-red w-full min-h-[52px] py-3.5 px-4 text-base tracking-wide cursor-pointer font-display"
        >
          BUKA UNDANGAN →
        </button>
        <button
          onClick={() => {
            audioManager.playClick();
            onSelectGame();
          }}
          className="brut-btn-yellow w-full min-h-[52px] py-3.5 px-4 text-base tracking-wide cursor-pointer font-display"
        >
          🏁 MAIN GAME F1
        </button>
      </div>

      {/* Checkerboard bottom strip */}
      <div className="checker-sm w-full h-4 shrink-0 border-t-[3px] border-black" />
    </div>
  );
}
