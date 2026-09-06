"use client";

import { useState } from "react";
import ModeSelector from "./ModeSelector";
import CoverSection from "./CoverSection";
import CoupleSection from "./CoupleSection";
import EventSection from "./EventSection";
import GallerySection from "./GallerySection";
import GameSection from "./GameSection";
import RsvpSection from "./RsvpSection";
import { audioManager } from "@/utils/audio";

type Mode = "selector" | "invitation" | "game";
type InvitationSection = "cover" | "couple" | "event" | "gallery" | "rsvp";

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
    <div className="mobile-wrapper sm:my-6 sm:rounded-2xl">
      {/* Inner device shell — retains 440 but now constrained by 480 wrapper */}
      <div className="relative w-full flex-1 min-h-[100dvh] sm:min-h-[860px] sm:max-h-[860px] flex flex-col bg-white sm:rounded-2xl overflow-hidden">
        {/* GAME MODE — dark canvas inside pastel shell */}
        {mode === "game" && (
          <div className="relative w-full h-full flex flex-col bg-[#fbf9f5]">
            <div className="absolute top-3 left-3 z-30">
              <button
                onClick={() => {
                  audioManager.playClick();
                  setMode("invitation");
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-white text-[#1b1c1a] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-xs font-rubik font-bold border border-[#efeeea] active:scale-[0.98] transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>UNDANGAN</span>
              </button>
            </div>
            <GameSection
              onFinished={() => {
                setMode("invitation");
                setCurrentSection("rsvp");
              }}
            />
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
          <div className="relative w-full h-full flex flex-col bg-[#fbf9f5] main-content">
            <div
              key={currentSection}
              className={`w-full flex-1 overflow-y-auto animate-section-in bg-[#fbf9f5] scrollbar-none main-content ${
                currentSection !== "cover" ? "pb-24" : ""
              }`}
              style={{ scrollbarWidth: "none" }}
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
