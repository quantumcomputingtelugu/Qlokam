import sys

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

bell_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"]]} /></div>\n'
tele_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={3} initialGates={[["", "H", ""], ["", "CX_0", "CX_1"], ["CX_0", "CX_1", ""], ["H", "", ""], ["", "", "CX_1"], ["", "CX_0", ""]]} /></div>\n'
sdc_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"], ["", ""], ["", ""], ["CX_0", "CX_1"], ["H", ""]] } /></div>\n'

# Replace from bottom to top so line numbers don't shift
lines = lines[:9104] + [sdc_circuit] + lines[9720+1:]
lines = lines[:8080] + [tele_circuit] + lines[8594+1:]
lines = lines[:7496] + [bell_circuit] + lines[7775+1:]
lines = lines[:6933] + [bell_circuit] + lines[7205+1:]

# Add import if missing
content = "".join(lines)
if 'import VisualPlayground from' not in content:
    content = content.replace(
        'import React from "react";',
        'import React from "react";\nimport VisualPlayground from "@/components/VisualPlayground";'
    )

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement successful!")
