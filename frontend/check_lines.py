import sys
with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i in range(6700, 6950):
    if i < len(lines):
        print(f'{i}: {lines[i].strip(chr(10)).encode("ascii", "ignore").decode()}')
