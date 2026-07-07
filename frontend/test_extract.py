import sys

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

def get_div_block(start_line):
    idx = start_line
    while idx < len(lines) and '<div' not in lines[idx]:
        idx += 1
    if idx >= len(lines): return None
        
    start_line = idx
    content = "".join(lines[start_line:])
    
    pos = content.find('<div')
    depth = 0
    while pos < len(content):
        next_open = content.find('<div', pos)
        next_close = content.find('</div', pos)
        
        if next_close == -1: break
            
        if next_open != -1 and next_open < next_close:
            # We found an open tag. Is it self-closing?
            # We must find the closing > of this tag.
            # But what if there are > inside style={{...}}? No, JSX style objects don't typically contain >. But what about arrow functions?
            tag_end = content.find('>', next_open)
            # Find the first > that is NOT inside {}? That's too hard.
            # Let's just use the fact that these specific circuits don't have > in their props.
            if content[tag_end-1] == '/':
                pos = tag_end + 1
            else:
                depth += 1
                pos = tag_end + 1
        else:
            depth -= 1
            pos = next_close + 6
            if depth == 0:
                break
                
    end_pos = content.find('>', pos) + 1
    # print the extracted block to verify!
    with open('out_block.txt', 'w', encoding='utf-8') as out_f:
        out_f.write(content[:end_pos])
    return

get_div_block(6921)
