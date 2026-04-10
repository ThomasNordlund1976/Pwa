#!/usr/bin/env python3
# Generate simple PNG icons for the PWA
import struct, zlib

def png(size, bg, fg, letter="H"):
    """Minimal PNG generator"""
    def chunk(name, data):
        c = zlib.crc32(name + data) & 0xffffffff
        return struct.pack('>I', len(data)) + name + data + struct.pack('>I', c)
    
    w = h = size
    r1,g1,b1 = int(bg[0:2],16), int(bg[2:4],16), int(bg[4:6],16)
    r2,g2,b2 = int(fg[0:2],16), int(fg[2:4],16), int(fg[4:6],16)
    
    raw = b''
    for y in range(h):
        raw += b'\x00'
        for x in range(w):
            # Draw a simple "H" shape in the center
            cx, cy = x - w//2, y - h//2
            pad = size // 6
            bar_w = size // 8
            bar_h = size // 2
            # Left bar, right bar, crossbar
            in_left  = (-bar_h//2 <= cy <= bar_h//2) and (-size//3 - bar_w//2 <= cx <= -size//3 + bar_w//2)
            in_right = (-bar_h//2 <= cy <= bar_h//2) and ( size//3 - bar_w//2 <= cx <=  size//3 + bar_w//2)
            in_cross = (-bar_w//2 <= cy <= bar_w//2) and (-size//3 + bar_w//2 <= cx <= size//3 - bar_w//2)
            if in_left or in_right or in_cross:
                raw += bytes([r2, g2, b2, 255])
            else:
                raw += bytes([r1, g1, b1, 255])
    
    compressed = zlib.compress(raw)
    ihdr = struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)  # RGBA
    # fix: 8-bit RGBA = color type 6
    ihdr = struct.pack('>II', w, h) + bytes([8, 6, 0, 0, 0])
    
    sig = b'\x89PNG\r\n\x1a\n'
    return sig + chunk(b'IHDR', ihdr) + chunk(b'IDAT', compressed) + chunk(b'IEND', b'')

for size in [192, 512]:
    data = png(size, '0a0a0c', 'd4ff00')
    with open(f'/home/claude/pwa/icon-{size}.png', 'wb') as f:
        f.write(data)
    print(f"icon-{size}.png written ({len(data)} bytes)")
