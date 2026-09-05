"use client";

import { useState, useEffect } from "react";
import { audioManager } from "@/utils/audio";

const MAPS_URL = "https://maps.app.goo.gl/AKG3KbeNVdVBsvLR6";
const VENUE_NAME = "Hotel Indies Style Bandung";
const VENUE_ADDRESS =
  "Jl. Kebon Jati No.32, Kb. Jeruk, Kec. Andir, Kota Bandung, Jawa Barat 40181";

export default function EventSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date("2026-11-08T08:00:00+07:00").getTime();

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
    window.open(MAPS_URL, "_blank");
  };

  const addToCalendar = () => {
    audioManager.playClick();
    const title = encodeURIComponent("Pernikahan Aldi & Qisti (#AlQiSAH)");
    const details = encodeURIComponent(
      "Akad Nikah & Resepsi Pernikahan Aldi & Qisti. A Game to Forever!"
    );
    const location = encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDRESS}`);
    const dates = "20261108T010000Z/20261108T070000Z";
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`,
      "_blank"
    );
  };

  return (
    <div className="w-full min-h-full flex flex-col px-4 py-6 bg-[#FFF8EC] overflow-y-auto select-none">
      <div className="brut-card-black inline-flex self-start px-3 py-1.5 mb-3">
        <span className="font-display text-[11px] tracking-widest">
          PIT STOP
        </span>
      </div>
      <h1 className="font-display text-section-title mb-1">WAKTU & LOKASI</h1>
      <p className="text-base font-bold mb-5">Minggu, 8 November 2026</p>

      <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
        {/* Pit-stop scoreboard countdown */}
        <div className="brut-card-black p-4">
          <p className="font-display text-[11px] tracking-widest text-[#FFD500] mb-3">
            ⏱ COUNTDOWN TO GREEN LIGHT
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
                className="bg-[#1c1c1c] border-2 border-[#FFD500] px-1 py-2 text-center"
              >
                <p className="font-display text-xl text-white">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="font-display text-[9px] text-[#FFD500] mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 1: Akad */}
        <div className="brut-card-yellow p-4">
          <p className="font-display text-[11px] tracking-widest mb-2">
            STAGE 1 — AKAD NIKAH
          </p>
          <p className="font-display text-2xl">JAM 08:00 WIB</p>
          <div className="h-[3px] bg-black my-3" />
          <p className="text-base font-bold">{VENUE_NAME}</p>
          <p className="text-sm text-[#333] leading-snug mt-1">
            {VENUE_ADDRESS}
          </p>
        </div>

        {/* Stage 2: Resepsi */}
        <div className="brut-card-red p-4">
          <p className="font-display text-[11px] tracking-widest mb-2">
            STAGE 2 — RESEPSI
          </p>
          <p className="font-display text-2xl">JAM 11:00–13:00</p>
          <div className="h-[3px] bg-white my-3" />
          <p className="text-base font-bold">{VENUE_NAME}</p>
          <p className="text-sm text-white/90 leading-snug mt-1">
            {VENUE_ADDRESS}
          </p>
        </div>

        {/* Full-width actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={openGoogleMaps}
            className="brut-btn-black w-full min-h-[52px] py-3.5 px-4 text-base cursor-pointer font-display"
          >
            📍 BUKA DI GOOGLE MAPS
          </button>
          <button
            onClick={addToCalendar}
            className="brut-btn w-full min-h-[52px] py-3.5 px-4 text-base cursor-pointer font-display bg-white"
          >
            📅 SIMPAN KE CALENDAR
          </button>
        </div>

        <p className="text-[15px] leading-snug font-medium">
          Merupakan suatu kehormatan apabila Bapak/Ibu/Saudara/i berkenan
          hadir untuk memberikan doa restu.
        </p>
      </div>
    </div>
  );
}
