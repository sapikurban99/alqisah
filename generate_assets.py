import math
from PIL import Image, ImageDraw

def create_pixel_canvas(w, h, scale=4):
    """Creates a low-res image that will be scaled up cleanly without blur."""
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    return img, img.load(), scale

def scale_up(img, scale):
    return img.resize((img.width * scale, img.height * scale), Image.NEAREST)

print("Asset generation helper ready")
