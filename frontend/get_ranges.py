import sys

def get_div_range(lines, marker_line_num):
    # Find the next <div
    idx = marker_line_num
    while idx < len(lines) and '<div' not in lines[idx]:
        idx += 1
    
    if idx >= len(lines):
        return None
        
    start_line = idx
    content = "".join(lines[start_line:])
    
    pos = content.find('<div')
    depth = 0
    while pos < len(content):
        next_open = content.find('<div', pos)
        next_close = content.find('</div', pos)
        
        if next_close == -1: 
            break
            
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            pos = next_close + 6
            if depth == 0:
                break
                
    end_pos = content.find('>', pos) + 1
    # Count newlines up to end_pos to get the end_line
    end_line = start_line + content[:end_pos].count('\n')
    return start_line, end_line

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("Bell 1:", get_div_range(lines, 6921))
print("Bell 2:", get_div_range(lines, 7494))
print("Teleportation:", get_div_range(lines, 8078))
print("Superdense:", get_div_range(lines, 9090))
