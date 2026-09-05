import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Aldi & Qisti — Grand Prix to Forever | #AlQiSAH",
  description:
    "Undangan Pernikahan Neo-Brutalist F1 — Aldi & Qisti, Minggu 8 November 2026, Hotel Indies Style Bandung",
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
      className={`${display.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#111111] font-sans text-[#111111] selection:bg-[#FFD500] selection:text-black">
        {children}
      </body>
    </html>
  );
}
