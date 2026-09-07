"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type InvitationSection = "couple" | "event" | "gallery" | "rsvp";

interface PaddockGameProps {
  onSwitchToRace: () => void;
  onNavigate?: (section: InvitationSection) => void;
  onExit?: () => void;
}

type PaddockObjectId = "gallery" | "rsvp" | "wishes" | "gift" | "race";

interface PaddockObject {
  id: PaddockObjectId;
  x: number; // center x
  y: number; // center y
  w: number;
  h: number;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  hint: string;
}

const MAP_W = 380;
const MAP_H = 560; // tinggi area jalan, sisanya untuk D-Pad
const PLAYER_SIZE = 28;
const STEP = 14;

const OBJECTS: PaddockObject[] = [
  {
    id: "gallery",
    x: 80,
    y: 110,
    w: 92,
    h: 68,
    icon: "⛺",
    title: "TENDA PIT STOP",
    subtitle: "Galeri Kenangan",
    color: "#ff6b97",
    hint: "Pre-wedding Aldi & Qisti",
  },
  {
    id: "rsvp",
    x: 295,
    y: 115,
    w: 100,
    h: 62,
    icon: "📋",
    title: "MEJA REGISTRASI",
    subtitle: "Paddock Check-In",
    color: "#316bf3",
    hint: "Konfirmasi Kehadiran",
  },
  {
    id: "wishes",
    x: 85,
    y: 320,
    w: 102,
    h: 74,
    icon: "💬",
    title: "PAPAN PENGGEMAR",
    subtitle: "Fan Board",
    color: "#a88cfb",
    hint: "Tulis doa restu",
  },
  {
    id: "gift",
    x: 285,
    y: 335,
    w: 86,
    h: 70,
    icon: "🏆",
    title: "TROFI SPONSOR",
    subtitle: "Amplop Digital",
    color: "#ffd93d",
    hint: "Kado & Gift",
  },
  {
    id: "race",
    x: 190,
    y: 490,
    w: 124,
    h: 62,
    icon: "🏎️",
    title: "MOBIL F1 PARKIR",
    subtitle: "Ganti ke Mode Race",
    color: "#E10600",
    hint: "TEKAN A UNTUK RACE",
  },
];

export default function PaddockGame({ onSwitchToRace, onNavigate, onExit }: PaddockGameProps) {
  const [player, setPlayer] = useState({ x: 190, y: 245 });
  const [dir, setDir] = useState<string | null>(null);
  const [activePopup, setActivePopup] = useState<PaddockObjectId | null>(null);
  const [nearbyId, setNearbyId] = useState<PaddockObjectId | null>(null);
  const holdRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeObj = activePopup ? OBJECTS.find((o) => o.id === activePopup) : null;
  const nearbyObj = nearbyId ? OBJECTS.find((o) => o.id === nearbyId) : null;

  const move = useCallback((dx: number, dy: number) => {
    if (activePopup) return;
    setPlayer((p) => {
      const nx = Math.max(PLAYER_SIZE / 2 + 8, Math.min(MAP_W - PLAYER_SIZE / 2 - 8, p.x + dx));
      const ny = Math.max(16 + PLAYER_SIZE / 2, Math.min(MAP_H - PLAYER_SIZE / 2 - 12, p.y + dy));
      return { x: nx, y: ny };
    });
  }, [activePopup]);

  // detect nearby
  useEffect(() => {
    let best: PaddockObjectId | null = null;
    let bestDist = Infinity;
    for (const o of OBJECTS) {
      const dx = player.x - o.x;
      const dy = player.y - o.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const thresh = o.id === "race" ? 78 : 68;
      if (d < thresh && d < bestDist) {
        bestDist = d;
        best = o.id;
      }
    }
    setNearbyId(best);
  }, [player]);

  // hold movement
  const startHold = (d: string) => {
    if (activePopup) return;
    setDir(d);
    const map: Record<string, [number, number]> = {
      up: [0, -STEP],
      down: [0, STEP],
      left: [-STEP, 0],
      right: [STEP, 0],
    };
    const [dx, dy] = map[d] ?? [0, 0];
    move(dx, dy);
    if (holdRef.current) window.clearInterval(holdRef.current);
    holdRef.current = window.setInterval(() => move(dx, dy), 90);
  };
  const stopHold = () => {
    setDir(null);
    if (holdRef.current) {
      window.clearInterval(holdRef.current);
      holdRef.current = null;
    }
  };

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activePopup && e.key === "Escape") {
        setActivePopup(null);
        return;
      }
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        move(0, -STEP);
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        move(0, STEP);
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        // A is action, but allow movement with h? keep simple
        if (e.key.toLowerCase() === "a" && nearbyId) {
          e.preventDefault();
          handleAction();
        } else {
          e.preventDefault();
          move(-STEP, 0);
        }
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        move(STEP, 0);
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleAction();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [move, nearbyId, activePopup]);

  // cleanup hold on unmount
  useEffect(() => () => {
    if (holdRef.current) window.clearInterval(holdRef.current);
  }, []);

  const handleAction = () => {
    if (activePopup) {
      setActivePopup(null);
      return;
    }
    if (nearbyId) {
      if (nearbyId === "race") {
        // langsung switch tanpa popup? tapi popup konfirmasi dulu
        setActivePopup("race");
      } else {
        setActivePopup(nearbyId);
      }
    }
  };

  const handlePopupAction = (id: PaddockObjectId) => {
    if (id === "race") {
      onSwitchToRace();
      setActivePopup(null);
      return;
    }
    if (id === "gallery" && onNavigate) {
      onNavigate("gallery");
      setActivePopup(null);
      return;
    }
    if (id === "rsvp" && onNavigate) {
      onNavigate("rsvp");
      setActivePopup(null);
      return;
    }
    if (id === "wishes" && onNavigate) {
      onNavigate("rsvp");
      setActivePopup(null);
      return;
    }
    if (id === "gift" && onNavigate) {
      // untuk gift, tetap popup detail amplop, tidak navigasi dulu
      setActivePopup(null);
      // bisa juga onNavigate rsvp, tapi biarkan popup close saja
    } else {
      setActivePopup(null);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col bg-[#fbf9f5] overflow-hidden select-none">
      {/* Header Paddock */}
      <div className="w-full shrink-0 flex items-center justify-between px-3 py-2 bg-[#1a1a2e] z-20 border-b-[4px] border-black">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-none bg-[#FFD500] border-2 border-white" />
          <span className="font-pixel text-[7px] text-white tracking-widest">THE PADDOCK</span>
          <span className="font-vt text-[13px] text-[#FFD500] ml-1">Pit Lane Explore</span>
        </div>
        {onExit && (
          <button onClick={onExit} className="px-2.5 py-1 bg-white text-[#1a1a2e] border-[3px] border-black font-pixel text-[7px] shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            UNDANGAN
          </button>
        )}
      </div>

      {/* Map Area */}
      <div className="relative flex-1 w-full bg-[#2b2e3a] overflow-hidden" style={{ minHeight: MAP_H, maxHeight: MAP_H }}>
        {/* aspal garis */}
        <div className="absolute inset-0">
          {/* lantai beton pit lane atas */}
          <div className="absolute top-0 inset-x-0 h-[78px] bg-[#d9d7d3] border-b-[4px] border-[#1a1a2e]" />
          <div className="absolute top-[78px] inset-x-0 h-[4px] bg-[#FFD500]" />
          <div className="absolute top-[82px] inset-x-0 h-[4px] bg-white" style={{ background: "repeating-linear-gradient(90deg, white 0 14px, transparent 14px 22px)" }} />
          {/* aspal utama */}
          <div className="absolute top-[86px] inset-x-0 bottom-[78px] bg-[#2b2e3a]" />
          {/* garis tengah putus */}
          <div className="absolute top-[50%] left-0 right-0 h-[3px] -translate-y-1/2 opacity-50" style={{ background: "repeating-linear-gradient(90deg, #FFD500 0 18px, transparent 18px 28px)" }} />
          {/* beton bawah */}
          <div className="absolute bottom-0 inset-x-0 h-[78px] bg-[#d9d7d3] border-t-[4px] border-[#1a1a2e]" />
          <div className="absolute bottom-[78px] inset-x-0 h-[4px] bg-white" style={{ background: "repeating-linear-gradient(90deg, white 0 14px, transparent 14px 22px)" }} />
          <div className="absolute bottom-[82px] inset-x-0 h-[4px] bg-[#FFD500]" />
        </div>

        {/* Pit Garages (top bar) */}
        <div className="absolute top-[14px] left-2 right-2 flex gap-2 justify-between">
          <div className="flex-1 h-[52px] bg-[#1a1a2e] border-[3px] border-black flex items-center justify-center gap-1">
            <span className="font-pixel text-[7px] text-white">PIT 07</span>
            <span className="w-6 h-7 bg-[#ff6b97] border-2 border-black ml-1" />
          </div>
          <div className="flex-1 h-[52px] bg-[#1a1a2e] border-[3px] border-black flex items-center justify-center gap-1">
            <span className="font-pixel text-[7px] text-white">PIT 08</span>
            <span className="w-6 h-7 bg-[#316bf3] border-2 border-black ml-1" />
          </div>
        </div>

        {/* Papan Skor Elektronik */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 bg-black border-[3px] border-[#FFD500] px-3 py-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1a1a] animate-pulse" />
          <span className="font-pixel text-[6px] text-[#FFD500] tracking-widest">SCOREBOARD</span>
          <span className="font-vt text-[12px] text-white">07:59</span>
        </div>

        {/* Objects */}
        {OBJECTS.map((obj) => {
          const isNearby = nearbyId === obj.id;
          return (
            <div
              key={obj.id}
              className="absolute flex flex-col items-center justify-center"
              style={{ left: obj.x - obj.w / 2, top: obj.y - obj.h / 2, width: obj.w, height: obj.h }}
            >
              <div
                className={`w-full h-full flex flex-col items-center justify-center border-[4px] border-[#1a1a2e] shadow-[4px_4px_0_#000] ${isNearby ? "scale-[1.03]" : ""} transition-transform`}
                style={{ background: obj.id === "race" ? "#ffffff" : "#fbf9f5", borderRadius: "0px" }}
              >
                <span className="text-[22px] leading-none">{obj.icon}</span>
                <span className="font-pixel text-[6px] text-[#1a1a2e] text-center leading-tight mt-1 px-1">{obj.title}</span>
                <span className="font-vt text-[11px] text-[#574145] leading-none">{obj.subtitle}</span>
                {obj.id === "race" && (
                  <span className="mt-1 w-12 h-6 bg-[#E10600] border-2 border-black flex items-center justify-center">
                    <span className="font-pixel text-[6px] text-white">F1</span>
                  </span>
                )}
              </div>
              {isNearby && !activePopup && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#FFD500] border-[3px] border-black px-2 py-1 flex items-center gap-1 shadow-[3px_3px_0_#000] whitespace-nowrap z-10">
                  <span className="font-pixel text-[7px] text-black">TEKAN A</span>
                  <span className="w-1.5 h-1.5 bg-black animate-bounce" />
                </div>
              )}
            </div>
          );
        })}

        {/* Player */}
        <div
          className="absolute z-10 transition-none"
          style={{ left: player.x - PLAYER_SIZE / 2, top: player.y - PLAYER_SIZE / 2, width: PLAYER_SIZE, height: PLAYER_SIZE }}
        >
          <div className="relative w-full h-full">
            <Image src="/wedding/sprite-groom-transparent.png" alt="Aldi" width={40} height={40} className="w-full h-full object-contain pixelated drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-black/30 rounded-full blur-[1px]" />
          </div>
          {/* arah indicator kecil */}
          {dir && <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#FFD500]" />}
        </div>

        {/* Truk Logistik (dekor) */}
        <div className="absolute bottom-[18px] left-3 w-20 h-10 bg-[#1a1a2e] border-[3px] border-black flex items-center justify-center">
          <span className="font-pixel text-[6px] text-white">TRUK</span>
        </div>
        <div className="absolute bottom-[18px] right-3 w-20 h-10 bg-white border-[3px] border-black flex items-center justify-center">
          <span className="font-pixel text-[6px] text-black">PODIUM</span>
        </div>
      </div>

      {/* D-Pad Controls — Arcade 8-bit */}
      <div className="shrink-0 w-full bg-[#efeeea] border-t-[4px] border-[#1a1a2e] px-3 py-3 flex items-center justify-between gap-3">
        {/* D-Pad kiri */}
        <div className="flex flex-col items-center gap-1">
          <button
            aria-label="Up"
            onPointerDown={() => startHold("up")}
            onPointerUp={stopHold}
            onPointerLeave={stopHold}
            onTouchStart={(e) => { e.preventDefault(); startHold("up"); }}
            onTouchEnd={stopHold}
            className={`arcade-dpad w-14 h-14 bg-[#fbf9f5] border-[4px] border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] rounded-none grid place-items-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none select-none ${dir === "up" ? "translate-x-[4px] translate-y-[4px] shadow-none bg-[#FFD500]" : ""}`}
          >
            <span className="font-pixel text-[10px]">▲</span>
          </button>
          <div className="flex gap-1">
            <button
              aria-label="Left"
              onPointerDown={() => startHold("left")}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onTouchStart={(e) => { e.preventDefault(); startHold("left"); }}
              onTouchEnd={stopHold}
              className={`arcade-dpad w-14 h-14 bg-[#fbf9f5] border-[4px] border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] rounded-none grid place-items-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${dir === "left" ? "translate-x-[4px] translate-y-[4px] shadow-none bg-[#FFD500]" : ""}`}
            >
              <span className="font-pixel text-[10px]">◀</span>
            </button>
            <button
              aria-label="Down"
              onPointerDown={() => startHold("down")}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onTouchStart={(e) => { e.preventDefault(); startHold("down"); }}
              onTouchEnd={stopHold}
              className={`arcade-dpad w-14 h-14 bg-[#fbf9f5] border-[4px] border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] rounded-none grid place-items-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${dir === "down" ? "translate-x-[4px] translate-y-[4px] shadow-none bg-[#FFD500]" : ""}`}
            >
              <span className="font-pixel text-[10px]">▼</span>
            </button>
            <button
              aria-label="Right"
              onPointerDown={() => startHold("right")}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onTouchStart={(e) => { e.preventDefault(); startHold("right"); }}
              onTouchEnd={stopHold}
              className={`arcade-dpad w-14 h-14 bg-[#fbf9f5] border-[4px] border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] rounded-none grid place-items-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${dir === "right" ? "translate-x-[4px] translate-y-[4px] shadow-none bg-[#FFD500]" : ""}`}
            >
              <span className="font-pixel text-[10px]">▶</span>
            </button>
          </div>
        </div>

        {/* Tengah hint */}
        <div className="flex-1 flex flex-col items-center gap-1 px-2">
          <span className="font-pixel text-[7px] text-[#1a1a2e] text-center leading-tight">PADDOCK<br/>EXPLORE</span>
          <span className="font-vt text-[11px] text-[#574145] text-center leading-none">Gerakkan dengan D-Pad</span>
          {nearbyObj && (
            <span className="font-pixel text-[6px] bg-[#1a1a2e] text-[#FFD500] px-1.5 py-0.5 mt-1 truncate max-w-[110px] text-center">{nearbyObj.title}</span>
          )}
        </div>

        {/* Tombol A kanan */}
        <button
          aria-label="Action A"
          onPointerDown={(e) => { e.preventDefault(); handleAction(); }}
          onTouchStart={(e) => { e.preventDefault(); handleAction(); }}
          onClick={handleAction}
          className={`arcade-btn w-[72px] h-[72px] bg-[#E10600] border-[4px] border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] rounded-none grid place-items-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none shrink-0 ${nearbyId ? "animate-pulse" : "opacity-90"}`}
        >
          <span className="font-pixel text-[18px] text-white leading-none">A</span>
          <span className="font-pixel text-[6px] text-white -mt-1">ACTION</span>
        </button>
      </div>

      {/* Popup retro */}
      {activePopup && activeObj && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] flex items-center justify-center z-30 p-5">
          <div className="retro-card modal-content checkpoint-card w-full max-w-[320px] max-h-[85vh] overflow-y-auto bg-[#fbf9f5]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-pixel text-[7px] bg-[#1a1a2e] text-[#FFD500] px-2 py-1">{activeObj.title}</span>
              <button onClick={() => setActivePopup(null)} className="w-7 h-7 bg-white border-[3px] border-[#1a1a2e] grid place-items-center shadow-[2px_2px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <span className="font-pixel text-[10px]">×</span>
              </button>
            </div>
            <div className="text-center mb-3">
              <span className="text-[28px]">{activeObj.icon}</span>
              <h3 className="font-pixel text-[10px] leading-5 mt-1">{activeObj.title}</h3>
              <p className="font-vt text-[16px] text-[#574145]">{activeObj.subtitle}</p>
              <p className="font-vt text-[13px] text-[#1a1a2e] mt-1">{activeObj.hint}</p>
            </div>

            {activeObj.id === "gallery" && (
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square bg-[#e4e2de] border-[3px] border-[#1a1a2e] overflow-hidden">
                    <Image src="/wedding/Gemini_Generated_Image_cde0a8cde0a8cde0.jpeg" alt="galeri 1" width={150} height={150} className="w-full h-full object-cover pixelated" />
                  </div>
                  <div className="aspect-square bg-[#e4e2de] border-[3px] border-[#1a1a2e] overflow-hidden">
                    <Image src="/wedding/Gemini_Generated_Image_u0r71bu0r71bu0r7.jpeg" alt="galeri 2" width={150} height={150} className="w-full h-full object-cover pixelated" />
                  </div>
                </div>
                <button onClick={() => handlePopupAction("gallery")} className="retro-btn bg-[#ff6b97] text-white w-full py-3 font-pixel text-[8px]">
                  LIHAT GALERI LENGKAP →
                </button>
                <button onClick={() => setActivePopup(null)} className="retro-btn bg-white w-full py-2.5 font-pixel text-[8px]">
                  TUTUP
                </button>
              </div>
            )}

            {activeObj.id === "rsvp" && (
              <div className="flex flex-col gap-2">
                <div className="bg-white border-[3px] border-[#1a1a2e] p-3">
                  <p className="font-vt text-[14px] leading-snug text-[#1a1a2e]">Konfirmasi kehadiran di Paddock. Pilih hadir / tidak, isi nama & ucapan.</p>
                </div>
                <button onClick={() => handlePopupAction("rsvp")} className="retro-btn bg-[#316bf3] text-white w-full py-3 font-pixel text-[8px]">
                  BUKA REGISTRASI →
                </button>
                <button onClick={() => setActivePopup(null)} className="retro-btn bg-white w-full py-2.5 font-pixel text-[8px]">
                  TUTUP
                </button>
              </div>
            )}

            {activeObj.id === "wishes" && (
              <div className="flex flex-col gap-2">
                <div className="bg-[#e8ddff] border-[3px] border-[#1a1a2e] p-3">
                  <p className="font-pixel text-[7px] text-[#21005e]">FAN BOARD — 3 WISHES</p>
                  <p className="font-vt text-[13px] text-[#1a1a2e] mt-1">“Selamat balapan mengarungi bahtera rumah tangga! #AlQiSAH” — Rian & Sarah</p>
                </div>
                <button onClick={() => handlePopupAction("wishes")} className="retro-btn bg-[#a88cfb] text-white w-full py-3 font-pixel text-[8px]">
                  TULIS DOA RESTU →
                </button>
                <button onClick={() => setActivePopup(null)} className="retro-btn bg-white w-full py-2.5 font-pixel text-[8px]">
                  TUTUP
                </button>
              </div>
            )}

            {activeObj.id === "gift" && (
              <div className="flex flex-col gap-2">
                <div className="bg-white border-[3px] border-[#1a1a2e] p-3 flex flex-col gap-2">
                  <span className="font-pixel text-[7px] bg-[#FFD500] text-black px-2 py-1 self-start">TROFI SPONSOR — AMPLOP DIGITAL</span>
                  <div className="retro-detail-row">
                    <span className="font-pixel text-[7px]">BANK BCA</span>
                    <span className="font-vt text-[15px]">1234 5678 9012 a.n. Aldi Santoso</span>
                  </div>
                  <div className="retro-detail-row">
                    <span className="font-pixel text-[7px]">BANK MANDIRI</span>
                    <span className="font-vt text-[15px]">9876 5432 1098 a.n. Qisti Fadilah</span>
                  </div>
                  <p className="font-vt text-[12px] text-[#574145]">Kado fisik: Hotel Indies Style, Bandung (titip panitia).</p>
                </div>
                <button onClick={() => setActivePopup(null)} className="retro-btn bg-[#ffd93d] w-full py-3 font-pixel text-[8px] text-black">
                  SALIN REKENING
                </button>
                <button onClick={() => setActivePopup(null)} className="retro-btn bg-white w-full py-2.5 font-pixel text-[8px]">
                  TUTUP
                </button>
              </div>
            )}

            {activeObj.id === "race" && (
              <div className="flex flex-col gap-2">
                <div className="bg-black text-white border-[3px] border-[#FFD500] p-3 text-center">
                  <p className="font-pixel text-[8px] text-[#FFD500]">PIT → START GRID</p>
                  <p className="font-vt text-[16px] mt-1">Masuk Mode Balapan? Lewati 3 checkpoint untuk Victory!</p>
                </div>
                <button onClick={() => handlePopupAction("race")} className="retro-btn bg-[#E10600] text-white w-full py-3 font-pixel text-[8px]">
                  GAS KE RACE 🏎️
                </button>
                <button onClick={() => setActivePopup(null)} className="retro-btn bg-white w-full py-2.5 font-pixel text-[8px]">
                  TETAP DI PADDOCK
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
