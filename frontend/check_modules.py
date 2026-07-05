import re
with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

sessions = content.split('sessionName:')
for session in sessions[1:]:
    name = session.split('"')[1]
    modules_str = session.split('modules: [')[1].split(']')[0]
    ids = re.findall(r'id:\s*(\d+)', modules_str)
    print(f'Session: {name}')
    print(f'Module IDs: {ids}')
