"use client";

import GameSection from "./GameSection";

export default function WeddingGame() {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-[430px] h-[100dvh] max-h-[850px] overflow-hidden rounded-2xl shadow-2xl border-4 border-slate-700">
        <GameSection onFinished={() => alert("Lanjut ke undangan!")} />
      </div>
    </div>
  );
}
