"use client";

import { useState } from "react";
import Image from "next/image";
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
  key: InvitationSection | "game";
  label: string;
  icon: string;
  isGame?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { key: "couple", label: "Mempelai", icon: "/wedding/nav-heart.png" },
  { key: "event", label: "Acara", icon: "/wedding/nav-star.png" },
  { key: "gallery", label: "Gallery", icon: "/wedding/nav-frame.png" },
  { key: "rsvp", label: "RSVP", icon: "/wedding/nav-envelope.png" },
  { key: "game", label: "Game F1", icon: "/wedding/nav-play.png", isGame: true },
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
        return <CoverSection onOpen={() => navigateTo("couple")} />;
      case "couple":
        return <CoupleSection onOpenGame={handleSelectGame} />;
      case "event":
        return <EventSection />;
      case "gallery":
        return <GallerySection />;
      case "rsvp":
        return <RsvpSection />;
      default:
        return <CoupleSection onOpenGame={handleSelectGame} />;
    }
  };

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-[#101726] overflow-hidden">
      {/* Main Responsive Device Container */}
      <div className="relative w-full max-w-[400px] h-full sm:h-[100dvh] sm:max-h-[860px] flex flex-col bg-white overflow-hidden sm:rounded-2xl sm:border-4 sm:border-[#1e3a8a] sm:shadow-[6px_6px_0px_#1e3a8a]">
        {/* GAME MODE */}
        {mode === "game" && (
          <div className="relative w-full h-full flex flex-col">
            {/* Back button */}
            <div className="absolute top-2 left-2 z-30">
              <button
                onClick={() => {
                  audioManager.playClick();
                  setMode("invitation");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#87ceeb] text-[#1e3a8a] pixel-btn text-[9px] cursor-pointer font-pixel"
              >
                <span>←</span>
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

        {/* MODE SELECTOR */}
        {mode === "selector" && (
          <ModeSelector
            onSelectInvitation={handleSelectInvitation}
            onSelectGame={handleSelectGame}
          />
        )}

        {/* INVITATION MODE */}
        {mode === "invitation" && (
          <div className="relative w-full h-full flex flex-col">
            {/* Content Area */}
            <div
              className={`w-full flex-1 overflow-y-auto ${
                currentSection !== "cover" ? "pb-20" : ""
              }`}
            >
              {renderInvitationSection()}
            </div>

            {/* Bottom Y2K Pixel Nav Bar */}
            {currentSection !== "cover" && (
              <nav className="absolute bottom-0 left-0 right-0 bg-[#ffb6c1] border-t-4 border-[#f08080] flex justify-around items-center pt-2 pb-safe px-2 z-30 shadow-lg">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    item.key === currentSection && mode === "invitation";
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        if (item.isGame) {
                          handleSelectGame();
                        } else {
                          navigateTo(item.key as InvitationSection);
                        }
                      }}
                      className={`flex flex-col items-center gap-1 px-2 py-1 rounded cursor-pointer transition-all ${
                        isActive
                          ? "bg-white pixel-box scale-105"
                          : "hover:bg-white/40 active:scale-95"
                      }`}
                    >
                      <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={32}
                          height={32}
                          className="pixelated object-contain"
                        />
                      </div>
                      <span
                        className="text-[8px] text-[#1e3a8a] font-bold font-pixel"
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
