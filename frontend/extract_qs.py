import re

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\contests.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.finditer(r'question:\s*"(.*?)"', content)
for i, match in enumerate(matches):
    print(f"Q{i+1}: {match.group(1).encode('ascii', 'ignore').decode()}")
