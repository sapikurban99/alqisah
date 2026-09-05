"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

type GameState = "start" | "playing" | "checkpoint" | "end";

interface Player {
  x: number;
  y: number;
  vy: number;
  gravity: number;
  jumpPower: number;
  isJumping: boolean;
}

type ObstacleType = "cone" | "tires" | "sign" | "flag" | "light";

type SceneryType = "text" | ObstacleType | "finish" | "checkpoint";

interface SceneryItem {
  type: SceneryType;
  x: number;
  text1?: string;
  text2?: string;
  checkpointId?: number;
}

interface CheckpointData {
  id: number;
  distance: number;
  icon: string;
  title: string;
  subtitle: string;
  details: { label: string; value: string }[];
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  vRot: number;
}

const CANVAS_W = 380;
const CANVAS_H = 640;
const GROUND_Y = 460;
const INITIAL_SPEED = 4.8;
const FINISH_DISTANCE = 5200;

const CHECKPOINTS: CheckpointData[] = [
  {
    id: 1,
    distance: 1200,
    icon: "&#128197;",
    title: "Tanggal Pernikahan",
    subtitle: "Save The Date!",
    details: [
      { label: "Hari", value: "Jumat Kliwon" },
      { label: "Tanggal", value: "18 September 2026" },
      { label: "Waktu", value: "08:00 - 14:00 WIB" },
    ],
    color: "#ff6b9d",
  },
  {
    id: 2,
    distance: 2400,
    icon: "&#127963;",
    title: "Lokasi Acara",
    subtitle: "Monte Carlo Chapel",
    details: [
      { label: "Akad Nikah", value: "08:00 WIB" },
      { label: "Resepsi", value: "11:00 WIB" },
      { label: "Tempat", value: "Chapel of Sacred Vows" },
      { label: "Alamat", value: "123 Somewhere Street" },
    ],
    color: "#ffd93d",
  },
  {
    id: 3,
    distance: 3600,
    icon: "&#128149;",
    title: "Mempelai",
    subtitle: "The Happy Couple",
    details: [
      { label: "Mempelai Pria", value: "Aldi" },
      { label: "Mempelai Wanita", value: "Qisty" },
      { label: "Tagline", value: "#AlQiSAH" },
    ],
    color: "#6bcb77",
  },
];

const INITIAL_SCENERY: SceneryItem[] = [
  // Checkpoint 1 marker
  { type: "checkpoint", x: 1150, checkpointId: 1 },
  { type: "text", x: 1200, text1: "CHECKPOINT 1", text2: "TANGGAL NIKAH" },
  // Checkpoint 2 marker
  { type: "checkpoint", x: 2350, checkpointId: 2 },
  { type: "text", x: 2400, text1: "CHECKPOINT 2", text2: "LOKASI ACARA" },
  // Checkpoint 3 marker
  { type: "checkpoint", x: 3550, checkpointId: 3 },
  { type: "text", x: 3600, text1: "CHECKPOINT 3", text2: "THE COUPLE" },
  // Obstacles between checkpoints
  { type: "cone", x: 600 },
  { type: "tires", x: 900 },
  { type: "cone", x: 1500 },
  { type: "sign", x: 1800 },
  { type: "tires", x: 2100 },
  { type: "flag", x: 2700 },
  { type: "cone", x: 3000 },
  { type: "light", x: 3300 },
  { type: "tires", x: 3900 },
  { type: "cone", x: 4200 },
  { type: "sign", x: 4500 },
  { type: "flag", x: 4800 },
  { type: "finish", x: FINISH_DISTANCE },
];

interface GameSectionProps {
  onFinished: () => void;
}

export default function GameSection({ onFinished }: GameSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const imagesRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const imagesLoadedRef = useRef(false);

  const gameStateRef = useRef<GameState>("start");
  const gameSpeedRef = useRef(INITIAL_SPEED);
  const frameCountRef = useRef(0);
  const distanceTravelledRef = useRef(0);
  const soundEnabledRef = useRef(true);
  const currentCheckpointRef = useRef<number | null>(null);
  const passedCheckpointsRef = useRef<Set<number>>(new Set());

  const sceneryRef = useRef<SceneryItem[]>(
    INITIAL_SCENERY.map((s) => ({ ...s }))
  );

  const playerRef = useRef<Player>({
    x: 40,
    y: GROUND_Y,
    vy: 0,
    gravity: 0.72,
    jumpPower: -13.5,
    isJumping: false,
  });

  const particlesRef = useRef<Particle[]>([]);

  const [gameState, setGameState] = useState<GameState>("start");
  const [progressPercent, setProgressPercent] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeCheckpoint, setActiveCheckpoint] = useState<CheckpointData | null>(null);

  // Sound generator
  const playSound = useCallback((type: "jump" | "start" | "victory" | "checkpoint") => {
    if (!soundEnabledRef.current) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === "jump") {
        osc.type = "square";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === "start") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(440, now + 0.1);
        osc.frequency.setValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === "checkpoint") {
        // Checkpoint chime
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          const t = now + idx * 0.12;
          noteOsc.type = "sine";
          noteOsc.frequency.setValueAtTime(freq, t);
          noteGain.gain.setValueAtTime(0.18, t);
          noteGain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
          noteOsc.start(t);
          noteOsc.stop(t + 0.2);
        });
      } else if (type === "victory") {
        const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          const t = now + idx * 0.1;
          noteOsc.type = "square";
          noteOsc.frequency.setValueAtTime(freq, t);
          noteGain.gain.setValueAtTime(0.12, t);
          noteGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
          noteOsc.start(t);
          noteOsc.stop(t + 0.25);
        });
      }
    } catch {
      // Audio context might be restricted
    }
  }, []);

  // Preload assets
  useEffect(() => {
    const assetSources: { [key: string]: string } = {
      bg: "/wedding/f1-monte-carlo-bg.png",
      car: "/wedding/sprite-car-transparent.png",
      tires: "/wedding/obstacle-tires.png",
      cone: "/wedding/obstacle-cone.png",
      sign: "/wedding/obstacle-speed-sign.png",
      flag: "/wedding/obstacle-flag.png",
      light: "/wedding/obstacle-light.png",
      finishArch: "/wedding/f1-finish-line.png",
      podium: "/wedding/f1-podium.png",
    };

    let loadedCount = 0;
    const totalAssets = Object.keys(assetSources).length;

    Object.entries(assetSources).forEach(([key, src]) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        imagesRef.current[key] = img;
        loadedCount++;
        if (loadedCount >= totalAssets) {
          imagesLoadedRef.current = true;
        }
      };
    });
  }, []);

  // Confetti
  const triggerConfetti = useCallback(() => {
    const colors = ["#ff4081", "#ffd700", "#ffffff", "#00e676", "#2979ff", "#ff9100"];
    const particles: Particle[] = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: CANVAS_W / 2 + (Math.random() - 0.5) * 160,
        y: GROUND_Y - 40,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 9 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.2,
      });
    }
    particlesRef.current = particles;
  }, []);

  // Render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameCount = frameCountRef.current;
    const scenery = sceneryRef.current;
    const player = playerRef.current;
    const imgs = imagesRef.current;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background
    if (imgs.bg) {
      const bgW = CANVAS_W * 2.2;
      const bgH = CANVAS_H;
      const bgScroll = (distanceTravelledRef.current * 0.75) % bgW;
      ctx.drawImage(imgs.bg, -bgScroll, 0, bgW, bgH);
      ctx.drawImage(imgs.bg, -bgScroll + bgW - 1, 0, bgW, bgH);
    } else {
      ctx.fillStyle = "#87ceeb";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = "#3a3d45";
      ctx.fillRect(0, GROUND_Y + 20, CANVAS_W, CANVAS_H - GROUND_Y);
    }

    // Scenery & obstacles
    for (const item of scenery) {
      if (item.x < -300 || item.x > CANVAS_W + 300) continue;

      if (item.type === "checkpoint") {
        // Checkpoint archway
        const cp = CHECKPOINTS.find((c) => c.id === item.checkpointId);
        if (cp) {
          const passed = passedCheckpointsRef.current.has(cp.id);
          // Archway pillar left
          ctx.fillStyle = passed ? "#666" : cp.color;
          ctx.fillRect(item.x - 60, GROUND_Y - 120, 16, 140);
          // Archway pillar right
          ctx.fillRect(item.x + 44, GROUND_Y - 120, 16, 140);
          // Archway top
          ctx.fillStyle = passed ? "#888" : cp.color;
          ctx.fillRect(item.x - 60, GROUND_Y - 125, 120, 12);
          // Checkpoint number
          ctx.fillStyle = "#fff";
          ctx.font = "bold 14px 'Courier New', monospace";
          ctx.textAlign = "center";
          ctx.fillText(`CP${cp.id}`, item.x, GROUND_Y - 115);
          // Glow effect when not passed
          if (!passed) {
            ctx.save();
            ctx.globalAlpha = 0.3 + Math.sin(frameCount * 0.08) * 0.2;
            ctx.fillStyle = cp.color;
            ctx.fillRect(item.x - 70, GROUND_Y - 135, 140, 160);
            ctx.restore();
          }
        }
      } else if (item.type === "text") {
        // Pit board banner
        ctx.save();
        const bannerW = 180;
        const bannerH = 48;
        const bx = item.x - bannerW / 2;
        const by = 135;

        ctx.fillStyle = "rgba(15, 20, 28, 0.9)";
        ctx.fillRect(bx, by, bannerW, bannerH);
        ctx.strokeStyle = "rgba(255, 215, 0, 0.6)";
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bannerW, bannerH);

        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 12px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillText(item.text1 ?? "", item.x, by + 18);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 10px 'Courier New', monospace";
        ctx.fillText(item.text2 ?? "", item.x, by + 36);
        ctx.restore();
      } else if (item.type === "cone") {
        if (imgs.cone) ctx.drawImage(imgs.cone, item.x, GROUND_Y + 12, 32, 44);
      } else if (item.type === "tires") {
        if (imgs.tires) ctx.drawImage(imgs.tires, item.x, GROUND_Y + 6, 40, 48);
      } else if (item.type === "sign") {
        if (imgs.sign) ctx.drawImage(imgs.sign, item.x, GROUND_Y - 2, 36, 54);
      } else if (item.type === "flag") {
        if (imgs.flag) ctx.drawImage(imgs.flag, item.x, GROUND_Y - 2, 46, 54);
      } else if (item.type === "light") {
        if (imgs.light) ctx.drawImage(imgs.light, item.x, GROUND_Y - 4, 34, 56);
      } else if (item.type === "finish") {
        if (imgs.finishArch) ctx.drawImage(imgs.finishArch, item.x, GROUND_Y - 170, 140, 230);
        if (imgs.podium) ctx.drawImage(imgs.podium, item.x + 130, GROUND_Y - 145, 180, 200);
      }
    }

    // Player car
    const carImg = imgs.car;
    const bounceY = player.isJumping
      ? player.y
      : player.y + Math.sin(frameCount * 0.25) * 1.5;

    if (gameStateRef.current === "playing" && !player.isJumping) {
      if (frameCount % 3 === 0) {
        ctx.fillStyle = "rgba(230, 235, 245, 0.4)";
        ctx.beginPath();
        ctx.arc(player.x - 8, GROUND_Y + 45, 4 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (carImg) {
      ctx.drawImage(carImg, player.x - 20, bounceY - 10, 160, 80);
    } else {
      ctx.fillStyle = "#e53935";
      ctx.fillRect(player.x, player.y + 10, 80, 30);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(player.x + 20, player.y, 40, 15);
      ctx.fillStyle = "#111111";
      ctx.beginPath();
      ctx.arc(player.x + 15, player.y + 40, 10, 0, Math.PI * 2);
      ctx.arc(player.x + 65, player.y + 40, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    // Confetti
    if (particlesRef.current.length > 0) {
      for (const p of particlesRef.current) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    }

    // HUD
    if (gameStateRef.current === "playing" || gameStateRef.current === "checkpoint") {
      ctx.save();
      ctx.fillStyle = "rgba(15, 20, 28, 0.85)";
      ctx.fillRect(10, 12, CANVAS_W - 20, 36);
      ctx.strokeStyle = "rgba(255, 215, 0, 0.6)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 12, CANVAS_W - 20, 36);

      ctx.fillStyle = "#ffd700";
      ctx.font = "bold 11px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillText("SPEED: 285 KM/H", 20, 34);

      ctx.fillStyle = "#00e676";
      ctx.textAlign = "right";
      const cpCount = passedCheckpointsRef.current.size;
      ctx.fillText(`LAP 1/1 • CP ${cpCount}/${CHECKPOINTS.length}`, CANVAS_W - 20, 34);

      const pBarX = 170;
      const pBarW = 90;
      const pBarY = 28;
      ctx.fillStyle = "#455a64";
      ctx.fillRect(pBarX, pBarY, pBarW, 4);

      const pct = Math.min(1, distanceTravelledRef.current / FINISH_DISTANCE);
      ctx.fillStyle = "#ff4081";
      ctx.fillRect(pBarX, pBarY, pBarW * pct, 4);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(pBarX + pBarW * pct - 3, pBarY - 2, 6, 8);
      ctx.restore();
    }
  }, []);

  // Update loop
  const update = useCallback(() => {
    const player = playerRef.current;
    const scenery = sceneryRef.current;

    frameCountRef.current++;
    distanceTravelledRef.current += gameSpeedRef.current;

    const pct = Math.min(100, Math.floor((distanceTravelledRef.current / FINISH_DISTANCE) * 100));
    setProgressPercent(pct);

    // Physics
    player.vy += player.gravity;
    player.y += player.vy;

    if (player.y >= GROUND_Y) {
      player.y = GROUND_Y;
      player.isJumping = false;
      player.vy = 0;
    }

    // Scroll scenery & check collisions
    for (const item of scenery) {
      item.x -= gameSpeedRef.current;

      // Checkpoint detection
      if (item.type === "checkpoint" && item.checkpointId !== undefined) {
        const cp = CHECKPOINTS.find((c) => c.id === item.checkpointId);
        if (
          cp &&
          !passedCheckpointsRef.current.has(cp.id) &&
          item.x <= player.x + 70
        ) {
          // Trigger checkpoint!
          passedCheckpointsRef.current.add(cp.id);
          currentCheckpointRef.current = cp.id;
          gameSpeedRef.current = 0;
          gameStateRef.current = "checkpoint";
          setGameState("checkpoint");
          setActiveCheckpoint(cp);
          playSound("checkpoint");
          return;
        }
      }

      // Finish detection
      if (item.type === "finish" && item.x <= player.x + 70) {
        gameSpeedRef.current = 0;
        if (player.y === GROUND_Y) {
          gameStateRef.current = "end";
          setGameState("end");
          triggerConfetti();
          playSound("victory");
        }
      }
    }

    // Update confetti
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.rotation += p.vRot;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.y < CANVAS_H + 20);
    }
  }, [triggerConfetti, playSound]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameStateRef.current === "playing") {
      update();
    }
    render();
    if (gameStateRef.current !== "end") {
      animFrameRef.current = requestAnimationFrame(gameLoop);
    }
  }, [update, render]);

  // Continue after checkpoint
  const continueFromCheckpoint = useCallback(() => {
    setActiveCheckpoint(null);
    gameStateRef.current = "playing";
    setGameState("playing");
    gameSpeedRef.current = INITIAL_SPEED;
    gameLoop();
  }, [gameLoop]);

  // Jump handler
  const handleJump = useCallback(
    (e?: React.MouseEvent | React.TouchEvent | KeyboardEvent) => {
      if (e && "preventDefault" in e) e.preventDefault();
      const player = playerRef.current;
      if (gameStateRef.current === "playing" && !player.isJumping) {
        player.vy = player.jumpPower;
        player.isJumping = true;
        playSound("jump");
      }
    },
    [playSound]
  );

  // Start handler
  const startGame = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      gameStateRef.current = "playing";
      setGameState("playing");
      playSound("start");
      gameLoop();
    },
    [gameLoop, playSound]
  );

  // Restart handler
  const restartGame = useCallback(() => {
    distanceTravelledRef.current = 0;
    frameCountRef.current = 0;
    gameSpeedRef.current = INITIAL_SPEED;
    sceneryRef.current = INITIAL_SCENERY.map((s) => ({ ...s }));
    playerRef.current.y = GROUND_Y;
    playerRef.current.vy = 0;
    playerRef.current.isJumping = false;
    particlesRef.current = [];
    passedCheckpointsRef.current.clear();
    currentCheckpointRef.current = null;
    gameStateRef.current = "playing";
    setGameState("playing");
    playSound("start");
    gameLoop();
  }, [gameLoop, playSound]);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        handleJump(e);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleJump]);

  // Initial draw
  useEffect(() => {
    render();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [render]);

  return (
    <div className="relative w-full h-full flex flex-col items-center bg-[#1a2332] overflow-hidden select-none">
      {/* Top Header */}
      <div className="w-full shrink-0 flex items-center justify-between px-3 py-2 bg-[#0c1017]/90 border-b border-amber-500/30 text-xs font-mono text-amber-400 z-20">
        <div className="flex items-center gap-1.5 font-bold">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>F1 MONTE CARLO</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const nextVal = !soundEnabled;
              soundEnabledRef.current = nextVal;
              setSoundEnabled(nextVal);
            }}
            className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[10px]"
          >
            {soundEnabled ? "SFX: ON" : "SFX: OFF"}
          </button>
        </div>
      </div>

      {/* Game Canvas */}
      <div
        ref={containerRef}
        className="relative w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden cursor-pointer bg-[#0c1017]"
        onMouseDown={handleJump}
        onTouchStart={handleJump}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="max-w-full max-h-full object-contain"
          style={{ imageRendering: "pixelated", aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
        />

        {/* Jump reminder */}
        {gameState === "playing" && (
          <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none z-10 animate-bounce px-4">
            <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/50 shadow-lg text-amber-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase font-mono text-center">
              TAP TO JUMP!
            </div>
          </div>
        )}

        {/* Start Screen */}
        {gameState === "start" && (
          <div className="absolute inset-0 bg-[#090d16]/85 backdrop-blur-sm flex flex-col items-center justify-center text-center z-30 px-6 py-4 overflow-y-auto">
            <div className="relative mb-2 w-64 h-32">
              <Image
                src="/wedding/sprite-car-transparent.png"
                alt="Aldi & Qisty Wedding F1 Car"
                fill
                className="object-contain pixelated"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-mono font-bold mb-2 uppercase tracking-wider">
              Formula 1 Wedding Edition
            </div>

            <h1 className="text-white text-2xl font-bold tracking-wide mb-1 font-mono">
              ALDI &amp; QISTY
            </h1>
            <p className="text-amber-400 text-sm font-semibold mb-1 font-mono">
              The Grand Prix to Forever
            </p>
            <p className="text-slate-400 text-xs mb-3 font-mono">
              #AlQiSAH • Monte Carlo Street Circuit
            </p>

            <div className="bg-slate-800/60 rounded-lg px-4 py-2 mb-5 text-xs font-mono">
              <p className="text-amber-300 font-bold mb-1">3 Checkpoints to Collect:</p>
              <div className="flex gap-3 text-slate-300">
                <span>1: Tanggal</span>
                <span>2: Lokasi</span>
                <span>3: Couple</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-gradient-to-r from-red-600 to-rose-600 text-white border-2 border-red-400 rounded-xl px-8 py-3.5 font-bold font-mono text-base uppercase tracking-widest shadow-[0_6px_0_#991b1b] hover:brightness-110 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              START RACE &#9654;
            </button>

            <div className="mt-4 text-[11px] text-slate-400 font-mono">
              Guide the wedding car & collect all checkpoints!
            </div>
          </div>
        )}

        {/* Checkpoint Popup */}
        {gameState === "checkpoint" && activeCheckpoint && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-40 px-6 py-4">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-[320px] max-h-full overflow-y-auto"
              style={{ borderTop: `4px solid ${activeCheckpoint.color}` }}
            >
              {/* Header */}
              <div
                className="px-5 pt-5 pb-3 text-center"
                style={{ background: `linear-gradient(135deg, ${activeCheckpoint.color}22, ${activeCheckpoint.color}11)` }}
              >
                <div className="text-4xl mb-2" dangerouslySetInnerHTML={{ __html: activeCheckpoint.icon }} />
                <div
                  className="inline-block px-3 py-0.5 rounded-full text-xs font-bold font-mono text-white mb-2"
                  style={{ backgroundColor: activeCheckpoint.color }}
                >
                  CHECKPOINT {activeCheckpoint.id}
                </div>
                <h3 className="text-lg font-bold font-mono text-slate-800">
                  {activeCheckpoint.title}
                </h3>
                <p className="text-sm text-slate-500 font-mono">
                  {activeCheckpoint.subtitle}
                </p>
              </div>

              {/* Details */}
              <div className="px-5 py-4">
                <div className="space-y-2">
                  {activeCheckpoint.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0"
                    >
                      <span className="text-xs text-slate-400 font-mono uppercase tracking-wide">
                        {detail.label}
                      </span>
                      <span className="text-sm font-bold text-slate-700 font-mono text-right ml-3 break-words">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              <div className="px-5 pb-5">
                <button
                  onClick={continueFromCheckpoint}
                  className="w-full py-3 rounded-xl font-bold font-mono text-sm uppercase tracking-wider text-white transition-all active:scale-[0.98]"
                  style={{ backgroundColor: activeCheckpoint.color }}
                >
                  Lanjutkan Race &#9654;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Victory Screen */}
        {gameState === "end" && (
          <div className="absolute inset-0 bg-[#070b12]/90 backdrop-blur-md flex flex-col items-center justify-center text-center z-30 px-6 py-4 overflow-y-auto">
            <div className="relative mb-1 w-52 h-28">
              <Image
                src="/wedding/f1-podium.png"
                alt="Winner's Podium"
                fill
                className="object-contain pixelated"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-mono font-bold mb-2">
              &#127942; P1 WINNER • GRAND PRIX OF LOVE
            </div>

            <h2 className="text-white text-2xl font-bold mb-1 font-mono">
              VICTORY LAP COMPLETE!
            </h2>
            <p className="text-amber-200 text-sm font-semibold mb-1 font-mono">
              Aldi &amp; Qisty Reached The Podium!
            </p>
            <p className="text-slate-300 text-xs max-w-xs mb-4 font-mono leading-relaxed">
              Semua checkpoint sudah terkumpul! Silakan konfirmasi kehadiran Anda!
            </p>

            {/* Collected checkpoints summary */}
            <div className="flex gap-2 mb-5">
              {CHECKPOINTS.map((cp) => (
                <div
                  key={cp.id}
                  className="flex flex-col items-center bg-white/10 rounded-lg px-3 py-2"
                >
                  <div className="text-lg" dangerouslySetInnerHTML={{ __html: cp.icon }} />
                  <span className="text-[10px] text-slate-300 font-mono mt-1">
                    CP{cp.id}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 w-full max-w-xs">
              <button
                onClick={onFinished}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-2 border-emerald-400 rounded-xl py-3.5 font-bold font-mono text-sm uppercase tracking-wider shadow-[0_5px_0_#065f46] hover:brightness-110 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                Lanjut ke RSVP &amp; Undangan &#10140;
              </button>

              <button
                onClick={restartGame}
                className="w-full bg-slate-800 text-slate-200 border border-slate-600 rounded-xl py-2.5 font-bold font-mono text-xs uppercase tracking-wider hover:bg-slate-700 transition-colors cursor-pointer"
              >
                &#8634; Main Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
