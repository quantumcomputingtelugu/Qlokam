import sys

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if 'Bell State Circuit' in line or 'Teleportation Circuit' in line or 'Superdense Coding Circuit' in line:
        print(f'{i}: {line.strip().encode("ascii", "ignore").decode()}')
