import os
from PIL import Image

src_path = r'C:\Users\aksha\.gemini\antigravity\brain\37f80fd0-65c6-4446-8933-012350f69909\.user_uploaded\media_1786431638675.png'
dest_dir = r'c:\Users\aksha\Downloads\files'

img = Image.open(src_path).convert("RGBA")
width, height = img.size

# Determine canvas size (square)
max_dim = max(width, height)
# Add slight padding around logo
canvas_size = int(max_dim * 1.1)

# Create a square RGBA canvas with dark theme background #080c1a or transparent
# For Google favicon and browser tabs, transparent RGBA with high contrast works best.
canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))

# Center the logo on the canvas
offset_x = (canvas_size - width) // 2
offset_y = (canvas_size - height) // 2
canvas.paste(img, (offset_x, offset_y), img)

# Save high-res master
master_512 = canvas.resize((512, 512), Image.LANCZOS)
master_512.save(os.path.join(dest_dir, 'android-chrome-512x512.png'), 'PNG')
master_512.save(os.path.join(dest_dir, 'favicon.png'), 'PNG')

# Save 192x192 for Android
icon_192 = canvas.resize((192, 192), Image.LANCZOS)
icon_192.save(os.path.join(dest_dir, 'android-chrome-192x192.png'), 'PNG')

# Save 180x180 for Apple Touch Icon
icon_180 = canvas.resize((180, 180), Image.LANCZOS)
icon_180.save(os.path.join(dest_dir, 'apple-touch-icon.png'), 'PNG')

# Save 96x96 for Google Search Desktop
icon_96 = canvas.resize((96, 96), Image.LANCZOS)
icon_96.save(os.path.join(dest_dir, 'favicon-96x96.png'), 'PNG')

# Save 48x48 for Google Search Mobile (Google minimum 48x48)
icon_48 = canvas.resize((48, 48), Image.LANCZOS)
icon_48.save(os.path.join(dest_dir, 'favicon-48x48.png'), 'PNG')

# Save 32x32
icon_32 = canvas.resize((32, 32), Image.LANCZOS)
icon_32.save(os.path.join(dest_dir, 'favicon-32x32.png'), 'PNG')

# Save 16x16
icon_16 = canvas.resize((16, 16), Image.LANCZOS)
icon_16.save(os.path.join(dest_dir, 'favicon-16x16.png'), 'PNG')

# Save multi-resolution favicon.ico
ico_img_16 = canvas.resize((16, 16), Image.LANCZOS)
ico_img_32 = canvas.resize((32, 32), Image.LANCZOS)
ico_img_48 = canvas.resize((48, 48), Image.LANCZOS)
ico_img_48.save(
    os.path.join(dest_dir, 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[ico_img_16, ico_img_32]
)

print("Favicon files generated successfully in destination directory!")
