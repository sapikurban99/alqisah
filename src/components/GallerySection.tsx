"use client";

import Image from "next/image";
import { useState } from "react";
import { audioManager } from "@/utils/audio";

const PHOTOS = [
  {
    id: 1,
    src: "/wedding/Gemini_Generated_Image_cde0a8cde0a8cde0.jpeg",
    title: "Pre-Wedding",
    tag: "Aldi & Qisti",
  },
  {
    id: 2,
    src: "/wedding/Gemini_Generated_Image_u0r71bu0r71bu0r7.jpeg",
    title: "Forever Love",
    tag: "Memories",
  },
  {
    id: 3,
    src: "/wedding/sprite-car-full.png",
    title: "Wedding Race Car",
    tag: "Garage",
  },
  {
    id: 4,
    src: "/wedding/bg-home.png",
    title: "Race Poster",
    tag: "Official",
  },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const currentPhoto = PHOTOS.find((p) => p.id === selectedPhoto);

  return (
    <div className="w-full min-h-full flex flex-col px-4 py-6 bg-[#FFF8EC] overflow-y-auto select-none">
      <div className="brut-card-black inline-flex self-start px-3 py-1.5 mb-3">
        <span className="font-display text-[11px] tracking-widest">
          PHOTO FINISH
        </span>
      </div>
      <h1 className="font-display text-section-title mb-1">GALERI</h1>
      <p className="text-base font-bold mb-5">Momen menuju garis start.</p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto mb-5">
        {PHOTOS.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => {
              audioManager.playClick();
              setSelectedPhoto(photo.id);
            }}
            className={`brut-card relative aspect-square overflow-hidden cursor-pointer text-left p-0 ${
              idx % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black px-2 py-1.5 border-t-[3px] border-black">
              <p className="font-display text-[9px] text-[#FFD500]">
                {photo.tag.toUpperCase()}
              </p>
              <p className="text-xs font-bold text-white">{photo.title}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-sm font-bold text-center">
        Ketuk foto untuk memperbesar ⤢
      </p>

      {selectedPhoto && currentPhoto && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="brut-card relative w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[4/3] bg-white">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.title}
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="brut-btn-red absolute top-2 right-2 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer font-display text-base"
            >
              ✕
            </button>
            <div className="bg-black px-4 py-2.5 text-center border-t-[3px] border-black">
              <p className="font-display text-xs text-[#FFD500]">
                {currentPhoto.title.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
