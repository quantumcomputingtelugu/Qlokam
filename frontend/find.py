import json
with open('src/components/VisualPlayground.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if 'CX' in line or 'handleDrop' in line or 'renderGate' in line or 'cnot' in line.lower():
        print(f'{i}: {line.strip().encode("ascii", "ignore").decode("ascii")}')
