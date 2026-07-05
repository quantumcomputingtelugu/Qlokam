import re

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

sessions = content.split('sessionName: "')
for s in sessions[1:]:
    name = s.split('"')[0]
    try:
        modules_str = s.split('modules: [')[1]
        
        bracket_count = 1
        end_idx = 0
        for i, char in enumerate(modules_str):
            if char == '[': bracket_count += 1
            elif char == ']': bracket_count -= 1
            if bracket_count == 0:
                end_idx = i
                break
                
        modules_content = modules_str[:end_idx]
        ids = re.findall(r'id:\s*(\d+)', modules_content)
        print(f'{name}: {ids}')
    except Exception as e:
        print(f'Failed on {name}: {e}')
