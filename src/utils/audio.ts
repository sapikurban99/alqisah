"use client";

class RetroAudioManager {
  private ctx: AudioContext | null = null;
  private isBgmPlaying = false;
  private bgmTimeout: NodeJS.Timeout | null = null;
  private isMuted = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isBgmPlaying && !this.isMuted;
  }

  // 8-bit Chiptune Melody for Wedding (Canon in D / Cheerful Arcade)
  public startBgm() {
    if (this.isBgmPlaying || this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    this.playMelodyLoop(0);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  private playMelodyLoop(step: number) {
    if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;

    // Frequencies for pleasant chiptune melody
    const melody = [
      { note: 261.63, dur: 0.25 }, // C4
      { note: 329.63, dur: 0.25 }, // E4
      { note: 392.0, dur: 0.25 },  // G4
      { note: 523.25, dur: 0.5 },  // C5
      { note: 493.88, dur: 0.25 }, // B4
      { note: 440.0, dur: 0.25 },  // A4
      { note: 392.0, dur: 0.5 },   // G4
      { note: 349.23, dur: 0.25 }, // F4
      { note: 329.63, dur: 0.25 }, // E4
      { note: 293.66, dur: 0.5 },  // D4
      { note: 329.63, dur: 0.25 }, // E4
      { note: 392.0, dur: 0.25 },  // G4
      { note: 523.25, dur: 0.75 }, // C5
    ];

    const current = melody[step % melody.length];
    const now = this.ctx.currentTime;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(current.note, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + current.dur * 0.85);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + current.dur * 0.9);
    } catch {
      // Ignore audio interruption
    }

    const nextStep = (step + 1) % melody.length;
    this.bgmTimeout = setTimeout(() => {
      this.playMelodyLoop(nextStep);
    }, current.dur * 1000);
  }

  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }
}

export const audioManager = new RetroAudioManager();
