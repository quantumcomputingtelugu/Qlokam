import re
with open('old_tutorials.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

for m in re.finditer(r'title:\s*\"([^\"]+)\"', text):
    print(m.group(1))
