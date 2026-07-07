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
            tag_end = content.find('>', next_open)
            if content[tag_end-1] == '/':
                pos = tag_end + 1
            else:
                depth += 1
                pos = tag_end + 1
        else:
            depth -= 1
            # find the > of the closing div
            close_tag_end = content.find('>', next_close)
            pos = close_tag_end + 1
            if depth == 0:
                break
                
    end_pos = pos
    return "".join(lines[:start_line]), content[:end_pos], content[end_pos:]

_, bell1, _ = get_div_block(6921)
_, bell2, _ = get_div_block(7494)
_, tele, _ = get_div_block(8078)
_, sdc, _ = get_div_block(9090)

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

bell_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"]]} /></div>'
tele_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={3} initialGates={[["", "H", ""], ["", "CX_0", "CX_1"], ["CX_0", "CX_1", ""], ["H", "", ""], ["", "", "CX_1"], ["", "CX_0", ""]]} /></div>'
sdc_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"], ["", ""], ["", ""], ["CX_0", "CX_1"], ["H", ""]] } /></div>'

content = content.replace(bell1, bell_circuit)
content = content.replace(bell2, bell_circuit)
content = content.replace(tele, tele_circuit)
content = content.replace(sdc, sdc_circuit)

if 'import VisualPlayground from' not in content:
    content = content.replace(
        'import React from "react";',
        'import React from "react";\nimport VisualPlayground from "@/components/VisualPlayground";'
    )

course_content = """  {
    id: "fundamental-algorithms",
    sessionName: "Fundamental Quantum Algorithms",
    badge: "Medium",
    modules: [
      {
        id: 201,
        title: "Introduction to Grover's Algorithm",
        description: "Learn how quantum computers can search unstructured databases quadratically faster than classical computers.",
        difficulty: "Intermediate",
        lessonContent: (
          <div>
            <h3 style={{ fontSize: "20px", color: "var(--text-primary)", marginBottom: "12px" }}>Unstructured Search</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
              Grover's algorithm provides a quadratic speedup over classical algorithms for searching an unstructured database. It uses amplitude amplification to increase the probability of measuring the correct state.
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
              <i>(More subtopics and content will be added here soon.)</i>
            </p>
          </div>
        ),
        practiceGoal: "Explore the core concepts of amplitude amplification.",
        quizzes: []
      },
      {
        id: 202,
        title: "Introduction to Shor's Algorithm",
        description: "Explore the algorithm that factors large integers exponentially faster, threatening modern cryptography.",
        difficulty: "Advanced",
        lessonContent: (
          <div>
            <h3 style={{ fontSize: "20px", color: "var(--text-primary)", marginBottom: "12px" }}>Integer Factorization</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
              Shor's algorithm can factorise large numbers exponentially faster than the best known classical algorithms by mapping the factoring problem to a period-finding problem using the Quantum Fourier Transform.
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
              <i>(More subtopics and content will be added here soon.)</i>
            </p>
          </div>
        ),
        practiceGoal: "Understand period finding and the Quantum Fourier Transform.",
        quizzes: []
      }
    ]
  },
];
"""

content = content.replace("  },\n];\n\nexport const getAllTutorials", "  },\n" + course_content + "\nexport const getAllTutorials")


with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done exact replace!")
