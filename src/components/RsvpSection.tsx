"use client";

import { useState } from "react";
import { audioManager } from "@/utils/audio";

interface Wish {
  name: string;
  attendance: "hadir" | "tidak";
  message: string;
  time: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    name: "Rian & Sarah",
    attendance: "hadir",
    message:
      "Selamat menempuh hidup baru Aldi & Qisti! Balapan cintanya finish bahagia di pelaminan! 🏁",
    time: "Baru saja",
  },
  {
    name: "Dimas Pratama",
    attendance: "hadir",
    message: "Barakallahu lakuma, semoga langgeng dan samawa selalu brother Aldi!",
    time: "2 jam lalu",
  },
  {
    name: "Nadya & Keluarga",
    attendance: "hadir",
    message: "Happy wedding Qisti! Undangannya keren banget, can't wait!",
    time: "5 jam lalu",
  },
];

export default function RsvpSection() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | "">("");
  const [guestCount, setGuestCount] = useState("1");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;

    audioManager.playClick();
    if (message.trim()) {
      setWishes([
        {
          name: name.trim(),
          attendance: attendance as "hadir" | "tidak",
          message: message.trim(),
          time: "Baru saja",
        },
        ...wishes,
      ]);
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-full flex flex-col px-4 py-6 bg-[#FFF8EC] overflow-y-auto select-none">
      <div className="brut-card-black inline-flex self-start px-3 py-1.5 mb-3">
        <span className="font-display text-[11px] tracking-widest">
          RACE CONTROL
        </span>
      </div>
      <h1 className="font-display text-section-title mb-1">RSVP</h1>
      <p className="text-base font-bold mb-5">
        Konfirmasi kehadiran — tanpa antri pit.
      </p>

      <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
        {submitted ? (
          <div className="brut-card p-6 text-center">
            <p className="font-display text-4xl mb-3">🏁</p>
            <h3 className="font-display text-xl mb-2">TERKIRIM!</h3>
            <p className="text-[15px] leading-snug mb-4">
              Terima kasih <strong>{name}</strong>! Namamu sudah masuk starting
              grid kami.
            </p>
            <button
              onClick={() => {
                audioManager.playClick();
                setSubmitted(false);
                setName("");
                setMessage("");
                setAttendance("");
              }}
              className="brut-btn min-h-[44px] px-4 py-2 text-sm cursor-pointer bg-white"
            >
              + Kirim Lagi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="brut-card p-4">
            <div className="mb-4">
              <label className="font-display text-[11px] block mb-2">
                NAMA LENGKAP *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="brut-input w-full px-3 py-3 text-base"
              />
            </div>

            <div className="mb-4">
              <label className="font-display text-[11px] block mb-2">
                KEHADIRAN *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    audioManager.playClick();
                    setAttendance("hadir");
                  }}
                  className={`min-h-[48px] py-3 px-2 font-display text-xs cursor-pointer ${
                    attendance === "hadir"
                      ? "brut-btn bg-black text-white"
                      : "brut-btn bg-white"
                  }`}
                >
                  ✓ HADIR
                </button>
                <button
                  type="button"
                  onClick={() => {
                    audioManager.playClick();
                    setAttendance("tidak");
                  }}
                  className={`min-h-[48px] py-3 px-2 font-display text-xs cursor-pointer ${
                    attendance === "tidak"
                      ? "brut-btn-red"
                      : "brut-btn bg-white"
                  }`}
                >
                  ✕ ABSEN
                </button>
              </div>
            </div>

            {attendance === "hadir" && (
              <div className="mb-4">
                <label className="font-display text-[11px] block mb-2">
                  JUMLAH TAMU
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="brut-input w-full px-3 py-3 text-base cursor-pointer"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                </select>
              </div>
            )}

            <div className="mb-4">
              <label className="font-display text-[11px] block mb-2">
                UCAPAN & DOA
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis ucapan untuk kedua mempelai..."
                className="brut-input w-full px-3 py-3 text-base resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !attendance}
              className="brut-btn-red w-full min-h-[52px] py-3.5 px-4 text-base cursor-pointer font-display disabled:opacity-40 disabled:cursor-not-allowed"
            >
              KIRIM RSVP →
            </button>
          </form>
        )}

        <div>
          <h3 className="font-display text-sm mb-3">
            💬 DINDING UCAPAN ({wishes.length})
          </h3>
          <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
            {wishes.map((w, idx) => (
              <div key={idx} className="brut-card p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-display text-xs">{w.name}</span>
                  <span
                    className={`font-display text-[9px] px-2 py-0.5 border-2 border-black ${
                      w.attendance === "hadir"
                        ? "bg-[#FFD500]"
                        : "bg-white"
                    }`}
                  >
                    {w.attendance === "hadir" ? "HADIR" : "ABSEN"}
                  </span>
                </div>
                <p className="text-[15px] leading-snug">{w.message}</p>
                <p className="text-xs text-[#666] mt-1">{w.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
