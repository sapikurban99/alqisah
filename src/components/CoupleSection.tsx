"use client";

import Image from "next/image";
import { audioManager } from "@/utils/audio";

interface CoupleSectionProps {
  onOpenGame?: () => void;
}

function RacerCard({
  tag,
  tagClass,
  photo,
  alt,
  name,
  role,
  relation,
  parent1,
  parent2,
}: {
  tag: string;
  tagClass: string;
  photo: string;
  alt: string;
  name: string;
  role: string;
  relation: string;
  parent1: string;
  parent2: string;
}) {
  return (
    <div className="brut-card w-full p-0 overflow-hidden">
      {/* Paddock pass header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b-[3px] border-black ${tagClass}`}>
        <span className="font-display text-[11px] tracking-widest text-white">
          {tag}
        </span>
        <span className="font-display text-[11px] text-white">★</span>
      </div>

      <div className="p-4 flex gap-4 items-start">
        <div className="w-24 h-28 shrink-0 border-[3px] border-black bg-[#FFF8EC] overflow-hidden">
          <Image
            src={photo}
            alt={alt}
            width={96}
            height={112}
            className="object-cover pixelated w-full h-full"
          />
        </div>
        <div className="min-w-0 text-left">
          <p className="font-display text-[10px] text-[#E10600] tracking-widest">
            {role}
          </p>
          <h2 className="font-display text-card-name mt-1">{name}</h2>
        </div>
      </div>

      <div className="px-4 pb-4">
        <p className="text-sm text-[#555]">{relation} dari pasangan:</p>
        <p className="text-base font-bold leading-snug mt-0.5">{parent1}</p>
        <p className="text-base font-bold leading-snug">& {parent2}</p>
      </div>
    </div>
  );
}

export default function CoupleSection({ onOpenGame }: CoupleSectionProps) {
  return (
    <div className="w-full min-h-full flex flex-col px-4 py-6 bg-[#FFF8EC] overflow-y-auto select-none">
      <div className="brut-card-black inline-flex self-start px-3 py-1.5 mb-3">
        <span className="font-display text-[11px] tracking-widest">
          THE RACERS
        </span>
      </div>
      <h1 className="font-display text-section-title mb-1">MEMPELAI</h1>
      <p className="text-base font-bold mb-5">
        Dua pembalap, satu garis finish. #AlQiSAH
      </p>

      <div className="w-full max-w-sm mx-auto flex flex-col gap-5">
        <RacerCard
          tag="DRIVER 02 — BRIDE"
          tagClass="bg-[#E10600]"
          photo="/wedding/sprite-bride-transparent.png"
          alt="Qisti Fadilah"
          name="QISTI FADILAH, S.PAR"
          role="MEMPELAI WANITA"
          relation="Putri"
          parent1="Bapak (Alm) Sukiswo"
          parent2="Ibu Eneng Sumarlina"
        />

        <div className="checker-sm w-full h-4 border-[3px] border-black" />

        <RacerCard
          tag="DRIVER 01 — GROOM"
          tagClass="bg-[#2B4EFF]"
          photo="/wedding/sprite-groom-transparent.png"
          alt="Muhammad Alhadiansyah Santoso"
          name="M. ALHADIANSYAH SANTOSO, ST"
          role="MEMPELAI PRIA"
          relation="Putra"
          parent1="Bapak Indra Santoso"
          parent2="Ibu Enah Sukaenah"
        />

        <div className="brut-card-yellow p-4">
          <p className="text-[15px] font-bold leading-snug">
            “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            pasangan hidup dari jenismu sendiri agar kamu merasa tenteram
            kepadanya.”
          </p>
          <p className="font-display text-[10px] mt-2">— QS. AR-RUM: 21 —</p>
        </div>

        {onOpenGame && (
          <button
            onClick={() => {
              audioManager.playClick();
              onOpenGame();
            }}
            className="brut-btn-red w-full min-h-[52px] py-3.5 px-4 text-base cursor-pointer font-display"
          >
            🏁 MAIN GAME F1
          </button>
        )}
      </div>
    </div>
  );
}
