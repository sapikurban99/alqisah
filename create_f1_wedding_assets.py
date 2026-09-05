import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public/wedding", exist_ok=True)

# -------------------------------------------------------------
# 1. OBSTACLES & ROAD ORNAMENTS
# -------------------------------------------------------------

def draw_tires():
    """Stack of 3 black racing tires with colored stripe"""
    w, h = 40, 48
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # 3 tires stacked vertically
    tire_y = [28, 16, 4]
    stripe_colors = [(220, 40, 40), (240, 200, 30), (220, 40, 40)] # Red, Yellow, Red stripes
    
    for i, ty in enumerate(tire_y):
        # Shadow underneath
        d.ellipse([4, ty + 12, 36, ty + 18], fill=(20, 20, 25, 120))
        # Tire body (dark charcoal)
        d.rounded_rectangle([4, ty, 36, ty + 15], radius=5, fill=(35, 36, 40))
        # Tire tread highlight and grooves
        d.rounded_rectangle([5, ty + 1, 35, ty + 14], radius=4, outline=(55, 57, 63), width=1)
        d.rounded_rectangle([6, ty + 2, 34, ty + 4], radius=2, fill=(65, 68, 75))
        # Colored Pirelli-style stripe
        sc = stripe_colors[i]
        d.line([8, ty + 7, 32, ty + 7], fill=sc, width=2)
        d.line([10, ty + 6, 30, ty + 6], fill=(min(255, sc[0]+40), min(255, sc[1]+40), min(255, sc[2]+40)), width=1)
        # Inner rim / hub
        d.ellipse([14, ty + 4, 26, ty + 11], fill=(20, 21, 24))
        d.ellipse([17, ty + 6, 23, ty + 9], fill=(80, 85, 95))
        d.point([(20, ty + 7)], fill=(200, 205, 215))

    # Scale 2x for sharp 16-bit look
    return img.resize((w * 2, h * 2), Image.NEAREST)

def draw_cone():
    """Orange racing traffic cone with white reflective band"""
    w, h = 32, 44
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Base shadow
    d.ellipse([2, 38, 30, 43], fill=(20, 20, 25, 130))
    # Black rubber base plate
    d.polygon([(4, 38), (28, 38), (30, 41), (2, 41)], fill=(30, 32, 36))
    d.polygon([(5, 37), (27, 37), (29, 39), (3, 39)], fill=(48, 50, 56))
    
    # Orange cone body
    d.polygon([(16, 5), (25, 37), (7, 37)], fill=(245, 90, 15))
    # Cone highlight left side
    d.polygon([(16, 5), (16, 37), (7, 37)], fill=(255, 120, 35))
    # Cone shadow right side
    d.polygon([(16, 5), (25, 37), (21, 37)], fill=(210, 70, 10))
    
    # Rounded tip
    d.ellipse([14, 4, 18, 8], fill=(255, 130, 45))
    
    # White reflective band 1 (upper)
    d.polygon([(13, 16), (19, 16), (20, 21), (12, 21)], fill=(240, 245, 250))
    d.polygon([(13, 16), (16, 16), (16, 21), (12, 21)], fill=(255, 255, 255))
    
    # White reflective band 2 (lower)
    d.polygon([(11, 26), (21, 26), (23, 31), (9, 31)], fill=(240, 245, 250))
    d.polygon([(11, 26), (16, 26), (16, 31), (9, 31)], fill=(255, 255, 255))
    
    return img.resize((w * 2, h * 2), Image.NEAREST)

def draw_speed_sign():
    """Retro pit lane speed limit sign '80' / 'PIT'"""
    w, h = 36, 54
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Pole shadow
    d.ellipse([10, 49, 26, 53], fill=(20, 20, 25, 120))
    # Pole base
    d.rectangle([14, 48, 22, 51], fill=(60, 65, 75))
    # Metallic pole
    d.rectangle([16, 26, 20, 49], fill=(160, 168, 180))
    d.rectangle([16, 26, 17, 49], fill=(210, 218, 230))
    d.rectangle([19, 26, 20, 49], fill=(110, 118, 130))
    
    # Circular sign board
    d.ellipse([4, 2, 32, 30], fill=(215, 30, 35)) # Red border
    d.ellipse([7, 5, 29, 27], fill=(250, 250, 252)) # White inner
    
    # "80" text in pixel art
    # Number 8
    d.rectangle([10, 10, 16, 22], outline=(25, 25, 30), width=1)
    d.line([10, 16, 16, 16], fill=(25, 25, 30), width=1)
    d.rectangle([12, 12, 14, 14], fill=(250, 250, 252))
    d.rectangle([12, 18, 14, 20], fill=(250, 250, 252))
    
    # Number 0
    d.rectangle([19, 10, 25, 22], outline=(25, 25, 30), width=1)
    d.rectangle([21, 13, 23, 19], fill=(250, 250, 252))
    
    return img.resize((w * 2, h * 2), Image.NEAREST)

def draw_checkered_flag():
    """Checkered flag on a pole"""
    w, h = 46, 54
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Pole shadow
    d.ellipse([4, 49, 16, 53], fill=(20, 20, 25, 120))
    # Gold finial ball on top
    d.ellipse([7, 2, 13, 8], fill=(245, 195, 35))
    d.ellipse([8, 3, 11, 5], fill=(255, 240, 120))
    # Silver pole
    d.rectangle([9, 8, 11, 50], fill=(180, 190, 205))
    d.line([9, 8, 9, 50], fill=(225, 235, 250), width=1)
    d.line([11, 8, 11, 50], fill=(120, 130, 145), width=1)
    
    # Waving checkered flag (grid of 5x3 checks, with wave curves)
    flag_x0, flag_y0 = 11, 8
    cols, rows = 6, 4
    cw, rh = 5, 4
    for r in range(rows):
        for c in range(cols):
            wave = int(math.sin(c * 0.7) * 2)
            color = (245, 248, 252) if (r + c) % 2 == 0 else (28, 30, 35)
            # draw wavy quadrilateral
            x = flag_x0 + c * cw
            y = flag_y0 + r * rh + wave
            d.rectangle([x, y, x + cw, y + rh], fill=color)
            
    # Red & white wedding ribbon tied to pole
    d.rectangle([8, 26, 12, 29], fill=(230, 50, 75))
    d.line([12, 28, 18, 34], fill=(230, 50, 75), width=2)
    d.line([11, 29, 15, 36], fill=(255, 255, 255), width=1)
    
    return img.resize((w * 2, h * 2), Image.NEAREST)

def draw_starting_light():
    """F1 starting grid traffic light gantry"""
    w, h = 34, 56
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Shadow
    d.ellipse([8, 51, 26, 55], fill=(20, 20, 25, 120))
    # Pole
    d.rectangle([15, 36, 19, 52], fill=(80, 85, 95))
    d.rectangle([15, 36, 16, 52], fill=(120, 125, 135))
    
    # Light box (black matte metal)
    d.rounded_rectangle([7, 3, 27, 37], radius=3, fill=(25, 26, 30), outline=(50, 55, 65), width=1)
    
    # 5 vertical red F1 starting bulbs
    bulb_y = [6, 12, 18, 24, 30]
    for by in bulb_y:
        # Visor above bulb
        d.line([9, by, 25, by], fill=(15, 15, 18), width=1)
        # Glowing red light
        d.ellipse([12, by + 1, 22, by + 5], fill=(255, 35, 35))
        d.ellipse([14, by + 2, 20, by + 4], fill=(255, 150, 150))
        d.point([(16, by + 2)], fill=(255, 255, 255))
        
    return img.resize((w * 2, h * 2), Image.NEAREST)

# Save individual obstacle assets
tires_img = draw_tires()
cone_img = draw_cone()
sign_img = draw_speed_sign()
flag_img = draw_checkered_flag()
light_img = draw_starting_light()

tires_img.save("public/wedding/obstacle-tires.png")
cone_img.save("public/wedding/obstacle-cone.png")
sign_img.save("public/wedding/obstacle-speed-sign.png")
flag_img.save("public/wedding/obstacle-flag.png")
light_img.save("public/wedding/obstacle-light.png")

# Create Sprite Sheet
sheet_w = 400
sheet_h = 130
sheet = Image.new("RGBA", (sheet_w, sheet_h), (255, 255, 255, 255))
# Place each sprite
sheet.paste(tires_img, (15, 20), tires_img)
sheet.paste(cone_img, (105, 28), cone_img)
sheet.paste(sign_img, (175, 14), sign_img)
sheet.paste(flag_img, (255, 14), flag_img)
sheet.paste(light_img, (335, 10), light_img)
sheet.save("public/wedding/f1-obstacles-sheet.png")
print("Obstacles & Sprite Sheet created successfully!")

# -------------------------------------------------------------
# 2. GARIS FINISH & PODIUM (PENGGANTI GEREJA)
# -------------------------------------------------------------

def draw_finish_archway():
    """F1 Finish line archway with checkered pattern and #AlQiSAH banner"""
    w, h = 130, 220
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Support pillars left & right (metallic truss)
    for px in [10, 105]:
        # Concrete base
        d.rectangle([px - 4, 195, px + 19, 215], fill=(160, 165, 175), outline=(90, 95, 105))
        # Red & white kerb pattern on base
        d.rectangle([px - 4, 205, px + 19, 215], fill=(220, 35, 35))
        d.rectangle([px + 2, 205, px + 13, 215], fill=(255, 255, 255))
        
        # Steel lattice gantry upright
        d.rectangle([px, 45, px + 15, 195], fill=(45, 48, 55))
        # Lattice diagonal bars
        for y in range(45, 195, 15):
            d.line([px, y, px + 15, y + 15], fill=(120, 125, 140), width=1)
            d.line([px + 15, y, px, y + 15], fill=(90, 95, 110), width=1)
        d.line([px, 45, px, 195], fill=(180, 185, 200), width=1)
        d.line([px + 15, 45, px + 15, 195], fill=(90, 95, 105), width=1)

    # Overhead Bridge Structure
    d.rectangle([6, 12, 124, 48], fill=(30, 32, 38))
    d.rectangle([8, 14, 122, 46], fill=(42, 45, 52))
    
    # Top Checkered banner strip
    cw, rh = 6, 6
    for c in range(18):
        for r in range(2):
            color = (250, 252, 255) if (r + c) % 2 == 0 else (20, 20, 25)
            d.rectangle([10 + c * cw, 15 + r * rh, 10 + (c + 1) * cw, 15 + (r + 1) * rh], fill=color)

    # Center LED Screen / Grand Prix Wedding Title Board
    d.rectangle([14, 28, 116, 44], fill=(15, 18, 24), outline=(220, 180, 40), width=1)
    
    # Gold decorative text "ALDI & QISTY - FOREVER GP"
    # Pixel art letters "ALDI & QISTY"
    d.text((18, 30), "ALDI & QISTY", fill=(255, 220, 60))
    d.text((22, 37), "FINISH LINE", fill=(255, 80, 110))
    
    # Wedding floral garland hanging from the truss
    for gx in range(12, 118, 8):
        # green leaf cluster
        d.ellipse([gx, 46, gx + 8, 52], fill=(45, 140, 60))
        # pink & white rose buds
        if gx % 16 == 0:
            d.ellipse([gx + 2, 48, gx + 6, 53], fill=(255, 105, 140))
        else:
            d.ellipse([gx + 2, 49, gx + 5, 52], fill=(255, 255, 255))
            
    # Checkered line on the road across the bottom
    for c in range(18):
        color = (255, 255, 255) if c % 2 == 0 else (30, 30, 35)
        d.rectangle([10 + c * cw, 210, 10 + (c + 1) * cw, 218], fill=color)
        
    return img.resize((w * 2, h * 2), Image.NEAREST)

def draw_winner_podium():
    """Winner's Podium with 1st place, Trophy, Popped Champagne, and Bride Qisty waiting"""
    w, h = 180, 200
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Grandstand backdrop with spectators & flags
    d.rectangle([10, 40, 170, 130], fill=(40, 45, 60))
    # Roof canopy of grandstand
    d.polygon([(0, 40), (180, 40), (170, 25), (10, 25)], fill=(220, 45, 55))
    d.line([(0, 40), (180, 40)], fill=(255, 255, 255), width=2)
    
    # Cheering crowd pixel silhouettes
    crowd_colors = [(255, 200, 150), (100, 150, 240), (255, 100, 150), (240, 240, 250), (230, 180, 40)]
    for row in range(3):
        cy = 50 + row * 16
        for col in range(18):
            cx = 16 + col * 8
            # head
            cc = crowd_colors[(col + row * 3) % len(crowd_colors)]
            d.ellipse([cx, cy, cx + 5, cy + 5], fill=cc)
            # body
            d.rectangle([cx - 1, cy + 5, cx + 6, cy + 12], fill=(30 + (col*10)%50, 40 + (row*15)%60, 80))
            # raised hands waving flags!
            if (col + row) % 4 == 0:
                d.line([cx + 5, cy + 3, cx + 8, cy - 3], fill=cc, width=1)
                d.rectangle([cx + 8, cy - 6, cx + 13, cy - 2], fill=(255, 255, 255) if col % 2 == 0 else (240, 50, 50))

    # Grandstand railing with floral wedding garlands
    d.rectangle([10, 105, 170, 112], fill=(180, 185, 195))
    for fx in range(12, 168, 6):
        d.ellipse([fx, 108, fx + 6, 115], fill=(50, 160, 70))
        d.ellipse([fx + 1, 110, fx + 5, 114], fill=(255, 130, 160) if fx % 12 == 0 else (255, 255, 255))

    # PODIUM (Steps 2, 1, 3)
    # Step 2 (Left)
    d.rectangle([30, 140, 65, 195], fill=(190, 195, 205), outline=(130, 135, 145))
    d.rectangle([33, 142, 62, 146], fill=(225, 230, 240))
    d.text((43, 155), "2", fill=(100, 105, 115))
    
    # Step 1 (Center, HIGHEST)
    d.rectangle([65, 115, 115, 195], fill=(220, 45, 55), outline=(160, 25, 35))
    d.rectangle([68, 117, 112, 122], fill=(255, 90, 100))
    # Gold border & Laurel wreath
    d.ellipse([76, 140, 104, 168], outline=(255, 220, 60), width=2)
    d.text((86, 145), "1", fill=(255, 220, 60))
    # #AlQiSAH text on Step 1
    d.rectangle([70, 172, 110, 185], fill=(20, 25, 35))
    d.text((72, 174), "AlQiSAH", fill=(255, 220, 60))
    
    # Step 3 (Right)
    d.rectangle([115, 152, 150, 195], fill=(170, 150, 130), outline=(120, 100, 85))
    d.rectangle([118, 154, 147, 158], fill=(205, 185, 165))
    d.text((128, 165), "3", fill=(95, 80, 65))

    # GOLDEN CHAMPIONSHIP TROPHY on Step 1
    tx, ty = 82, 85
    # Trophy cup body
    d.polygon([(tx, ty), (tx + 16, ty), (tx + 13, ty + 15), (tx + 3, ty + 15)], fill=(255, 215, 0))
    d.polygon([(tx + 2, ty + 1), (tx + 8, ty + 1), (tx + 6, ty + 14), (tx + 4, ty + 14)], fill=(255, 245, 120)) # shine
    # Handles
    d.line([(tx - 2, ty + 2), (tx - 2, ty + 10), (tx + 2, ty + 12)], fill=(230, 180, 0), width=2)
    d.line([(tx + 18, ty + 2), (tx + 18, ty + 10), (tx + 14, ty + 12)], fill=(230, 180, 0), width=2)
    # Stem & Base
    d.rectangle([tx + 6, ty + 15, tx + 10, ty + 22], fill=(210, 165, 0))
    d.rectangle([tx + 2, ty + 22, tx + 14, ty + 26], fill=(50, 40, 30))
    # Sparkle on trophy
    d.line([(tx + 4, ty - 3), (tx + 4, ty + 3)], fill=(255, 255, 255), width=1)
    d.line([(tx + 1, ty), (tx + 7, ty)], fill=(255, 255, 255), width=1)

    # POPPED CHAMPAGNE BOTTLE on Step 2 with foaming spray!
    chx, chy = 42, 122
    # Green bottle tilted
    d.polygon([(chx, chy + 14), (chx + 6, chy + 6), (chx + 9, chy + 8), (chx + 3, chy + 16)], fill=(35, 95, 45))
    # Golden foil neck
    d.line([(chx + 6, chy + 6), (chx + 10, chy + 2)], fill=(245, 200, 40), width=2)
    # Champagne spray bubbles shooting upwards
    spray_pts = [(54, 114), (58, 108), (62, 102), (65, 95), (60, 92), (68, 88), (72, 85)]
    for sx, sy in spray_pts:
        d.ellipse([sx, sy, sx + 3, sy + 3], fill=(255, 250, 200))
        d.ellipse([sx + 1, sy + 1, sx + 2, sy + 2], fill=(255, 255, 255))

    # BRIDE (QISTY) CELEBRATING ON PODIUM / AT THE FINISH!
    # Placed gracefully near the podium waving a flower bouquet
    bx, by = 125, 102
    # Flowing White Wedding Dress
    d.polygon([(bx + 8, by + 16), (bx + 2, by + 48), (bx + 22, by + 48)], fill=(255, 255, 255))
    d.polygon([(bx + 8, by + 16), (bx + 4, by + 48), (bx + 11, by + 48)], fill=(240, 242, 250))
    # Veil floating behind
    d.polygon([(bx + 8, by + 4), (bx - 4, by + 18), (bx - 2, by + 36), (bx + 6, by + 20)], fill=(255, 255, 255, 200))
    # Bride Head & Hair (brown pixel hair)
    d.ellipse([bx + 4, by + 2, bx + 14, by + 12], fill=(110, 60, 30))
    d.ellipse([bx + 5, by + 4, bx + 13, by + 12], fill=(255, 220, 190))
    d.point([(bx + 10, by + 6)], fill=(50, 30, 20)) # smiling eye
    # Tiara / Floral Headband
    d.line([(bx + 5, by + 3), (bx + 12, by + 3)], fill=(255, 215, 50), width=1)
    # Arms holding flowers up
    d.line([(bx + 12, by + 18), (bx + 18, by + 12)], fill=(255, 220, 190), width=2)
    # Pink wedding bouquet
    d.ellipse([bx + 17, by + 8, bx + 24, by + 15], fill=(255, 105, 150))
    d.ellipse([bx + 18, by + 9, bx + 22, by + 13], fill=(255, 255, 255))

    # Confetti fluttering in air (pink, gold, white, red)
    confetti = [
        (25, 60, (255, 105, 180)), (45, 45, (255, 215, 0)), (75, 30, (255, 255, 255)),
        (105, 35, (230, 50, 50)), (135, 50, (255, 180, 50)), (155, 65, (255, 105, 180)),
        (90, 50, (255, 215, 0)), (115, 65, (100, 220, 255)), (35, 80, (255, 255, 255)),
        (140, 85, (255, 215, 0)), (65, 75, (255, 90, 130))
    ]
    for cx, cy, ccol in confetti:
        d.rectangle([cx, cy, cx + 3, cy + 2], fill=ccol)

    return img.resize((w * 2, h * 2), Image.NEAREST)

arch_img = draw_finish_archway()
podium_img = draw_winner_podium()

arch_img.save("public/wedding/f1-finish-line.png")
podium_img.save("public/wedding/f1-podium.png")

# Combined finish & podium graphic
combo_w = arch_img.width + podium_img.width + 20
combo_h = max(arch_img.height, podium_img.height)
combo = Image.new("RGBA", (combo_w, combo_h), (0, 0, 0, 0))
combo.paste(arch_img, (0, combo_h - arch_img.height), arch_img)
combo.paste(podium_img, (arch_img.width + 10, combo_h - podium_img.height), podium_img)
combo.save("public/wedding/f1-finish-podium-full.png")

print("Finish line & Podium created successfully!")

# -------------------------------------------------------------
# 3. BACKGROUND JALANAN MONTE CARLO (SIDE-SCROLLING)
# -------------------------------------------------------------

def draw_monte_carlo_background():
    """
    16-bit pixel art side-scrolling background landscape.
    F1 Monte Carlo street circuit theme:
    - Azure Mediterranean blue ocean
    - Luxury white yachts with masts
    - Coastal cliff city buildings (pastel Monaco architecture)
    - Palm trees & lush vegetation
    - Foreground grey asphalt race track with red & white F1 kerbs
    """
    w, h = 640, 360
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # 1. Clear sunny sky gradient (azure blue to bright horizon)
    sky_colors = [
        (90, 160, 245),
        (120, 185, 250),
        (150, 205, 255),
        (185, 225, 255),
        (215, 238, 255),
    ]
    for i, sc in enumerate(sky_colors):
        y0 = int(i * (110 / len(sky_colors)))
        y1 = int((i + 1) * (110 / len(sky_colors)))
        d.rectangle([0, y0, w, y1], fill=sc)
        
    # Sun & warm flare (top right)
    sun_x, sun_y = 520, 35
    d.ellipse([sun_x - 18, sun_y - 18, sun_x + 18, sun_y + 18], fill=(255, 255, 230, 220))
    d.ellipse([sun_x - 12, sun_y - 12, sun_x + 12, sun_y + 12], fill=(255, 255, 255))
    
    # Fluffy retro arcade clouds
    clouds = [(60, 30, 45), (220, 20, 55), (380, 35, 40)]
    for cx, cy, cr in clouds:
        d.ellipse([cx - cr, cy, cx + cr, cy + 18], fill=(255, 255, 255, 210))
        d.ellipse([cx - cr*0.6, cy - 10, cx + cr*0.6, cy + 15], fill=(255, 255, 255, 230))
        d.ellipse([cx - cr*0.2, cy - 15, cx + cr*0.3, cy + 15], fill=(255, 255, 255, 245))

    # 2. Distant Monaco Maritime Alps / Cliffs in background haze
    cliff_pts = [
        (0, 110), (50, 95), (110, 102), (180, 85), (250, 98), 
        (330, 80), (410, 92), (490, 78), (560, 90), (640, 82),
        (640, 140), (0, 140)
    ]
    d.polygon(cliff_pts, fill=(145, 175, 210))
    
    # 3. Monaco Coastal Cliffside City Buildings (Pastel terracotta, cream, peach)
    building_palette = [
        (245, 225, 200), # cream
        (240, 185, 160), # terracotta peach
        (230, 200, 165), # warm beige
        (255, 240, 220), # light ivory
        (225, 165, 145)  # pastel rose
    ]
    roof_palette = [
        (190, 80, 55),   # red terracotta roof
        (210, 95, 65),
        (165, 65, 45)
    ]
    
    # Stacked Mediterranean architecture along the cliffs
    for bx in range(0, w, 28):
        b_w = 26
        b_h = 45 + (int(math.sin(bx * 0.05) * 15) + (bx % 20))
        by = 150 - b_h
        bc = building_palette[(bx // 28) % len(building_palette)]
        rc = roof_palette[(bx // 28) % len(roof_palette)]
        
        # building wall
        d.rectangle([bx, by, bx + b_w, 155], fill=bc)
        # roof (slanted or terrace)
        if (bx // 28) % 3 == 0:
            d.polygon([(bx - 2, by), (bx + b_w // 2, by - 8), (bx + b_w + 2, by)], fill=rc)
        else:
            d.rectangle([bx - 1, by - 3, bx + b_w + 1, by], fill=rc)
            
        # windows with dark shutters & arches
        for wy in range(by + 8, 145, 10):
            d.rectangle([bx + 4, wy, bx + 9, wy + 6], fill=(50, 70, 95))
            d.rectangle([bx + 15, wy, bx + 20, wy + 6], fill=(50, 70, 95))
            # window frame highlight
            d.point([(bx + 4, wy), (bx + 15, wy)], fill=(255, 255, 255))
            
    # Lush Mediterranean pine & cliff greenery between buildings
    for gx in range(5, w, 32):
        gy = 145 + int(math.sin(gx * 0.1) * 4)
        d.ellipse([gx, gy - 12, gx + 22, gy + 8], fill=(55, 135, 65))
        d.ellipse([gx + 3, gy - 15, gx + 18, gy + 4], fill=(75, 165, 75))

    # 4. Deep Mediterranean Blue Sea (Port Hercule / Monte Carlo Bay)
    sea_y_start = 152
    sea_y_end = 215
    sea_gradients = [
        (50, 130, 210),
        (35, 110, 195),
        (25, 95, 180),
        (20, 80, 165),
    ]
    for i, sc in enumerate(sea_gradients):
        y0 = sea_y_start + i * 15
        y1 = y0 + 16
        d.rectangle([0, y0, w, y1], fill=sc)
        
    # Gentle wave shimmer highlights
    for wy in range(sea_y_start + 4, sea_y_end - 4, 6):
        wave_offset = (wy * 13) % 40
        for wx in range(wave_offset, w, 40):
            d.line([wx, wy, wx + 12, wy], fill=(140, 205, 255, 160), width=1)
            
    # Luxury White Superyachts & Sailboats in Monte Carlo Harbor
    yachts = [
        (40, 168, 60, True),   # (x, y, length, is_superyacht)
        (160, 175, 45, False),
        (270, 165, 75, True),
        (400, 172, 50, False),
        (520, 166, 65, True),
    ]
    for yx, yy, ylen, is_mega in yachts:
        # Yacht shadow on water
        d.ellipse([yx - 2, yy + 6, yx + ylen + 4, yy + 12], fill=(15, 55, 115, 160))
        # White hull
        d.polygon([(yx, yy), (yx + ylen, yy), (yx + ylen - 6, yy + 8), (yx + 4, yy + 8)], fill=(245, 248, 252))
        d.line([(yx + 4, yy + 4), (yx + ylen - 8, yy + 4)], fill=(30, 70, 120), width=1) # blue stripe
        
        # Decks & bridge
        if is_mega:
            d.rectangle([yx + 12, yy - 8, yx + ylen - 15, yy], fill=(255, 255, 255))
            d.rectangle([yx + 20, yy - 14, yx + ylen - 25, yy - 8], fill=(250, 252, 255))
            # tinted glass windows
            d.line([yx + 15, yy - 5, yx + ylen - 18, yy - 5], fill=(40, 90, 140), width=2)
            d.line([yx + 22, yy - 11, yx + ylen - 28, yy - 11], fill=(40, 90, 140), width=2)
            # radar mast
            d.line([yx + 32, yy - 22, yx + 32, yy - 14], fill=(200, 205, 215), width=1)
            d.line([yx + 28, yy - 20, yx + 36, yy - 20], fill=(200, 205, 215), width=1)
        else:
            # Sailboat mast & white sail
            d.line([yx + ylen//2, yy - 26, yx + ylen//2, yy], fill=(180, 185, 195), width=1)
            d.polygon([(yx + ylen//2, yy - 24), (yx + ylen//2, yy - 2), (yx + ylen - 4, yy - 2)], fill=(255, 255, 255, 230))

    # 5. Coastal Promenade, Palm Trees & Harbor Balustrade
    prom_y = 205
    d.rectangle([0, prom_y, w, prom_y + 14], fill=(210, 215, 220)) # concrete sea wall
    # Classic balustrade / guardrail
    d.line([0, prom_y, w, prom_y], fill=(245, 248, 252), width=2)
    for bx in range(0, w, 8):
        d.line([bx, prom_y, bx, prom_y + 6], fill=(245, 248, 252), width=1)
        
    # Lush Monaco Palm Trees along promenade
    palm_x = [25, 115, 210, 315, 430, 545, 620]
    for px in palm_x:
        py = prom_y + 10
        # Curved brown trunk
        d.line([px, py, px + 3, py - 20, px - 2, py - 40], fill=(120, 85, 50), width=3)
        # Palm fronds (lush green fan)
        tx, ty = px - 2, py - 40
        frond_angles = [-140, -110, -70, -40, -10, 20, 60]
        for fa in frond_angles:
            rad = math.radians(fa)
            fx = tx + int(math.cos(rad) * 22)
            fy = ty + int(math.sin(rad) * 14)
            d.line([(tx, ty), (fx, fy)], fill=(40, 150, 55), width=2)
            d.line([(tx, ty), (fx - 1, fy + 2)], fill=(65, 185, 75), width=1)

    # 6. FOREGROUND: Grey Asphalt Race Track with Iconic Red & White F1 Kerbs
    track_y = 218
    # Track Armco barrier / safety barrier
    d.rectangle([0, track_y, w, track_y + 12], fill=(175, 182, 192), outline=(100, 108, 120))
    d.line([0, track_y + 4, w, track_y + 4], fill=(225, 232, 242), width=1)
    d.line([0, track_y + 8, w, track_y + 8], fill=(130, 138, 150), width=1)
    
    # Iconic Red & White F1 Kerbs (Curbs)
    kerb_y = track_y + 12
    kerb_h = 16
    kerb_w = 20
    for i in range(w // kerb_w + 1):
        kx = i * kerb_w
        kcol = (225, 35, 40) if i % 2 == 0 else (250, 252, 255)
        k_top = (255, 60, 65) if i % 2 == 0 else (255, 255, 255)
        # 3D kerb with angled grooves
        d.polygon([(kx, kerb_y), (kx + kerb_w, kerb_y), (kx + kerb_w - 4, kerb_y + kerb_h), (kx - 4, kerb_y + kerb_h)], fill=kcol)
        d.line([(kx, kerb_y), (kx + kerb_w, kerb_y)], fill=k_top, width=2)
        d.line([(kx + kerb_w, kerb_y), (kx + kerb_w - 4, kerb_y + kerb_h)], fill=(50, 20, 20) if i % 2 == 0 else (180, 185, 195), width=1)

    # Grey Asphalt Road Surface
    road_y = kerb_y + kerb_h
    road_h = h - road_y
    d.rectangle([0, road_y, w, h], fill=(52, 55, 62)) # dark grey asphalt
    # Asphalt grain texture & tire rubber marks
    d.rectangle([0, road_y, w, road_y + 6], fill=(42, 45, 52)) # shadow under kerb
    # Dark rubber skid lines on race line
    d.line([0, road_y + 35, w, road_y + 35], fill=(36, 38, 44), width=3)
    d.line([0, road_y + 55, w, road_y + 55], fill=(38, 40, 46), width=4)
    # White dashed track edge / racing guide line
    for dx in range(0, w, 40):
        d.rectangle([dx, road_y + 80, dx + 22, road_y + 84], fill=(240, 245, 250))

    # Scale 2x for rich, crisp 16-bit display (1280x720)
    return img.resize((w * 2, h * 2), Image.NEAREST)

bg_img = draw_monte_carlo_background()
bg_img.save("public/wedding/f1-monte-carlo-bg.png")
print("Monte Carlo Background created successfully!")

