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
    message: "Selamat menempuh hidup baru Aldi & Qisty! Balapan cintanya finish bahagia di pelaminan! 🎉🏁",
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
    message: "Happy wedding Qisty sayang! Gemas banget undangannya tema retro F1! Can't wait!",
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
    <div className="w-full min-h-full flex flex-col items-center px-4 py-6 bg-[#e0ffe0] overflow-y-auto select-none">
      {/* Header */}
      <div className="flex flex-col items-center mb-5 text-center">
        <div className="flex gap-1.5 text-base mb-2">
          <span>💌</span>
          <span>💚</span>
          <span>💌</span>
          <span>💚</span>
          <span>💌</span>
        </div>
        <h1
          className="text-[#1e3a8a] text-base sm:text-lg mb-1 font-pixel tracking-wide"
        >
          RSVP &amp; Ucapan
        </h1>
        <p
          className="text-[#059669] text-[10px] font-pixel"
        >
          Konfirmasi Kehadiran Tamu
        </p>
      </div>

      {/* Success Banner */}
      {submitted ? (
        <div className="w-full max-w-sm bg-white pixel-box-emerald p-6 text-center mb-6 shadow-md">
          <div className="text-3xl mb-2">🎉</div>
          <h3
            className="text-[#059669] text-sm mb-2 font-pixel"
          >
            Terkirim!
          </h3>
          <p className="text-slate-600 text-[11px] mb-4 font-sans leading-relaxed">
            Terima kasih <strong className="text-slate-900">{name}</strong>!
            Konfirmasi kehadiran Anda telah tercatat dalam grid start pernikahan kami.
          </p>
          <button
            onClick={() => {
              audioManager.playClick();
              setSubmitted(false);
              setName("");
              setMessage("");
              setAttendance("");
            }}
            className="bg-[#059669] text-white py-2 px-4 text-[9px] uppercase pixel-btn-emerald cursor-pointer font-pixel"
          >
            Kirim Konfirmasi Lain
          </button>
        </div>
      ) : (
        /* RSVP Form */
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white pixel-box p-4 mb-6 shadow-md"
        >
          {/* Name input */}
          <div className="mb-3.5">
            <label
              className="text-[9px] text-[#1e3a8a] block mb-1.5 font-pixel font-bold"
            >
              NAMA LENGKAP *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              className="w-full px-3 py-2 text-xs pixel-input text-[#1e3a8a] font-sans"
            />
          </div>

          {/* Attendance Buttons */}
          <div className="mb-3.5">
            <label
              className="text-[9px] text-[#1e3a8a] block mb-1.5 font-pixel font-bold"
            >
              KEHADIRAN *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  audioManager.playClick();
                  setAttendance("hadir");
                }}
                className={`py-2.5 px-3 text-[9px] font-pixel cursor-pointer transition-all ${
                  attendance === "hadir"
                    ? "bg-[#059669] text-white pixel-btn-emerald"
                    : "bg-white text-[#059669] border-2 border-[#059669]"
                }`}
              >
                ✓ Hadir
              </button>
              <button
                type="button"
                onClick={() => {
                  audioManager.playClick();
                  setAttendance("tidak");
                }}
                className={`py-2.5 px-3 text-[9px] font-pixel cursor-pointer transition-all ${
                  attendance === "tidak"
                    ? "bg-[#cc1f2a] text-white pixel-btn-red"
                    : "bg-white text-[#cc1f2a] border-2 border-[#cc1f2a]"
                }`}
              >
                ✕ Tidak
              </button>
            </div>
          </div>

          {/* Guest Count (if Hadir) */}
          {attendance === "hadir" && (
            <div className="mb-3.5">
              <label
                className="text-[9px] text-[#1e3a8a] block mb-1.5 font-pixel font-bold"
              >
                JUMLAH TAMU
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-3 py-2 text-xs pixel-input text-[#1e3a8a] font-sans cursor-pointer"
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
              </select>
            </div>
          )}

          {/* Message / Wishes */}
          <div className="mb-4">
            <label
              className="text-[9px] text-[#1e3a8a] block mb-1.5 font-pixel font-bold"
            >
              UCAPAN &amp; DOA RESTU
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
              className="w-full px-3 py-2 text-xs pixel-input text-[#1e3a8a] font-sans resize-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!name.trim() || !attendance}
            className="w-full bg-[#059669] text-white py-3 px-4 text-[9px] sm:text-[10px] uppercase pixel-btn-emerald flex items-center justify-center gap-2 cursor-pointer font-pixel disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>💌</span>
            <span>Kirim RSVP &amp; Ucapan</span>
          </button>
        </form>
      )}

      {/* Wishes Board */}
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-2.5">
          <h3
            className="text-[9px] text-[#1e3a8a] font-pixel font-bold"
          >
            💬 UCAPAN &amp; DOA ({wishes.length})
          </h3>
        </div>

        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {wishes.map((w, idx) => (
            <div
              key={idx}
              className="bg-white pixel-box p-3 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-[9px] text-[#1e3a8a] font-bold font-pixel"
                >
                  {w.name}
                </span>
                <span className="text-[8px] text-slate-400 font-mono">
                  {w.time}
                </span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed font-sans">
                {w.message}
              </p>
              <div className="mt-1.5 flex items-center gap-1">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    w.attendance === "hadir" ? "bg-[#059669]" : "bg-[#cc1f2a]"
                  }`}
                />
                <span
                  className="text-[7px] text-[#888] font-pixel"
                >
                  {w.attendance === "hadir" ? "AKAN HADIR" : "BERHALANGAN"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
