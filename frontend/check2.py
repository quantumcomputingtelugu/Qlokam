import re
with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

sessions = re.findall(r'id:\s*"(.*?)",\s*sessionName:\s*"(.*?)",\s*description:\s*".*?",\s*modules:\s*\[([\s\S]*?)\]\n  \}', content)
for s in sessions:
    print(f'Session: {s[1]}')
    ids = re.findall(r'id:\s*(\d+)', s[2])
    print(f'Module IDs: {ids}')
