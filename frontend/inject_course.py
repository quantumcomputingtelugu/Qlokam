with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_course = """  {
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
"""

content = content.replace("    ],\n  },\n];", "    ],\n  },\n" + new_course + "];")

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected Fundamental Quantum Algorithms course successfully")
