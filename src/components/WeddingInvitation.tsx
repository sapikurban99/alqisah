"use client";

import { useState } from "react";
import ModeSelector from "./ModeSelector";
import CoverSection from "./CoverSection";
import CoupleSection from "./CoupleSection";
import EventSection from "./EventSection";
import GallerySection from "./GallerySection";
import GameSection from "./GameSection";
import PaddockGame from "./PaddockGame";
import RsvpSection from "./RsvpSection";
import { audioManager } from "@/utils/audio";

type Mode = "selector" | "invitation" | "game";
type InvitationSection = "cover" | "couple" | "event" | "gallery" | "rsvp";
type GameSubMode = "paddock" | "race";

interface NavItem {
  key: InvitationSection;
  label: string;
  icon: string; // material symbol name
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: "couple", label: "Racers", icon: "favorite", path: "pixel-racers" },
  { key: "event", label: "Pit Stop", icon: "calendar_today", path: "quest-schedule" },
  { key: "gallery", label: "Gallery", icon: "photo_camera", path: "memory-gallery" },
  { key: "rsvp", label: "RSVP", icon: "mark_email_unread", path: "rsvp-portal" },
];

export default function WeddingInvitation() {
  const [mode, setMode] = useState<Mode>("selector");
  const [currentSection, setCurrentSection] =
    useState<InvitationSection>("cover");
  const [gameSubMode, setGameSubMode] = useState<GameSubMode>("paddock");

  const handleSelectInvitation = () => {
    audioManager.playClick();
    setMode("invitation");
    setCurrentSection("couple");
  };

  const handleBackToSelector = () => {
    audioManager.playClick();
    setMode("selector");
  };

  const handleSelectGame = () => {
    audioManager.playClick();
    setGameSubMode("paddock");
    setMode("game");
  };

  const navigateTo = (section: InvitationSection) => {
    audioManager.playClick();
    setMode("invitation");
    setCurrentSection(section);
  };

  const renderInvitationSection = () => {
    switch (currentSection) {
      case "cover":
        return <CoverSection onOpen={() => navigateTo("couple")} onPlayGame={handleSelectGame} />;
      case "couple":
        return <CoupleSection onNext={() => navigateTo("event")} onRsvp={() => navigateTo("rsvp")} />;
      case "event":
        return <EventSection />;
      case "gallery":
        return <GallerySection onNext={() => navigateTo("rsvp")} />;
      case "rsvp":
        return <RsvpSection />;
      default:
        return <CoupleSection onNext={() => navigateTo("event")} onRsvp={() => navigateTo("rsvp")} />;
    }
  };

  return (
    <div className={`mobile-wrapper sm:my-6 sm:rounded-2xl ${mode === "selector" ? "home-mode" : ""}`} style={mode === "selector" ? { minHeight: "auto", height: "auto" } : undefined}>
      {/* Inner shell — tinggi menyesuaikan konten saat Home, full saat undangan */}
      <div
        className={
          mode === "selector"
            ? "relative w-full h-auto flex flex-col bg-[#fbf9f5] sm:rounded-2xl overflow-hidden home-auto-height"
            : "relative w-full flex-1 min-h-[100dvh] sm:min-h-[860px] sm:max-h-[860px] flex flex-col bg-white sm:rounded-2xl overflow-hidden"
        }
        style={mode === "selector" ? { minHeight: "auto", height: "auto" } : undefined}
      >
        {/* GAME MODE — Dual-Mode (Paddock ↔ Race) */}
        {mode === "game" && (
          <div className="relative w-full h-full flex flex-col bg-[#fbf9f5]">
            {/* Toggle bar — Paddock / Race + Exit ke Undangan (fallback tamu sepuh) */}
            <div className="shrink-0 w-full flex items-center justify-between px-2 py-2 bg-[#1a1a2e] border-b-[4px] border-black z-20">
              <button
                onClick={() => {
                  audioManager.playClick();
                  setMode("invitation");
                  setCurrentSection("couple");
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-white text-[#1a1a2e] border-[3px] border-black font-pixel text-[7px] shadow-[3px_3px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                <span className="material-symbols-outlined text-[14px]">arrow_back</span> UNDANGAN
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    audioManager.playClick();
                    setGameSubMode("paddock");
                  }}
                  className={`px-2.5 py-1.5 border-[3px] border-black font-pixel text-[7px] shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    gameSubMode === "paddock" ? "bg-[#FFD500] text-black" : "bg-white text-[#1a1a2e]"
                  }`}
                >
                  PADDOCK
                </button>
                <button
                  onClick={() => {
                    audioManager.playClick();
                    setGameSubMode("race");
                  }}
                  className={`px-2.5 py-1.5 border-[3px] border-black font-pixel text-[7px] shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    gameSubMode === "race" ? "bg-[#E10600] text-white" : "bg-white text-[#1a1a2e]"
                  }`}
                >
                  RACE
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 relative">
              {gameSubMode === "paddock" ? (
                <PaddockGame
                  onSwitchToRace={() => {
                    audioManager.playClick();
                    setGameSubMode("race");
                  }}
                  onNavigate={(sec) => navigateTo(sec)}
                />
              ) : (
                <GameSection
                  onFinished={() => {
                    setMode("invitation");
                    setCurrentSection("rsvp");
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* MODE SELECTOR — Home Pixel Save The Date */}
        {mode === "selector" && (
          <ModeSelector
            onSelectInvitation={handleSelectInvitation}
            onSelectGame={handleSelectGame}
          />
        )}

        {/* INVITATION MODE */}
        {mode === "invitation" && (
          <div className="relative w-full h-full flex flex-col bg-[#fbf9f5]">
            <div
              key={currentSection}
              className="w-full flex-1 overflow-y-auto animate-section-in bg-[#fbf9f5] scrollbar-none main-content"
              style={{ scrollbarWidth: "none", paddingBottom: "90px" }}
            >
              {renderInvitationSection()}
            </div>

            {/* Bottom Nav — PRD: fixed bottom 0 width 100% max-width 480 centered, z-50 */}
            {currentSection !== "cover" && (
              <nav className="bottom-nav pb-safe">
                <div className="flex items-center justify-around h-16 px-1">
                  <button
                    onClick={handleBackToSelector}
                    className="flex flex-col items-center justify-center min-w-[56px] h-12 px-2 rounded-lg text-[#574145] hover:text-[#ad2b58] transition-all"
                    aria-label="Home"
                  >
                    <span className="material-symbols-outlined text-[22px]">cottage</span>
                    <span className="font-rubik text-[10px] font-bold mt-0.5 tracking-wide">Home</span>
                  </button>
                  {NAV_ITEMS.map((item) => {
                    const isActive = item.key === currentSection;
                    return (
                      <button
                        key={item.key}
                        onClick={() => navigateTo(item.key)}
                        className={`flex flex-col items-center justify-center min-w-[56px] h-12 px-2 rounded-lg transition-all ${
                          isActive
                            ? "bg-[#ff6b97]/25 text-[#ad2b58] font-bold shadow-[0_2px_8px_rgba(255,107,151,0.25)] scale-105"
                            : "text-[#574145] hover:text-[#ad2b58]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="material-symbols-outlined text-[22px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                          {item.icon}
                        </span>
                        <span className="font-rubik text-[10px] font-semibold mt-0.5 tracking-wide">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
