import sys

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

bell_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"]]} /></div>\n'
tele_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={3} initialGates={[["", "H", ""], ["", "CX_0", "CX_1"], ["CX_0", "CX_1", ""], ["H", "", ""], ["", "", "CX_1"], ["", "CX_0", ""]]} /></div>\n'
sdc_circuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"], ["", ""], ["", ""], ["CX_0", "CX_1"], ["H", ""]] } /></div>\n'

# Adjusting to 0-indexed line numbers
# Bell 1: 6933 to 7196
# Bell 2: 7496 to 7766
# Teleportation: 8080 to 8585
# Superdense: 9104 to 9711

# Reverse order replacements!
lines = lines[:9104-1] + [sdc_circuit] + lines[9711:]
lines = lines[:8080-1] + [tele_circuit] + lines[8585:]
lines = lines[:7496-1] + [bell_circuit] + lines[7766:]
lines = lines[:6933-1] + [bell_circuit] + lines[7196:]

content = "".join(lines)

# Add import if missing
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

print("Applied exact fixes!")
