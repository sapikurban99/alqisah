"use client";

import Image from "next/image";
import { useState } from "react";
import { audioManager } from "@/utils/audio";

const PHOTOS = [
  {
    id: 1,
    src: "/wedding/f1-monte-carlo-bg.png",
    title: "Monte Carlo Circuit",
    tag: "F1 Track",
  },
  {
    id: 2,
    src: "/wedding/sprite-car-full.png",
    title: "The Wedding Ride",
    tag: "Aldi & Qisty",
  },
  {
    id: 3,
    src: "/wedding/f1-finish-podium-full.png",
    title: "Victory Celebration",
    tag: "P1 Podium",
  },
  {
    id: 4,
    src: "/wedding/bg-home.png",
    title: "Save The Date Poster",
    tag: "Retro Arcade",
  },
  {
    id: 5,
    src: "/wedding/f1-finish-line.png",
    title: "Grand Prix Finish Line",
    tag: "Checkered Arch",
  },
  {
    id: 6,
    src: "/wedding/f1-obstacles-sheet.png",
    title: "Pit Lane Ornaments",
    tag: "16-Bit Sprites",
  },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const currentPhoto = PHOTOS.find((p) => p.id === selectedPhoto);

  const handleSelectPhoto = (id: number) => {
    audioManager.playClick();
    setSelectedPhoto(id);
  };

  return (
    <div className="w-full min-h-full flex flex-col items-center px-4 py-6 bg-[#ffe4e1] overflow-y-auto select-none">
      {/* Header */}
      <div className="flex flex-col items-center mb-5 text-center">
        <div className="flex gap-1.5 text-base mb-2">
          <span>💜</span>
          <span>📸</span>
          <span>💜</span>
          <span>📸</span>
          <span>💜</span>
        </div>
        <h1
          className="text-[#1e3a8a] text-base sm:text-lg mb-1 font-pixel tracking-wide"
        >
          Galeri Kenangan
        </h1>
        <p
          className="text-[#cc1f2a] text-[10px] font-pixel"
        >
          Momen Indah Menuju Pelaminan
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-4">
        {PHOTOS.map((photo) => (
          <button
            key={photo.id}
            onClick={() => handleSelectPhoto(photo.id)}
            className="group relative aspect-square overflow-hidden bg-white pixel-box-pink cursor-pointer active:scale-95 transition-transform"
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover pixelated group-hover:scale-105 transition-transform"
            />
            {/* Tag Badge */}
            <div className="absolute bottom-0 inset-x-0 bg-[#1e3a8a]/90 px-2 py-1.5 border-t-2 border-[#f08080]">
              <span
                className="text-[7px] text-[#ffd93d] block font-pixel uppercase"
              >
                {photo.tag}
              </span>
              <span
                className="text-[8px] text-white font-bold block font-pixel truncate"
              >
                {photo.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      <p
        className="text-[9px] text-[#666] text-center font-pixel mb-4"
      >
        📸 Ketuk foto untuk memperbesar
      </p>

      {/* Lightbox Modal */}
      {selectedPhoto && currentPhoto && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => {
            audioManager.playClick();
            setSelectedPhoto(null);
          }}
        >
          <div
            className="relative w-full max-w-sm bg-white pixel-box p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                audioManager.playClick();
                setSelectedPhoto(null);
              }}
              className="absolute -top-3 -right-3 w-8 h-8 rounded bg-[#cc1f2a] text-white flex items-center justify-center text-xs font-bold pixel-btn-red cursor-pointer z-10 font-pixel"
            >
              ✕
            </button>

            {/* Photo Container */}
            <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden border-2 border-[#1e3a8a] mb-3">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.title}
                fill
                className="object-contain pixelated"
              />
            </div>

            {/* Caption */}
            <div className="text-center">
              <span className="text-[8px] text-[#cc1f2a] font-pixel block mb-0.5 uppercase">
                {currentPhoto.tag}
              </span>
              <h3 className="text-xs font-bold text-[#1e3a8a] font-pixel">
                {currentPhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
