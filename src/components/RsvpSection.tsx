"use client";

import { useState } from "react";
import Image from "next/image";
import { audioManager } from "@/utils/audio";

interface Wish {
  name: string;
  attendance: "hadir" | "tidak";
  message: string;
  time: string;
  guestCount?: string;
  avatar?: "pink" | "blue" | "purple";
}

const INITIAL_WISHES: Wish[] = [
  {
    name: "Rian & Sarah",
    attendance: "hadir",
    message: "Selamat balapan mengarungi bahtera rumah tangga, Captain Aldi & Ibu Navigator Qisty! Semoga langgeng dan selalu penuh kebahagiaan seumur hidup! 🚗💨🎉",
    time: "10 MENIT LALU",
    guestCount: "2",
    avatar: "pink",
  },
  {
    name: "Dimas Pratama",
    attendance: "hadir",
    message: "Game to Forever unlocked! Gaspol terus sampai finish line sakinah mawaddah warahmah bosku. Ready meluncur ke arena! 🏁🕹️",
    time: "35 MENIT LALU",
    guestCount: "1",
    avatar: "blue",
  },
  {
    name: "Clara Anindya",
    attendance: "tidak",
    message: "Qisty sayang selamat menempuh hidup baru! Maaf bertepatan ada dinas keluar kota, tapi doaku selalu menyertai kalian berdua. Happy wedding! 🌸✨",
    time: "1 JAM LALU",
    avatar: "purple",
  },
];

export default function RsvpSection() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak">("hadir");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    audioManager.playClick();
    const newWish: Wish = {
      name: name.trim(),
      attendance,
      message: message.trim(),
      time: "BARU SAJA",
      guestCount: attendance === "hadir" ? String(guestCount) : undefined,
      avatar: "pink",
    };
    setWishes([newWish, ...wishes]);
    setShowSuccess(true);
    setName("");
    setMessage("");
    setTimeout(() => setShowSuccess(false), 3500);
  };

  return (
    <div className="w-full min-h-full flex flex-col bg-[#fbf9f5] px-4 py-4 gap-4 select-none">
      {/* Heart Garland */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#f5f3ef] rounded-xl shadow-sm">
        <span className="material-symbols-outlined text-[#ff6b97] text-[18px]">favorite</span>
        <span className="material-symbols-outlined text-[#674bb5] text-[18px]">favorite</span>
        <span className="material-symbols-outlined text-[#ffb1c3] text-[18px]">favorite</span>
        <span className="material-symbols-outlined text-[#a88cfb] text-[18px]">favorite</span>
        <span className="material-symbols-outlined text-[#ff6b97] text-[18px]">favorite</span>
        <span className="material-symbols-outlined text-[#674bb5] text-[18px]">favorite</span>
        <span className="material-symbols-outlined text-[#ffb1c3] text-[18px]">favorite</span>
      </div>

      {/* Main Terminal Window */}
      <div className="relative bg-white rounded-xl p-4 shadow-[0_6px_0_0_#ad2b58,0_10px_20px_rgba(173,43,88,0.12)]">
        {/* Console Window Title Bar */}
        <div className="bg-[#ff6b97]/25 rounded-lg p-3 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#ad2b58] text-[22px] shrink-0">mark_email_unread</span>
            <div className="flex flex-col min-w-0">
              <span className="font-rubik text-[10px] font-bold text-[#ad2b58] uppercase tracking-widest">MISSION LOG #07</span>
              <span className="font-rubik text-[12px] font-bold text-[#1b1c1a] truncate">{'CONFIRM ATTENDANCE // RSVP QUEST'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff6b97]" />
            <span className="w-3 h-3 rounded-full bg-[#a88cfb]" />
            <span className="w-3 h-3 rounded-full bg-[#316bf3]" />
          </div>
        </div>

        {/* Chief Marshal Dialogue */}
        <div className="relative bg-[#f5f3ef] rounded-lg p-3 mb-4 flex gap-3 items-start">
          <div className="w-12 h-12 rounded-lg bg-[#a88cfb]/30 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#674bb5] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-rubik text-[11px] font-bold text-[#674bb5] uppercase tracking-wider">CHIEF PADDOCK MARSHAL</span>
              <span className="font-rubik text-[9px] font-bold bg-[#e8ddff] text-[#21005e] px-1.5 py-0.5 rounded">RADIO LV.99</span>
            </div>
            <p className="font-jakarta text-xs text-[#574145] leading-relaxed">
              “Selamat datang di Paddock Pernikahan Aldi &amp; Qisty! Konfirmasi slot kehadiranmu sebelum bendera start dikibarkan.”
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="guest-name" className="font-rubik text-[11px] font-bold text-[#1b1c1a] flex items-center gap-1">
                <span className="material-symbols-outlined text-[#ad2b58] text-[16px]">badge</span> NAMA LENGKAP / CALLSIGN
              </label>
              <span className="font-rubik text-[10px] font-bold text-[#8a7175]">*WAJIB</span>
            </div>
            <div className="relative flex items-center">
              <input
                id="guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Sarah Jenkins / Dimas"
                className="w-full bg-white text-[#1b1c1a] font-jakarta text-[14px] rounded-lg px-4 py-3 pr-10 border border-[#efeeea] focus:outline-none focus:border-[#6e0030] focus:ring-2 focus:ring-[#ffb1c3] shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] placeholder:text-[#8a7175]"
              />
              <span className="absolute right-3 font-rubik text-[14px] text-[#ad2b58] animate-pulse">_</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-rubik text-[11px] font-bold text-[#1b1c1a] flex items-center gap-1">
              <span className="material-symbols-outlined text-[#ad2b58] text-[16px]">flag</span> STATUS KEHADIRAN (CHECKPOINT)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { audioManager.playClick(); setAttendance("hadir"); }}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-lg font-rubik text-[11px] font-bold shadow-[0_4px_0_0_#6e0030] active:translate-y-1 active:shadow-none transition-all ${attendance === "hadir" ? "bg-[#ad2b58] text-white" : "bg-[#efeeea] text-[#574145] shadow-[0_4px_0_0_#dbdad6]"}`}
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span> [ ✔ HADIR ]
              </button>
              <button
                type="button"
                onClick={() => { audioManager.playClick(); setAttendance("tidak"); }}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-lg font-rubik text-[11px] font-bold shadow-[0_4px_0_0_#6e0030] active:translate-y-1 active:shadow-none transition-all ${attendance === "tidak" ? "bg-[#ad2b58] text-white" : "bg-[#efeeea] text-[#574145] shadow-[0_4px_0_0_#dbdad6]"}`}
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span> [ ✖ ABSEN ]
              </button>
            </div>
          </div>

          <div className={`flex flex-col gap-1.5 ${attendance === "tidak" ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="flex justify-between items-center">
              <label className="font-rubik text-[11px] font-bold text-[#1b1c1a] flex items-center gap-1">
                <span className="material-symbols-outlined text-[#ad2b58] text-[16px]">groups</span> JUMLAH TAMU (CREW SIZE)
              </label>
              <span className="font-rubik text-[10px] font-bold text-[#ad2b58]">MAKS. 2 SEAT</span>
            </div>
            <div className="flex items-center justify-between bg-[#f5f3ef] rounded-lg p-2">
              <button type="button" onClick={() => setGuestCount((c) => Math.max(1, c - 1))} className="w-11 h-11 rounded-lg bg-[#316bf3] text-white flex items-center justify-center shadow-[0_3px_0_0_#003ea8] active:translate-y-0.5 active:shadow-none">
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
              <div className="flex flex-col items-center">
                <span className="font-rubik text-[20px] font-extrabold text-[#ad2b58] tracking-widest">{String(guestCount).padStart(2, "0")}</span>
                <span className="font-rubik text-[10px] font-bold text-[#574145] uppercase">PADDOCK SEAT</span>
              </div>
              <button type="button" onClick={() => setGuestCount((c) => Math.min(2, c + 1))} className="w-11 h-11 rounded-lg bg-[#316bf3] text-white flex items-center justify-center shadow-[0_3px_0_0_#003ea8] active:translate-y-0.5 active:shadow-none">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="wishes-text" className="font-rubik text-[11px] font-bold text-[#1b1c1a] flex items-center gap-1">
              <span className="material-symbols-outlined text-[#ad2b58] text-[16px]">favorite</span> UCAPAN &amp; DOA RESTU (RADIO TRANSMISSION)
            </label>
            <textarea
              id="wishes-text"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik ucapan doa manis untuk kedua mempelai di sirkuit cinta mereka..."
              className="w-full bg-white text-[#1b1c1a] font-jakarta text-[14px] rounded-lg p-3 border border-[#efeeea] focus:outline-none focus:border-[#6e0030] focus:ring-2 focus:ring-[#ffb1c3] shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] resize-none placeholder:text-[#8a7175]"
            />
          </div>

          <button type="submit" disabled={!name.trim() || !message.trim()} className="w-full mt-1 py-3 px-6 rounded-full bg-[#ad2b58] text-white font-rubik text-[13px] font-bold flex items-center justify-center gap-2 shadow-[0_5px_0_0_#6e0030] active:translate-y-1 active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            KIRIM RSVP &amp; DOA <span className="material-symbols-outlined text-[20px]">send</span>
          </button>

          <div className={`bg-[#e8ddff] text-[#21005e] p-3 rounded-lg flex items-center gap-2 ${showSuccess ? "flex" : "hidden"}`}>
            <span className="material-symbols-outlined text-[#674bb5] text-[20px]">celebration</span>
            <span className="font-rubik text-[11px] font-bold">DATA TERSIMPAN! SLOT PADDOCK TERKONFIRMASI ✨</span>
          </div>
        </form>
      </div>

      {/* Racer Status cameo */}
      <div className="bg-[#f5f3ef] rounded-xl p-3 flex items-center gap-3 shadow-sm">
        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#ffd9e0]">
          <Image src="/wedding/sprite-car-transparent.png" alt="Aldi & Qisty Roadster" width={80} height={80} className="w-full h-full object-contain pixelated bg-white p-1" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-rubik text-[10px] font-bold text-[#ad2b58] uppercase tracking-widest">RACER STATUS</span>
          <span className="font-rubik text-[12px] font-bold text-[#1b1c1a] truncate">ALDI &amp; QISTY ROADSTER</span>
          <p className="font-jakarta text-xs text-[#574145] line-clamp-2">Pit lane resmi dibuka pukul 10:00 WIB. Jangan lupa kumpulkan souvenir checkpoint di gerbang masuk!</p>
        </div>
      </div>

      {/* Live Feed */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#a88cfb]/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#674bb5] text-[20px]">forum</span>
            </div>
            <div className="flex flex-col">
              <span className="font-rubik text-[10px] font-bold text-[#674bb5] uppercase tracking-wider">LIVE TELEMETRY</span>
              <h2 className="font-rubik text-[12px] font-bold text-[#1b1c1a]">{'PADDOCK WISHES // FEED 💬'}</h2>
            </div>
          </div>
          <span className="font-rubik text-[10px] font-bold bg-[#ffd9e0] text-[#3f0019] px-2 py-0.5 rounded-full">{wishes.length} WISHES</span>
        </div>

        <div className="flex flex-col gap-3">
          {wishes.map((w, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-[0_3px_0_0_#debfc4] flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${w.avatar === "blue" ? "bg-[#dbe1ff] text-[#00174b]" : w.avatar === "purple" ? "bg-[#e8ddff] text-[#21005e]" : "bg-[#ffd9e0] text-[#3f0019]"}`}>
                    <span className="material-symbols-outlined text-[18px]">{w.avatar === "blue" ? "videogame_asset" : w.avatar === "purple" ? "favorite" : "sports_motorsports"}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-rubik text-[12px] font-bold text-[#1b1c1a] truncate">{w.name}</span>
                    <span className="font-rubik text-[10px] font-bold text-[#8a7175] uppercase">{w.time}</span>
                  </div>
                </div>
                <span className={`font-rubik text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${w.attendance === "hadir" ? "bg-[#ffd9e0] text-[#3f0019]" : "bg-[#efeeea] text-[#574145]"}`}>
                  {w.attendance === "hadir" ? `✔ HADIR${w.guestCount ? ` (${w.guestCount} PAX)` : ""}` : "✖ ABSEN (DOA DARI JAUH)"}
                </span>
              </div>
              <p className="font-jakarta text-[13px] text-[#574145] leading-relaxed pl-10 break-words" style={{ overflowWrap: "break-word", wordWrap: "break-word" }}>{w.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
