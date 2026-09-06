"use client";

import Image from "next/image";
import { audioManager } from "@/utils/audio";

interface CoupleSectionProps {
  onNext?: () => void;
  onRsvp?: () => void;
  onOpenGame?: () => void;
}

export default function CoupleSection({ onNext, onRsvp }: CoupleSectionProps) {
  return (
    <div className="w-full min-h-full flex flex-col bg-[#fbf9f5] px-4 pt-4 pb-6 gap-4 select-none">
      {/* Top badge */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dbe1ff] text-[#00174b] rounded-lg shadow-[2px_2px_0px_#0051d5]">
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>videogame_asset</span>
          <span className="font-rubik text-[10px] font-bold tracking-widest uppercase">{'STAGE 01 // ROSTER UNLOCKED'}</span>
        </div>
      </div>

      {/* Title Bar */}
      <div className="bg-white rounded-xl p-4 shadow-[0_8px_20px_rgba(173,43,88,0.08)] flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-1 opacity-90">
          <span className="material-symbols-outlined text-[#ff6b97] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <span className="material-symbols-outlined text-[#674bb5] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <span className="material-symbols-outlined text-[#ffb1c3] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <span className="material-symbols-outlined text-[#a88cfb] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <span className="material-symbols-outlined text-[#ff6b97] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </div>
        <h1 className="font-rubik text-[22px] font-extrabold uppercase tracking-wider text-[#0051d5]">PLAYER SELECT</h1>
        <p className="font-rubik text-[10px] font-bold text-[#ad2b58] tracking-widest">{'// 2P CO-OP FOREVER MODE //'}</p>
        <div className="w-full mt-3 py-1.5 px-3 bg-[#f5f3ef] rounded-lg flex items-center justify-center gap-2 text-[#574145]">
          <span className="w-2 h-2 rounded-full bg-[#0051d5] animate-pulse" />
          <span className="font-rubik text-[10px] font-bold uppercase tracking-wide">Ready? Press Start to Join Quest</span>
        </div>
      </div>

      {/* PLAYER 1 — GROOM */}
      <div className="bg-white rounded-xl p-4 shadow-[0_6px_16px_rgba(0,81,213,0.08)]">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#316bf3] text-white rounded-lg shadow-[2px_2px_0px_#003ea8]">
            <span className="font-rubik text-[10px] font-bold tracking-wider uppercase">1P • THE GROOM</span>
            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <span className="font-rubik text-[10px] font-bold text-[#0051d5] tracking-widest uppercase">LVL. 99 PILOT</span>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <div className="relative shrink-0 w-24 h-24 rounded-xl bg-[#dbe1ff] flex items-center justify-center overflow-hidden shadow-[3px_3px_0px_#316bf3]">
            <Image src="/wedding/sprite-groom-transparent.png" alt="Aldi Santoso" width={96} height={96} className="object-cover w-full h-full pixelated" />
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-[#0051d5] text-white rounded text-[9px] font-rubik font-bold">P1</div>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-rubik text-[10px] font-bold text-[#0051d5] uppercase tracking-wide">Racer Name</span>
            <h2 className="font-rubik text-[15px] font-bold text-[#1b1c1a] leading-tight break-words">Aldi Santoso, S.T.</h2>
            <p className="font-jakarta text-[11px] text-[#574145] font-medium leading-tight">Muhammad Alhadiansyah Santoso</p>
            <div className="mt-1 flex items-center gap-1 text-[#ad2b58]">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
              <span className="font-rubik text-[10px] font-bold">Red Roadster Captain</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f3ef] rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1 text-[#574145] mb-1">
            <span className="material-symbols-outlined text-[14px]">family_restroom</span>
            <span className="font-rubik text-[10px] font-bold uppercase tracking-wider">Family Lineage</span>
          </div>
          <p className="font-jakarta text-xs text-[#1b1c1a] leading-relaxed break-words" style={{ overflowWrap: "break-word", wordWrap: "break-word" }}>
            Putra tercinta dari <span className="font-bold text-[#0051d5] break-words">Bapak Indra Santoso</span> &amp; <span className="font-bold text-[#0051d5] break-words">Ibu Enah Sukaenah</span>
          </p>
        </div>

        <div className="space-y-2 bg-[#efeeea] rounded-lg p-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-rubik text-[10px] font-bold text-[#574145] flex items-center gap-1">
                <span className="material-symbols-outlined text-[#ff6b97] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span> Love Capacity
              </span>
              <span className="font-rubik text-[10px] font-bold text-[#ad2b58]">999 / 999 MAX</span>
            </div>
            <div className="w-full h-3 bg-[#e4e2de] rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-[#ff6b97] rounded-full w-full shadow-[0_0_8px_rgba(255,107,151,0.5)]" />
            </div>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="font-rubik text-[10px] font-bold text-[#574145] flex items-center gap-1">
              <span className="material-symbols-outlined text-[#674bb5] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span> Charm &amp; Loyalty
            </span>
            <span className="flex gap-0.5 text-[#674bb5]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-rubik text-[10px] font-bold text-[#574145] flex items-center gap-1">
              <span className="material-symbols-outlined text-[#0051d5] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span> Sprint to Future
            </span>
            <span className="flex gap-0.5 text-[#0051d5]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* PLAYER 2 — BRIDE */}
      <div className="bg-white rounded-xl p-4 shadow-[0_6px_16px_rgba(173,43,88,0.08)]">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ad2b58] text-white rounded-lg shadow-[2px_2px_0px_#6e0030]">
            <span className="font-rubik text-[10px] font-bold tracking-wider uppercase">2P • THE BRIDE</span>
            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <span className="font-rubik text-[10px] font-bold text-[#ad2b58] tracking-widest uppercase">LVL. 99 NAVIGATOR</span>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <div className="relative shrink-0 w-24 h-24 rounded-xl bg-[#ffd9e0] flex items-center justify-center overflow-hidden shadow-[3px_3px_0px_#ff6b97]">
            <Image src="/wedding/sprite-bride-transparent.png" alt="Qisti Fadilah" width={96} height={96} className="object-cover w-full h-full pixelated" />
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-[#ad2b58] text-white rounded text-[9px] font-rubik font-bold">P2</div>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-rubik text-[10px] font-bold text-[#ad2b58] uppercase tracking-wide">Racer Name</span>
            <h2 className="font-rubik text-[15px] font-bold text-[#1b1c1a] leading-tight break-words">Qisti Fadilah, S.Par.</h2>
            <p className="font-jakarta text-[11px] text-[#574145] font-medium leading-tight">The Graceful Co-Driver</p>
            <div className="mt-1 flex items-center gap-1 text-[#674bb5]">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
              <span className="font-rubik text-[10px] font-bold">Cat Protector &amp; Smile Booster</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f3ef] rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1 text-[#574145] mb-1">
            <span className="material-symbols-outlined text-[14px]">family_restroom</span>
            <span className="font-rubik text-[10px] font-bold uppercase tracking-wider">Family Lineage</span>
          </div>
          <p className="font-jakarta text-xs text-[#1b1c1a] leading-relaxed break-words" style={{ overflowWrap: "break-word", wordWrap: "break-word" }}>
            Putri tercinta dari <span className="font-bold text-[#ad2b58] break-words">Bapak (Alm) Sukiswo</span> &amp; <span className="font-bold text-[#ad2b58] break-words">Ibu Eneng Sumarlina</span>
          </p>
        </div>

        <div className="space-y-2 bg-[#efeeea] rounded-lg p-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-rubik text-[10px] font-bold text-[#574145] flex items-center gap-1">
                <span className="material-symbols-outlined text-[#ff6b97] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span> Love Capacity
              </span>
              <span className="font-rubik text-[10px] font-bold text-[#ad2b58]">999 / 999 MAX</span>
            </div>
            <div className="w-full h-3 bg-[#e4e2de] rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-[#ff6b97] rounded-full w-full" />
            </div>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="font-rubik text-[10px] font-bold text-[#574145] flex items-center gap-1">
              <span className="material-symbols-outlined text-[#674bb5] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span> Grace &amp; Serenity
            </span>
            <span className="flex gap-0.5 text-[#674bb5]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-rubik text-[10px] font-bold text-[#574145] flex items-center gap-1">
              <span className="material-symbols-outlined text-[#ffb1c3] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span> Sweetness Meter
            </span>
            <span className="flex gap-0.5 text-[#ffb1c3]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Co-op Synergy */}
      <div className="bg-[#f5f3ef] rounded-xl p-3 shadow-[0_4px_12px_rgba(103,75,181,0.08)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#e8ddff] text-[#21005e] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">handshake</span>
          </div>
          <div className="flex flex-col">
            <span className="font-rubik text-[13px] font-bold text-[#1b1c1a]">Co-op Synergy: 100%</span>
            <span className="font-jakarta text-xs text-[#574145]">Special skill: &quot;Till Jannah Boost&quot;</span>
          </div>
        </div>
        <div className="px-2 py-1 bg-[#a88cfb] text-white rounded text-center shrink-0">
          <span className="font-rubik text-[9px] font-bold tracking-wider uppercase">PERFECT MATCH</span>
        </div>
      </div>

      {/* Holy Verse */}
      <div className="bg-white rounded-xl p-4 shadow-[0_8px_20px_rgba(173,43,88,0.06)]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#efeeea]">
          <div className="flex items-center gap-1.5 text-[#ad2b58]">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span className="font-rubik text-[11px] font-bold uppercase tracking-wider">{'QUEST COVENANT // AR-RUM: 21'}</span>
          </div>
          <span className="font-rubik text-[9px] font-bold text-[#674bb5] px-2 py-0.5 bg-[#e8ddff] rounded">HOLY VERSE</span>
        </div>
        <div className="bg-[#f5f3ef] p-3 rounded-lg mb-2">
          <p className="font-jakarta text-[13px] text-[#1b1c1a] text-center italic leading-relaxed">
            “Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”
          </p>
        </div>
        <div className="flex items-center justify-between text-[#574145]">
          <span className="font-rubik text-[9px] font-bold uppercase tracking-wide">MISSION: SAKINAH MAWADDAH WARAHMAH</span>
          <span className="font-rubik text-[9px] font-bold text-[#ad2b58] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ad2b58] animate-pulse" /> SACRED BOND
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            audioManager.playClick();
            onNext?.();
          }}
          className="w-full py-3 px-4 bg-[#ad2b58] text-white rounded-xl font-rubik text-[11px] font-bold uppercase tracking-wider shadow-[3px_3px_0px_#6e0030] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#6e0030] transition-all flex items-center justify-center gap-2"
        >
          LIHAT JADWAL PIT STOP <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
        <button
          onClick={() => {
            audioManager.playClick();
            onRsvp?.();
          }}
          className="w-full py-3 px-4 bg-[#674bb5] text-white rounded-xl font-rubik text-[11px] font-bold uppercase tracking-wider shadow-[3px_3px_0px_#3d1b89] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#3d1b89] transition-all flex items-center justify-center gap-2"
        >
          KIRIM PESAN RESTU <span className="material-symbols-outlined text-[18px]">mark_email_unread</span>
        </button>
      </div>

      <div className="text-center pt-1 text-[#574145]">
        <span className="font-rubik text-[10px] font-bold tracking-[0.14em] uppercase">INSERT LOVE COIN TO CONTINUE • #ALQISAH 2026</span>
      </div>
    </div>
  );
}
