"use client";

import { useState, useEffect } from "react";
import { audioManager } from "@/utils/audio";

export default function EventSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date("2026-09-18T08:00:00+07:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const openGoogleMaps = () => {
    audioManager.playClick();
    window.open(
      "https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta",
      "_blank"
    );
  };

  const addToCalendar = () => {
    audioManager.playClick();
    const title = encodeURIComponent("Pernikahan Aldi & Qisty (#AlQiSAH)");
    const details = encodeURIComponent(
      "Akad Nikah & Resepsi Pernikahan Aldi & Qisty. A Game to Forever!"
    );
    const location = encodeURIComponent("Grand Ballroom, Jakarta");
    const dates = "20260918T010000Z/20260918T070000Z";
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`,
      "_blank"
    );
  };

  return (
    <div className="w-full min-h-full flex flex-col items-center px-4 py-6 bg-[#e0f0ff] overflow-y-auto select-none">
      {/* Header */}
      <div className="flex flex-col items-center mb-5 text-center">
        <div className="flex gap-1.5 text-base mb-2">
          <span>⭐</span>
          <span>💜</span>
          <span>⭐</span>
          <span>💜</span>
          <span>⭐</span>
        </div>
        <h1
          className="text-[#1e3a8a] text-base sm:text-lg mb-1 font-pixel tracking-wide"
        >
          Waktu &amp; Lokasi
        </h1>
        <p
          className="text-[#cc1f2a] text-[10px] font-pixel"
        >
          Save The Date!
        </p>
      </div>

      {/* Countdown Timer Box */}
      <div className="w-full max-w-sm bg-white pixel-box-amber p-4 mb-5 shadow-md">
        <p
          className="text-[#1e3a8a] text-[9px] text-center mb-3 font-pixel"
        >
          ⏰ COUNTDOWN TO FOREVER
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "HARI", value: timeLeft.days },
            { label: "JAM", value: timeLeft.hours },
            { label: "MNT", value: timeLeft.minutes },
            { label: "DTK", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-[#ffd93d] pixel-box py-2"
            >
              <span
                className="text-base sm:text-lg font-bold text-[#1e3a8a] font-pixel"
              >
                {String(item.value).padStart(2, "0")}
              </span>
              <span
                className="text-[7px] text-[#1e3a8a] font-pixel mt-1 font-bold"
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stage 1: Akad Nikah */}
      <div className="w-full max-w-sm bg-white pixel-box-pink p-4 mb-4 text-center shadow-md">
        <div
          className="inline-block px-3 py-1 bg-[#ffb6c1] text-[#cc1f2a] text-[8px] mb-2 font-pixel border border-[#f08080]"
        >
          STAGE 1 • AKAD NIKAH
        </div>
        <h3
          className="text-[#1e3a8a] text-xs font-bold mb-1 font-pixel"
        >
          Jumat, 18 September 2026
        </h3>
        <p
          className="text-[#cc1f2a] text-[10px] mb-3 font-pixel"
        >
          08:00 - 10:00 WIB
        </p>
        <div className="w-16 h-[2px] bg-[#f08080] mx-auto mb-2" />
        <p className="text-slate-700 text-xs font-medium">
          Grand Ballroom &amp; Chapel
        </p>
        <p className="text-slate-500 text-[10px]">
          Kawasan Senayan, Jakarta Pusat
        </p>
      </div>

      {/* Stage 2: Resepsi */}
      <div className="w-full max-w-sm bg-white pixel-box p-4 mb-4 text-center shadow-md">
        <div
          className="inline-block px-3 py-1 bg-[#87ceeb] text-[#1e3a8a] text-[8px] mb-2 font-pixel border border-[#1e3a8a]"
        >
          STAGE 2 • RESEPSI PERNIKAHAN
        </div>
        <h3
          className="text-[#1e3a8a] text-xs font-bold mb-1 font-pixel"
        >
          Jumat, 18 September 2026
        </h3>
        <p
          className="text-[#1e3a8a] text-[10px] mb-3 font-pixel"
        >
          11:00 - 14:00 WIB
        </p>
        <div className="w-16 h-[2px] bg-[#1e3a8a] mx-auto mb-2" />
        <p className="text-slate-700 text-xs font-medium">
          Grand Ballroom
        </p>
        <p className="text-slate-500 text-[10px]">
          Kawasan Senayan, Jakarta Pusat
        </p>
      </div>

      {/* Dress Code Box */}
      <div className="w-full max-w-sm bg-white pixel-box-amber p-3.5 mb-5 text-center shadow-md">
        <p className="text-[9px] text-[#1e3a8a] font-pixel mb-2">
          👔 DRESS CODE: PASTEL FORMAL
        </p>
        <div className="flex justify-center items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#ffb6c1] border border-black/20" title="Pastel Pink" />
          <span className="w-5 h-5 rounded-full bg-[#87ceeb] border border-black/20" title="Sky Blue" />
          <span className="w-5 h-5 rounded-full bg-[#ffd93d] border border-black/20" title="Warm Yellow" />
          <span className="w-5 h-5 rounded-full bg-[#e0ffe0] border border-black/20" title="Mint" />
        </div>
      </div>

      {/* Action Buttons: Maps & Calendar */}
      <div className="w-full max-w-sm flex flex-col gap-2.5 mb-4">
        <button
          onClick={openGoogleMaps}
          className="w-full bg-[#1e3a8a] text-white py-3 px-4 text-[9px] sm:text-[10px] uppercase pixel-btn flex items-center justify-center gap-2 cursor-pointer font-pixel"
        >
          <span>📍</span>
          <span>Buka di Google Maps</span>
        </button>

        <button
          onClick={addToCalendar}
          className="w-full bg-[#059669] text-white py-3 px-4 text-[9px] sm:text-[10px] uppercase pixel-btn-emerald flex items-center justify-center gap-2 cursor-pointer font-pixel"
        >
          <span>📅</span>
          <span>Simpan ke Google Calendar</span>
        </button>
      </div>

      <p className="text-[9px] text-slate-600 text-center italic max-w-xs leading-relaxed font-medium">
        Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i
        berkenan hadir untuk memberikan doa restu.
      </p>
    </div>
  );
}
