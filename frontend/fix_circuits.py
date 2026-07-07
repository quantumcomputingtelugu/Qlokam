import sys
import re

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Current states of the playgrounds in tutorials.tsx:
# 1. bell1 (line 6921 area) -> <VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"]]} />
# 2. bell2 (line 7494 area) -> <VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"]]} />
# 3. tele (line 8078 area) -> <VisualPlayground inlineMode initialNumQubits={3} initialGates={[["", "H", ""], ["", "CX_0", "CX_1"], ["CX_0", "CX_1", ""], ["H", "", ""], ["", "", "CX_1"], ["", "CX_0", ""]]} />
# 4. sdc (line 9090 area) -> <VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"], ["", ""], ["", ""], ["CX_0", "CX_1"], ["H", ""]] } />

bell_circuit_correct = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", "CX|1"], ["", ""]]} /></div>'
tele_circuit_correct = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={3} initialGates={[["", "", "CX|1", "H", "", "CZ|2"], ["H", "CX|2", "", "", "CX|2", ""], ["", "", "", "", "", ""]]} /></div>'
sdc_circuit_correct = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", "CX|1", "X", "Z", "CX|1", "H"], ["", "", "", "", "", ""]]} /></div>'

content = content.replace(
    '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"]]} /></div>',
    bell_circuit_correct
)

content = content.replace(
    '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={3} initialGates={[["", "H", ""], ["", "CX_0", "CX_1"], ["CX_0", "CX_1", ""], ["H", "", ""], ["", "", "CX_1"], ["", "CX_0", ""]]} /></div>',
    tele_circuit_correct
)

content = content.replace(
    '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"], ["", ""], ["", ""], ["CX_0", "CX_1"], ["H", ""]] } /></div>',
    sdc_circuit_correct
)

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done replacing incorrect initialGates strings.")
