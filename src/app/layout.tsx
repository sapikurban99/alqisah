import type { Metadata, Viewport } from "next";
import { Courier_Prime, Press_Start_2P } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "The Grand Prix to Forever - Aldi & Qisty | #AlQiSAH",
  description:
    "Undangan Pernikahan & 16-Bit Retro Arcade Racing Game - Aldi & Qisty",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${courierPrime.variable} ${pixelFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#1a1a2e] font-mono text-slate-800 selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
