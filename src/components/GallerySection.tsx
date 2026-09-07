"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { audioManager } from "@/utils/audio";

const PHOTOS = [
  {
    id: 1,
    src: "/wedding/Gemini_Generated_Image_cde0a8cde0a8cde0.jpeg",
    title: "Pixel Journey",
    tag: "Cutscene #01",
    sub: "Pre-Wedding",
    color: "bg-[#ad2b58]",
    icon: "favorite",
  },
  {
    id: 2,
    src: "/wedding/Gemini_Generated_Image_u0r71bu0r71bu0r7.jpeg",
    title: "Road to Forever",
    tag: "Cutscene #02",
    sub: "Sunset Cruise",
    color: "bg-[#0051d5]",
    icon: "speed",
  },
  {
    id: 3,
    src: "/wedding/sprite-car-full.png",
    title: "Paddock of Love",
    tag: "Cutscene #03",
    sub: "Ceremonial Fit",
    color: "bg-[#674bb5]",
    icon: "workspace_premium",
  },
  {
    id: 4,
    src: "/wedding/bg-home.png",
    title: "Wedding Poster",
    tag: "Cutscene #04",
    sub: "Official Keyart",
    color: "bg-[#ff6b97]",
    icon: "stars",
  },
];

const CUTSCENE_DATA: Record<number, { tag: string; title: string; desc: string }> = {
  1: { tag: "CUTSCENE #01 // PRE-WED", title: "Pre-Wedding Pixel Journey", desc: "Titik tolak petualangan bersama. Dua gamer menemukan ritme co-op terbaik mereka di bawah langit pastel penuh sukacita." },
  2: { tag: "CUTSCENE #02 // CRUISE", title: "Road to Forever", desc: "Berkelana menyusuri rute masa depan berdua dengan mobil vintage merah klasik diiringi tembang 8-bit favorit." },
  3: { tag: "CUTSCENE #03 // PADDOCK", title: "Paddock of Love", desc: "Persiapan gaun pernikahan dan setelan jas putih terbaik menjelang putaran final akad suci." },
  4: { tag: "CUTSCENE #04 // KEY ART", title: "Official Wedding Poster", desc: "Poster resmi Save The Date Aldi & Qisty: Game to Forever #ALQISAH bersama si kucing oranye kesayangan." },
};

interface GalleryProps {
  onNext?: () => void;
}

export default function GallerySection({ onNext }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const currentPhoto = selectedIndex !== null ? PHOTOS[selectedIndex] : undefined;
  const cutscene = selectedIndex !== null ? CUTSCENE_DATA[PHOTOS[selectedIndex].id] : undefined;

  const goToPhoto = (dir: 1 | -1) => {
    audioManager.playClick();
    setSelectedIndex((prev) => (prev === null ? prev : (prev + dir + PHOTOS.length) % PHOTOS.length));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    setSelectedIndex((prev) => (prev === null ? prev : (prev + (dx < 0 ? 1 : -1) + PHOTOS.length) % PHOTOS.length));
  };

  return (
    <div className="w-full flex flex-col bg-[#fbf9f5] py-4 gap-4 select-none" style={{ padding: "0 20px", paddingTop: "16px", paddingBottom: "16px" }}>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-[0_4px_16px_rgba(173,43,88,0.08)] p-5 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#ffd9e0]/30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#e8ddff]/30 blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#ffd9e0] px-2.5 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[#3f0019] text-[14px]">memory</span>
              <span className="font-rubik text-[10px] font-bold text-[#3f0019] uppercase tracking-wider">REPLAY VAULT</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#e8ddff] px-2.5 py-0.5 rounded-full">
              <span className="font-rubik text-[10px] font-bold text-[#21005e]">STAGE MEMORIES</span>
              <span className="font-rubik text-[10px] font-bold text-[#ad2b58]">4/4 UNLOCKED</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1">
            <span className="material-symbols-outlined text-[#ff6b97] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="material-symbols-outlined text-[#674bb5] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="material-symbols-outlined text-[#ffb1c3] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="material-symbols-outlined text-[#a88cfb] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="material-symbols-outlined text-[#ff6b97] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div className="text-center">
            <h2 className="font-rubik text-[16px] font-bold text-[#1b1c1a]">Photo Finish: Cutscenes</h2>
            <p className="font-jakarta text-xs text-[#574145] mt-0.5">Koleksi kenangan lintasan Aldi &amp; Qisty menuju pelaminan</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#efeeea] rounded-xl p-3 shadow-sm">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-lg p-2 flex flex-col items-center text-center shadow-[0_2px_4px_rgba(0,0,0,0.03)]">
            <span className="font-rubik text-[9px] font-bold text-[#8a7175] uppercase tracking-wider">Love Index</span>
            <div className="flex items-center gap-0.5 my-0.5">
              <span className="material-symbols-outlined text-[#ff6b97] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <span className="material-symbols-outlined text-[#ff6b97] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <span className="material-symbols-outlined text-[#ff6b97] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <span className="font-rubik text-[11px] font-bold text-[#ad2b58]">100% MAX</span>
          </div>
          <div className="bg-white rounded-lg p-2 flex flex-col items-center text-center shadow-[0_2px_4px_rgba(0,0,0,0.03)]">
            <span className="font-rubik text-[9px] font-bold text-[#8a7175] uppercase tracking-wider">Co-Op Sync</span>
            <div className="flex items-center gap-0.5 my-0.5 text-[#0051d5]">
              <span className="material-symbols-outlined text-[14px]">sync</span>
              <span className="material-symbols-outlined text-[14px]">bolt</span>
            </div>
            <span className="font-rubik text-[11px] font-bold text-[#0051d5]">OVERDRIVE</span>
          </div>
          <div className="bg-white rounded-lg p-2 flex flex-col items-center text-center shadow-[0_2px_4px_rgba(0,0,0,0.03)]">
            <span className="font-rubik text-[9px] font-bold text-[#8a7175] uppercase tracking-wider">Captured</span>
            <div className="my-0.5 text-[#674bb5]">
              <span className="material-symbols-outlined text-[14px]">photo_library</span>
            </div>
            <span className="font-rubik text-[11px] font-bold text-[#674bb5]">4 / 4 CUTS</span>
          </div>
        </div>
      </div>

      <div className="bg-[#e8ddff]/40 rounded-lg px-3 py-2 flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[#21005e] text-[18px]">touch_app</span>
          <span className="font-jakarta text-xs text-[#21005e] truncate">Ketuk kartu untuk melihat tayangan layar penuh</span>
        </div>
        <span className="material-symbols-outlined text-[#ffb1c3] text-[16px]">arrow_back_ios_new</span>
      </div>

      {/* Grid — PRD: auto-fit minmax 150px gap 16 */}
      <div className="gallery-grid">
        {PHOTOS.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => { audioManager.playClick(); setSelectedIndex(idx); }}
            className="group bg-white rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(173,43,88,0.06)] flex flex-col cursor-pointer text-left active:scale-[0.98] transition-transform min-w-0"
            style={{ overflowWrap: "break-word" }}
          >
            <div className="relative h-44 w-full overflow-hidden bg-[#e4e2de]">
              <Image src={photo.src} alt={photo.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className={`absolute top-2 left-2 ${photo.color} px-2 py-0.5 rounded-full shadow-sm`}>
                <span className="font-rubik text-[10px] font-bold text-white">#{String(idx+1).padStart(2,"0")}</span>
              </div>
              <div className="absolute bottom-2 right-2 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#ad2b58] shadow-sm">
                <span className="material-symbols-outlined text-[16px]">{photo.icon === "favorite" ? "favorite" : photo.icon === "speed" ? "speed" : photo.icon === "workspace_premium" ? "workspace_premium" : "stars"}</span>
              </div>
            </div>
            <div className="p-2 flex flex-col flex-1 bg-white">
              <span className="font-rubik text-[9px] font-bold text-[#ad2b58] uppercase tracking-wider block">{photo.tag}</span>
              <h3 className="font-rubik text-[12px] font-bold text-[#1b1c1a] line-clamp-1">{photo.title}</h3>
              <div className="flex items-center justify-between pt-1 mt-1 text-[#574145]">
                <span className="font-jakarta text-[11px] text-[#8a7175]">{photo.sub}</span>
                <span className="material-symbols-outlined text-[#ad2b58] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Game Log */}
      <div className="bg-[#efeeea] rounded-xl p-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#ffd9e0] flex items-center justify-center text-[#ad2b58]">
            <span className="material-symbols-outlined text-[18px]">auto_stories</span>
          </div>
          <div className="flex flex-col">
            <span className="font-rubik text-[13px] font-bold text-[#1b1c1a]">Game Log: Chapter Finish</span>
            <span className="font-jakarta text-xs text-[#574145]">Pembalap telah melintasi 4 pos memori utama</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-1.5">
          <div className="flex items-center justify-between font-rubik text-[10px] font-bold">
            <span className="text-[#574145]">XP GAINED</span>
            <span className="text-[#ad2b58]">+99,999 AFFECTION</span>
          </div>
          <div className="w-full bg-[#e4e2de] h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#ad2b58] h-full rounded-full w-full" />
          </div>
          <div className="flex items-center justify-between font-jakarta text-[11px] text-[#8a7175] pt-0.5">
            <span>STATUS: READY FOR MARRIAGE</span>
            <span>SAVE POINT: AKTIF</span>
          </div>
        </div>
      </div>

      <button onClick={() => { audioManager.playClick(); onNext?.(); }} className="w-full h-12 bg-[#ad2b58] text-white rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(173,43,88,0.3)] active:scale-[0.98] transition-transform font-rubik text-[11px] font-bold uppercase tracking-wider">
        LANJUT KE RSVP RACE CONTROL <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>

      {/* Modal */}
      {selectedIndex !== null && currentPhoto && cutscene && (
        <div className="fixed inset-0 z-50 bg-[#30312e]/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedIndex(null)}>
          <div className="bg-white w-full max-w-sm rounded-xl overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="bg-[#ad2b58] px-4 py-2 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                <span className="font-rubik text-[10px] font-bold tracking-wider uppercase">{cutscene.tag}</span>
              </div>
              <button onClick={() => setSelectedIndex(null)} className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center active:scale-90">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="h-64 w-full rounded-lg overflow-hidden bg-[#e4e2de] relative shadow-inner">
                <Image src={currentPhoto.src} alt={currentPhoto.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <h4 className="font-rubik text-[16px] font-bold text-[#1b1c1a]">{cutscene.title}</h4>
                <p className="font-jakarta text-[13px] text-[#574145] mt-1 leading-relaxed">{cutscene.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-1 text-[#ad2b58] font-rubik text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span> PERFECT CLEAR
                </span>
                <button onClick={() => setSelectedIndex(null)} className="bg-[#e4e2de] text-[#1b1c1a] px-4 py-1.5 rounded-lg font-rubik text-xs font-bold active:scale-95">TUTUP</button>
              </div>
              <div className="flex justify-between pt-2">
                <button onClick={() => goToPhoto(-1)} className="w-10 h-10 rounded-lg bg-white border border-[#efeeea] flex items-center justify-center shadow-sm active:scale-95">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="font-rubik text-xs text-[#574145] self-center">{selectedIndex + 1} / {PHOTOS.length}</span>
                <button onClick={() => goToPhoto(1)} className="w-10 h-10 rounded-lg bg-white border border-[#efeeea] flex items-center justify-center shadow-sm active:scale-95">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
