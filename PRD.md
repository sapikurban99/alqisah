# PRD — Sistem Dual-Mode Mini Game (Tema F1 Retro Pixel) — AlQiSAH

> Per 7 Sep 2026 — Revamp dari taman → sirkuit F1. Dokumen ini mengikat `src/components/PaddockGame.tsx`, `GameSection.tsx`, `WeddingInvitation.tsx`, `globals.css` dan `ModeSelector.tsx`.

## 1) Konsep Utama — The Grand Prix Experience

Game undangan dibagi dua mode yang saling terhubung tematik + fallback web untuk tamu sepuh.

- **Mode 1 — The Paddock (Eksplorasi / Jalan-jalan):** santai, gerakkan karakter pixel Aldi/Qisti di Pit Lane, interaksi objek → buka informasi pernikahan.
- **Mode 2 — The Race (Balapan):** aksi runner pseudo-3D/Outrun, lewati 3 checkpoint → Garis Finish (Resepsi) → Victory podium.
- **Fallback Web (Non-Game):** toggle di `ModeSelector` / `WeddingInvitation` → langsung baca 5 halaman card-based (Cover / Player Select / Pit Stop / Gallery / RSVP) tanpa masuk game.

State routing: `WeddingInvitation` owns `Mode = "selector" | "invitation" | "game"`; di dalam `game`, `DualModeGame` owns `SubMode = "paddock" | "race"`. Transisi Paddock→Race via NPC mobil parkir (A) atau toggle header. Transisi Game→Invitation via `onFinished` ke RSVP.

## 2) Revamp Mode 1 — The Paddock (Eksplorasi)

### 2.1 Aset Peta (reskin taman → sirkuit)

| Lama (taman) | Baru (F1 Pit Lane) | Visual |
|---|---|---|
| Jalan tanah/rumput | Aspal sirkuit `#2b2e3a` + garis pit putih/kuning, lantai beton Pit Lane `#d9d7d3` | Tile 16px, grid dot, border pit |
| Rumah/Gedung | Pit Garage (pintu garasi hitam/kuning, nomor 07/08) | Kotak `bg-[#1a1a2e]` + pintu bergaris |
| Pohon Galeri / Kolam | Papan Skor Elektronik (`SCOREBOARD`), Podium, Truk Logistik Tim | Panel LED amber, podium steps |

Map container: `380×640` (sama resolusi Race), `image-rendering: pixelated`, `max-w-full`, `box-sizing:border-box`.

### 2.2 Interaksi Objek → Mapping Konten

| Objek Paddock (baru) | Sumber Lama | Aksi | Target |
|---|---|---|---|
| **Tenda Pit Stop** ⛺ `id:gallery` | Pohon Galeri (Video) | Buka galeri foto | `onOpenGallery()` → `GallerySection` / lightbox mini |
| **Meja Registrasi Paddock** 📋 `id:rsvp` | Meja Reservasi | Buka form RSVP | `onOpenRsvp()` → `RsvpSection` |
| **Papan Penggemar (Fan Board)** 💬 `id:wishes` | Kolam Doa | Buka form + daftar ucapan | `onOpenWishes()` → feed `RsvpSection.wishes` |
| **Trofi / Peti Sponsor** 🏆 `id:gift` | Peti Hadiah | Buka Amplop Digital / Kado | `onOpenGift()` → panel rekening + QR |
| **Mobil F1 Parkir** 🏎️ `id:race` | — (baru) | Ganti mode ke Race | `onSwitchToRace()` |

Trigger: jarak player < 56px → tampil prompt `TEKAN A`; tekan `A` (keyboard `Space/Enter` atau tombol arcade) → `setActivePopup(id)`, pause movement, tampil `.retro-card`.

### 2.3 Kontroler (UI D-Pad) — Arcade 8-bit

Semua kontrol di `PaddockGame` (Race tetap tap/spasi, tapi share style):

```css
.arcade-dpad, .arcade-btn {
  border: 4px solid #1a1a2e;
  box-shadow: 4px 4px 0px #1a1a2e;
  border-radius: 0px;
  background: #fbf9f5; /* atau #FFD500 untuk A */
  width: 56px; height: 56px;
  display: grid; place-items: center;
  font-family: var(--font-press-start);
  font-size: 10px;
  transition: transform 0.08s, box-shadow 0.08s;
}
.arcade-btn:active, .arcade-dpad:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}
```

Layout D-Pad: cross (↑ di atas, ← → di tengah, ↓ di bawah) + tombol `A` merah kotak di kanan. `touch-action: manipulation`, `user-select:none`, `min 48px` target.

### 2.4 UI Popup Interaksi — Card-Based Retro Pixel

Hapus kayu. Semua popup (Paddock & Race) pakai global:

```css
.retro-card, .modal-content, .checkpoint-card {
  border: 4px solid #1a1a2e;
  box-shadow: 8px 8px 0px rgba(26,26,46,1);
  border-radius: 0px;
  padding: 20px;
  width: 100%; max-width: 320px;
  box-sizing: border-box;
  overflow-wrap: break-word;
}
.retro-detail-row { flex-direction: column; width:100%; word-wrap:break-word; white-space:normal; }
.retro-btn { border:4px solid #1a1a2e; box-shadow:4px 4px 0 #1a1a2e; margin-bottom:12px; border-radius:0; }
.retro-btn:active { transform:translate(4px,4px); box-shadow:none; }
```

Tipografi:
- Header/judul (`CHECKPOINT 1`, `LOKASI ACARA`, `MEMPELAI`, `TROFI`, `VICTORY`) → `font-pixel` = `Press Start 2P` (`--font-press-start`)
- Isi data (waktu, alamat `Jl. Kebon Jati No.32…`, nama) → `font-vt` = `VT323` (`--font-vt323`)
- Semua span di `.retro-card` → `word-wrap:break-word; white-space:normal; width:100%; max-width:100%` cegah overflow kanan.

Warna solid tanpa gradasi: kuning `#FFD500`, hitam `#1a1a2e`, merah `#E10600`, biru `#0051d5`, pink pastel `#ff6b97`, putih tulang `#fbf9f5` — senada 8-bit.

## 3) Revamp Mode 2 — The Race (Balapan)

- **Visual Mobil:** `sprite-car-transparent.png` (convertible merah) `160×80`, `pixelated`, bounce `sin`.
- **Lintasan:** runner side-scroller pseudo-3D (parallax `f1-monte-carlo-bg.png` + `obstacle-*` + `f1-finish-line.png`), `CANVAS_W 380 × 640`, `GROUND_Y 460`, `INITIAL_SPEED 4.8`, `FINISH_DISTANCE 5200`.
- **Checkpoints:** `CP1` jarak 1200 (Tanggal Nikah), `CP2` 2400 (Lokasi & Maps `https://maps.app.goo.gl/AKG3KbeNVdVBsvLR6` — alamat `Jl. Kebon Jati No.32…` panjang, pakai `retro-detail-row` column agar tidak overflow), `CP3` 3600 (Mempelai). Saat `item.x <= player.x+70` → `gameSpeed=0`, `state=checkpoint`, popup `.retro-card` pause.
- **Layar Finish:** `f1-podium.png` + `VICTORY LAP COMPLETE` + `P1 GRAND PRIX OF LOVE` + `KE RSVP →` / `MAIN LAGI`, sama `.retro-card` style.
- **HUD:** `SPEED 285 KM/H`, progress bar pink `#ff4081`, `CP x/3` — `Courier New` fallback, tapi header popup tetap Press Start 2P.

Sudah global retro di `globals.css` untuk semua popup (CP1-3, Victory/Finish, Start) — verifikasi `border 4px #1a1a2e`, `box-shadow 8px`, `radius 0`, `padding 20px`, `width 100%`.

## 4) Transisi Antar Mode

- **Paddock → Race:** dekat mobil F1 parkir (kanan-bawah) → prompt `TEKAN A UNTUK RACE` → `A` → `setSubMode("race")`, reset Race state, `playSound("start")`.
- **Race → Paddock:** header toggle `PADDOCK` / `RACE` di `DualModeGame` + tombol `🏁 PADDOCK` di Victory/Start screen. Juga `onFinished` dari Race → `WeddingInvitation` ke `invitation/rsvp` (fallback web).
- **Luar Game (Tamu Sepuh):** `ModeSelector` — `BUKA UNDANGAN` → `invitation/couple` (web biasa, tanpa game), `PLAY MINI GAME` → `game/paddock` (default). Di `WeddingInvitation` header Game juga ada `UNDANGAN` untuk keluar total. Ini toggle utama untuk non-gamer.

## 5) Prompt Developer (OpenCode/Cursor) — UI Game

> "Tolong reskin UI kontroler (D-Pad dan tombol A) pada game engine HTML5 ini. Ubah desain tombol bulat standar menjadi tombol kotak bergaya arcade 8-bit dengan `border: 4px solid #1a1a2e; box-shadow: 4px 4px 0px #1a1a2e;` `border-radius:0px;` `margin-bottom:12px;` `active {transform: translate(4px,4px); box-shadow:none;}`. Selain itu, ubah class CSS untuk semua dialogue box / popup yang muncul saat pemain berinteraksi dengan objek. Hapus aset latar belakang kayu, ganti dengan desain `.retro-card` (`background: #fbf9f5` atau `inherit` + `border 4px solid #1a1a2e;` `box-shadow 8px 8px 0 rgba(26,26,46,1);` `border-radius:0; padding:20px; width:100%; max-width:320px;` `overflow-wrap:break-word;`), gunakan `font Press Start 2P` untuk judul dan `VT323` untuk isi teks, pastikan tiap baris detail `flex-direction:column` + `word-wrap:break-word; white-space:normal; width:100%; max-width:100%` agar alamat panjang tidak overflow."

## 6) Kriteria Selesai (DoD)

- [ ] `PaddockGame.tsx` ada, jalan aspal/beton, 4 garasi/objek + mobil Race, D-Pad kotak arcade, `A` merah.
- [ ] Semua popup (Paddock 4 + Race 3 + Victory + Start) pakai `.retro-card` global, tipografi Press Start 2P/VT323, tidak overflow di alamat panjang CP2.
- [ ] D-Pad global CSS memenuhi `border 4px #1a1a2e` + `shadow 4px` + `active translate`.
- [ ] Transisi Paddock↔Race via NPC & toggle header berfungsi, fallback `ModeSelector` ke web tetap.
- [ ] `npm run build` hijau, tidak ada `fixed width` melebihi `320px` popup, `box-sizing:border-box` di semua elemen popup.
- [ ] Diuji tap/spasi jump Race + D-Pad walk Paddock di 380×640 canvas/wrapper, no scroll bodi.

## 7) File Terdampak

- Baru: `src/components/PaddockGame.tsx`, `src/components/DualModeGame.tsx` (atau integrasi `WeddingInvitation.tsx`)
- Ubah: `src/components/WeddingInvitation.tsx`, `src/components/ModeSelector.tsx`, `src/components/GameSection.tsx`, `src/app/layout.tsx` (font), `src/app/globals.css` (retro-card, dpad, row)
- Aset: `public/wedding/*` tetap, peta digambar CSS/canvas pseudo, tidak perlu aset baru selain yang ada.

---
*Owner: PT Multiareal Planing Indonesia — AlQiSAH. Lang: id.*
