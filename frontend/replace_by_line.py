import sys

def replace_circuit_at_line(lines, start_line, new_content):
    # find the next <div
    idx = start_line
    while idx < len(lines) and '<div' not in lines[idx]:
        idx += 1
    
    if idx >= len(lines):
        return lines

    div_start_line = idx
    div_start_pos = lines[idx].find('<div')

    # Reconstruct the string from div_start_line to end to do brace matching
    content = "".join(lines[div_start_line:])
    
    pos = div_start_pos
    depth = 0
    while pos < len(content):
        next_open = content.find('<div', pos)
        next_close = content.find('</div', pos)
        if next_close == -1: break
        
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            pos = next_close + 6
            if depth == 0:
                break
    
    div_end_pos = content.find('>', pos) + 1
    
    # Reconstruct the final lines
    before = lines[:div_start_line] + [lines[div_start_line][:div_start_pos]]
    middle = [new_content + "\n"]
    after_str = content[div_end_pos:]
    
    # We can just join them and split back into lines
    full_str = "".join(before) + middle[0] + after_str
    return full_str.splitlines(True)


with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

bell_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"]]} /></div>'
tele_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={3} initialGates={[["", "H", ""], ["", "CX_0", "CX_1"], ["CX_0", "CX_1", ""], ["H", "", ""], ["", "", "CX_1"], ["", "CX_0", ""]]} /></div>'
sdc_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"], ["", ""], ["", ""], ["CX_0", "CX_1"], ["H", ""]] } /></div>'

# We must replace from bottom to top so line numbers don't shift!
lines = replace_circuit_at_line(lines, 9090, sdc_circuit)
lines = replace_circuit_at_line(lines, 8078, tele_circuit)
lines = replace_circuit_at_line(lines, 7494, bell_circuit)
lines = replace_circuit_at_line(lines, 6921, bell_circuit)

# Add import if missing
content = "".join(lines)
if 'import VisualPlayground from' not in content:
    content = content.replace(
        'import React from "react";',
        'import React from "react";\nimport VisualPlayground from "@/components/VisualPlayground";'
    )

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done replacing by line number")
