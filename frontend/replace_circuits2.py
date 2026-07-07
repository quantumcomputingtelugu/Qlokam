import sys

def replace_circuits(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def find_and_replace_div(marker, new_content):
        nonlocal content
        idx = content.find(marker)
        if idx == -1:
            print(f'Marker not found: {marker}')
            return False

        # Find the next <div
        div_start = content.find('<div', idx)
        if div_start == -1: return False
        
        # Parse divs
        pos = div_start
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
        
        div_end = content.find('>', pos) + 1
        
        # Replace
        content = content[:div_start] + new_content + content[div_end:]
        print(f'Replaced {marker.strip()}')
        return True

    bell_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"]]} /></div>'
    tele_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={3} initialGates={[["", "H", ""], ["", "CX_0", "CX_1"], ["CX_0", "CX_1", ""], ["H", "", ""], ["", "", "CX_1"], ["", "CX_0", ""]]} /></div>'
    sdc_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"], ["", ""], ["", ""], ["CX_0", "CX_1"], ["H", ""]] } /></div>'

    # Using just the text as markers
    find_and_replace_div('Bell State Circuit\n                </h3>', bell_circuit)
    find_and_replace_div('Teleportation Circuit\n                </h3>', tele_circuit)
    find_and_replace_div('Superdense Coding Circuit\n                </h3>', sdc_circuit)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

replace_circuits(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx')
