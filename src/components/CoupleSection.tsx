"use client";

import Image from "next/image";
import { audioManager } from "@/utils/audio";

interface CoupleSectionProps {
  onOpenGame?: () => void;
}

export default function CoupleSection({ onOpenGame }: CoupleSectionProps) {
  return (
    <div className="w-full min-h-full flex flex-col items-center px-4 py-6 bg-[#ffb6c1] overflow-y-auto select-none">
      {/* Header */}
      <div className="flex flex-col items-center mb-5 text-center">
        <div className="flex gap-1.5 text-base mb-2 heart-pulse">
          <span>💜</span>
          <span>❤️</span>
          <span>💜</span>
          <span>❤️</span>
          <span>💜</span>
        </div>
        <h1
          className="text-[#1e3a8a] text-base sm:text-lg mb-1 font-pixel tracking-wide"
        >
          The Happy Couple
        </h1>
        <p
          className="text-[#cc1f2a] text-[10px] font-pixel"
        >
          #AlQiSAH • P1 In Love
        </p>
      </div>

      {/* Quote Card */}
      <div className="w-full max-w-sm bg-white pixel-box-pink p-4 mb-5 text-center shadow-md">
        <p
          className="text-[#1e3a8a] text-[10px] leading-relaxed font-sans font-medium italic"
        >
          &quot;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
          pasangan hidup dari jenismu sendiri agar kamu merasa tenteram
          kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&quot;
        </p>
        <p
          className="text-[#cc1f2a] text-[9px] mt-2 font-pixel"
        >
          — QS. Ar-Rum: 21 —
        </p>
      </div>

      {/* Bride Card (Qisty) */}
      <div className="w-full max-w-sm bg-white pixel-box p-4 mb-3 text-center relative shadow-md">
        <div
          className="absolute top-2 right-2 px-2 py-0.5 bg-[#ffb6c1] border border-[#f08080] text-[#cc1f2a] text-[8px] font-pixel"
        >
          PLAYER 2 • THE BRIDE
        </div>

        <div className="w-20 h-20 mx-auto mb-3 border-3 border-[#f08080] overflow-hidden bg-[#ffe4e1] flex items-center justify-center">
          <Image
            src="/wedding/sprite-bride-transparent.png"
            alt="Qisty Aulia"
            width={80}
            height={80}
            className="object-contain pixelated w-full h-full"
            priority
          />
        </div>

        <h2
          className="text-[#1e3a8a] text-sm mb-1 font-pixel font-bold"
        >
          Qisty Aulia, S.T.
        </h2>
        <p
          className="text-[#cc1f2a] text-[9px] mb-2 font-pixel"
        >
          Mempelai Wanita
        </p>
        <p className="text-slate-600 text-[10px] leading-relaxed">
          Putri tercinta dari:
          <br />
          <strong className="text-slate-900">Bapak H. Ayah Qisty</strong>
          <br />
          &amp; <strong className="text-slate-900">Ibu Hj. Ibu Qisty</strong>
        </p>
      </div>

      {/* Ampersand Divider */}
      <div className="flex items-center justify-center gap-3 my-2">
        <div className="w-12 h-[3px] bg-[#1e3a8a]" />
        <div className="w-8 h-8 bg-[#ffd93d] pixel-box flex items-center justify-center">
          <span
            className="text-[#1e3a8a] text-sm font-bold font-pixel"
          >
            &amp;
          </span>
        </div>
        <div className="w-12 h-[3px] bg-[#1e3a8a]" />
      </div>

      {/* Groom Card (Aldi) */}
      <div className="w-full max-w-sm bg-white pixel-box p-4 mb-5 text-center relative shadow-md">
        <div
          className="absolute top-2 right-2 px-2 py-0.5 bg-[#87ceeb] border border-[#1e3a8a] text-[#1e3a8a] text-[8px] font-pixel"
        >
          PLAYER 1 • THE GROOM
        </div>

        <div className="w-20 h-20 mx-auto mb-3 border-3 border-[#1e3a8a] overflow-hidden bg-[#e0f0ff] flex items-center justify-center">
          <Image
            src="/wedding/sprite-groom-transparent.png"
            alt="Aldiansyah"
            width={80}
            height={80}
            className="object-contain pixelated w-full h-full"
            priority
          />
        </div>

        <h2
          className="text-[#1e3a8a] text-sm mb-1 font-pixel font-bold"
        >
          Aldiansyah, S.Kom.
        </h2>
        <p
          className="text-[#1e3a8a] text-[9px] mb-2 font-pixel"
        >
          Mempelai Pria
        </p>
        <p className="text-slate-600 text-[10px] leading-relaxed">
          Putra tercinta dari:
          <br />
          <strong className="text-slate-900">Bapak H. Ayah Aldi</strong>
          <br />
          &amp; <strong className="text-slate-900">Ibu Hj. Ibu Aldi</strong>
        </p>
      </div>

      {/* Play Game Button */}
      {onOpenGame && (
        <div className="w-full max-w-sm mb-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onOpenGame();
            }}
            className="w-full bg-[#cc1f2a] text-white py-3 px-4 text-[9px] sm:text-[10px] uppercase pixel-btn-red flex items-center justify-center gap-2 cursor-pointer font-pixel"
          >
            <span>🏎️</span>
            <span>Mainkan Balapan F1 Pengantin</span>
          </button>
        </div>
      )}
    </div>
  );
}
