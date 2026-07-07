import sys
with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i in range(6930, 6945):
    print(f'{i}: {lines[i].encode("ascii", "ignore").decode().strip()}')
