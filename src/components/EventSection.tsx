"use client";

import { useState, useEffect } from "react";
import { audioManager } from "@/utils/audio";

const MAPS_URL = "https://maps.app.goo.gl/AKG3KbeNVdVBsvLR6";
const VENUE_NAME = "Hotel Indies Style Bandung";
const VENUE_ADDRESS =
  "Jl. Kebon Jati No.32, Kb. Jeruk, Kec. Andir, Kota Bandung, Jawa Barat 40181";

export default function EventSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });
  const [calSaved, setCalSaved] = useState(false);

  useEffect(() => {
    const target = new Date("2026-09-18T08:00:00+07:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const addToCalendar = () => {
    audioManager.playClick();
    const title = encodeURIComponent("Pernikahan Aldi & Qisti (#AlQiSAH)");
    const details = encodeURIComponent("Akad Nikah & Resepsi Pernikahan Aldi & Qisti. A Game to Forever!");
    const location = encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDRESS}`);
    const dates = "20261108T010000Z/20261108T070000Z";
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`, "_blank");
    setCalSaved(true);
    setTimeout(() => setCalSaved(false), 2000);
  };

  return (
    <div className="w-full flex flex-col bg-[#fbf9f5] py-4 gap-4 select-none" style={{ padding: "0 20px", paddingTop: "16px", paddingBottom: "16px" }}>
      {/* Quest header + heart garland */}
      <div className="bg-white p-4 rounded-xl shadow-[0_6px_20px_rgba(173,43,88,0.08)] flex flex-col gap-3">
        <div className="flex items-center justify-between opacity-80">
          <div className="flex gap-1.5 items-center">
            <span className="material-symbols-outlined text-[#ff6b97] text-[16px]">favorite</span>
            <span className="material-symbols-outlined text-[#a88cfb] text-[16px]">favorite</span>
            <span className="material-symbols-outlined text-[#ffb1c3] text-[16px]">favorite</span>
            <span className="material-symbols-outlined text-[#674bb5] text-[16px]">favorite</span>
          </div>
          <span className="font-rubik text-[10px] font-bold text-[#0051d5] tracking-widest uppercase">QUEST LOG #04</span>
          <div className="flex gap-1.5 items-center">
            <span className="material-symbols-outlined text-[#674bb5] text-[16px]">favorite</span>
            <span className="material-symbols-outlined text-[#ffb1c3] text-[16px]">favorite</span>
            <span className="material-symbols-outlined text-[#a88cfb] text-[16px]">favorite</span>
            <span className="material-symbols-outlined text-[#ff6b97] text-[16px]">favorite</span>
          </div>
        </div>

        <div className="bg-[#f5f3ef] rounded-lg p-3 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#ffd9e0] text-[#3f0019] font-rubik text-[10px] font-bold tracking-wider uppercase mb-2">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            COUNTDOWN TO BIG DAY
          </div>
          <div className="grid grid-cols-3 gap-2 w-full max-w-[280px]">
            {[
              { label: "HARI", value: timeLeft.days },
              { label: "JAM", value: timeLeft.hours },
              { label: "MNT", value: timeLeft.mins },
            ].map((b) => (
              <div key={b.label} className="bg-white p-2 rounded-lg shadow-sm flex flex-col items-center">
                <span className="font-rubik text-[20px] font-extrabold tracking-tight text-[#ad2b58]">{String(b.value).padStart(2, "0")}</span>
                <span className="font-rubik text-[10px] font-bold text-[#574145] uppercase">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STAGE 01 */}
      <div className="bg-white rounded-xl p-4 shadow-[0_4px_16px_rgba(0,81,213,0.06)] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#dbe1ff] text-[#00174b] font-rubik text-[10px] font-bold tracking-wide">
            <span className="material-symbols-outlined text-[13px]">lock_open</span> STAGE 01 • UNLOCKED
          </div>
          <div className="flex items-center gap-1 text-[#0051d5] font-rubik text-[11px] font-bold bg-[#dbe1ff]/50 px-2 py-0.5 rounded">
            <span className="material-symbols-outlined text-[16px]">schedule</span> 08:00 WIB
          </div>
        </div>
        <div className="flex items-start gap-3 pt-1">
          <div className="w-12 h-12 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#0051d5] shrink-0">
            <span className="material-symbols-outlined text-[26px]">loyalty</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="font-rubik text-[14px] font-bold text-[#1b1c1a] tracking-wide">Akad Nikah Ceremony</h2>
            <p className="font-jakarta text-xs text-[#574145] mt-0.5 leading-relaxed">Khidmat &amp; Janji Suci Kedua Mempelai di hadapan saksi dan penghulu.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="font-rubik text-[10px] font-bold text-[#0051d5] bg-[#f5f3ef] px-2 py-0.5 rounded">#KeluargaInti</span>
          <span className="font-rubik text-[10px] font-bold text-[#674bb5] bg-[#f5f3ef] px-2 py-0.5 rounded">#SakralVibes</span>
        </div>
      </div>

      {/* STAGE 02 */}
      <div className="bg-white rounded-xl p-4 shadow-[0_4px_16px_rgba(173,43,88,0.08)] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#ffd9e0] text-[#3f0019] font-rubik text-[10px] font-bold tracking-wide">
            <span className="material-symbols-outlined text-[13px]">flag</span> STAGE 02 • MAIN QUEST
          </div>
          <div className="flex items-center gap-1 text-[#ad2b58] font-rubik text-[11px] font-bold bg-[#ffd9e0]/50 px-2 py-0.5 rounded">
            <span className="material-symbols-outlined text-[16px]">pace</span> 11:00 - 13:00 WIB
          </div>
        </div>
        <div className="flex items-start gap-3 pt-1">
          <div className="w-12 h-12 rounded-lg bg-[#ffd9e0] flex items-center justify-center text-[#ad2b58] shrink-0">
            <span className="material-symbols-outlined text-[26px]">celebration</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="font-rubik text-[14px] font-bold text-[#1b1c1a] tracking-wide">Resepsi &amp; Paddock Party</h2>
            <p className="font-jakarta text-xs text-[#574145] mt-0.5 leading-relaxed">Paddock Party &amp; Ramah Tamah. Rayakan momen bahagia bersama keluarga dan sahabat terdekat.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <span className="font-rubik text-[10px] font-bold text-[#ad2b58] bg-[#f5f3ef] px-2 py-0.5 rounded">#FoodBuff</span>
          <span className="font-rubik text-[10px] font-bold text-[#0051d5] bg-[#f5f3ef] px-2 py-0.5 rounded">#LiveChiptune</span>
          <span className="font-rubik text-[10px] font-bold text-[#674bb5] bg-[#f5f3ef] px-2 py-0.5 rounded">#PhotoOp</span>
        </div>
      </div>

      {/* LOCATION */}
      <div className="bg-white rounded-xl p-4 shadow-[0_4px_16px_rgba(103,75,181,0.06)] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#0051d5] text-[18px]">near_me</span>
            <span className="font-rubik text-[11px] font-bold text-[#0051d5] tracking-widest uppercase">{'LOCATION // VENUE'}</span>
          </div>
          <span className="font-rubik text-[9px] font-bold text-[#574145] bg-[#efeeea] px-2 py-0.5 rounded">COORDS [BANDUNG]</span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-rubik text-[14px] font-bold text-[#1b1c1a]">{VENUE_NAME}</h3>
          <p className="font-jakarta text-xs text-[#574145] leading-relaxed break-words" style={{ overflowWrap: "break-word", wordWrap: "break-word" }}>{VENUE_ADDRESS}</p>
        </div>
        <div className="w-full h-44 rounded-lg bg-cover bg-center shadow-inner relative flex items-center justify-center overflow-hidden" style={{ backgroundImage: "url('/wedding/f1-monte-carlo-bg.png')" }}>
          <div className="absolute inset-0 bg-[#fbf9f5]/20 backdrop-blur-[1px]" />
          <div className="relative bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 border border-[#efeeea]">
            <span className="material-symbols-outlined text-[#ad2b58] text-[20px]">room</span>
            <span className="font-rubik text-[11px] font-bold text-[#1b1c1a] tracking-wide">PIT STOP ARENA</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" onClick={() => audioManager.playClick()} className="w-full py-3 px-4 rounded-lg bg-[#0051d5] text-white font-rubik text-[11px] font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform">
            <span className="material-symbols-outlined text-[18px]">map</span> BUKA DI GOOGLE MAPS ↗
          </a>
          <button onClick={addToCalendar} className="w-full py-3 px-4 rounded-lg bg-[#ff6b97] text-white font-rubik text-[11px] font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform">
            <span className="material-symbols-outlined text-[18px]">{calSaved ? "done" : "calendar_add_on"}</span> {calSaved ? "TERSIMPAN!" : "SIMPAN KE KALENDER 📅"}
          </button>
        </div>
      </div>

      <div className="bg-[#e8ddff] rounded-xl p-3 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#a88cfb]/30 flex items-center justify-center text-[#21005e] shrink-0">
            <span className="material-symbols-outlined text-[18px]">checkroom</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-rubik text-[10px] font-bold text-[#4f319c] uppercase tracking-wider">RECOMMENDED ATTIRE</span>
            <span className="font-rubik text-[12px] font-bold text-[#21005e] truncate">Smart Casual / Pastel Chic</span>
          </div>
        </div>
        <span className="font-rubik text-[10px] font-bold text-[#21005e] bg-white/60 px-2 py-1 rounded shrink-0">LVL 01+</span>
      </div>
    </div>
  );
}
