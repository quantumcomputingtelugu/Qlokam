import React from 'react';

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
};

export type TutorialModule = {
  id: number; // Unique ID across ALL modules
  title: string;
  description: string;
  difficulty: string;
  lessonContent: React.ReactNode;
  practiceGoal: string;
  quizzes?: QuizQuestion[];
  isFinalTest?: boolean;
  badgeAward?: string;
  pointsAward?: number;
  subModules?: TutorialModule[];
};

export interface TutorialSession {
  id: string; // e.g. "course-basics"
  sessionName: string;
  badge?: 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Master';
  modules: TutorialModule[];
};

export const tutorialSessions: TutorialSession[] = [
  {
    id: "course-basics",
    sessionName: "Quantum Computing Basics",
    badge: 'Easy',
    modules: [
      {
        id: 1,
        title: 'Introduction to Quantum Computing',
        description: 'Learn the fundamentals of quantum bits, superposition, and how they differ from classical bits.',
        difficulty: 'Beginner',
        lessonContent: (
          <>
            <p style={{ marginBottom: '16px', fontSize: '18px', color: 'var(--text-secondary)' }}>
              Welcome to the first module in <strong>Quantum Computing Basics</strong>! In this module, we will explore what makes a quantum computer so fundamentally different from the classical computers we use every day.
            </p>
            
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>What&apos;s Inside This Module</h3>
            
            <ul style={{ paddingLeft: '20px', marginBottom: '32px', color: 'var(--text-secondary)' }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>What is quantum computing:</strong> The fundamental unit of quantum information, capable of superposition.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Use cases:</strong> Real world applications of quantum computing.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Myths about Quantum Computing:</strong> We separate the science fiction from the science fact.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Quiz:</strong> Test your knowledge of everything in this module!
              </li>
            </ul>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', color: 'white' }}>How to navigate</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                In the sidebar to your left, simply click on this lesson button to reveal subtopics. You can navigate freely between these subtopics to learn at your own pace!
              </p>
            </div>
          </>
        ),
        practiceGoal: 'Review the module overview and continue to the subtopics.',
        subModules: [
          {
            id: 2,
            title: 'What is quantum computing',
            description: 'Learn the fundamentals of quantum bits and superposition.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  Welcome to the quantum world! In classical computing, information is processed in bits, which can be either a <strong>0</strong> or a <strong>1</strong>. 
                  However, quantum computing uses <strong>quantum bits</strong>, or <strong>qubits</strong>.
                </p>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Superposition</h3>
                <p style={{ marginBottom: '16px' }}>
                  Unlike classical bits, qubits can exist in a state that is a combination of both 0 and 1 simultaneously. This property is known as <strong>superposition</strong>.
                  Mathematically, a qubit&apos;s state $|\psi\rangle$ is represented as a linear combination of the computational basis states $|0\rangle$ and $|1\rangle$:
                </p>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace', textAlign: 'center', fontSize: '18px', color: 'var(--accent-primary)' }}>
                  |\psi\rangle = \alpha|0\rangle + \beta|1\rangle
                </div>
              </>
            ),
            practiceGoal: 'Place a single qubit in superposition by dragging a Hadamard (H) gate onto it!'
          },
          {
            id: 3,
            title: 'Use cases',
            description: 'Explore the real-world applications of quantum computers.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  While quantum computers are still in their infancy, they hold immense potential for solving problems that are currently intractable for classical computers. 
                </p>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Drug Discovery & Materials Science</h3>
                <p style={{ marginBottom: '16px' }}>
                  Simulating molecular interactions is incredibly complex because the number of quantum states grows exponentially. Quantum computers are naturally suited to simulate quantum mechanics, which could revolutionize how we discover new medicines and design new materials (like better batteries).
                </p>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Optimization & Logistics</h3>
                <p style={{ marginBottom: '16px' }}>
                  Finding the most efficient route for thousands of delivery trucks, or optimizing financial portfolios, are tasks that could eventually be dramatically accelerated by quantum algorithms.
                </p>
              </>
            ),
            practiceGoal: 'Review the use cases and continue to the next lesson.'
          },
          {
            id: 4,
            title: 'Myths about Quantum Computing',
            description: 'Debunk common misconceptions about quantum computers and how they actually work.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  Quantum computing sounds like science fiction, which naturally leads to many myths and misconceptions.
                </p>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Myth 1: Quantum computers will replace all classical computers</h3>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Reality:</strong> Quantum computers are highly specialized machines. They are exceptionally good at specific tasks, but they are actually <em>slower</em> than your laptop for everyday tasks like browsing the web or sending emails.
                </p>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Myth 2: They try all possibilities at once</h3>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Reality:</strong> While superposition allows qubits to represent many states simultaneously, a quantum computer does not simply "try all paths at once." Instead, quantum algorithms use <strong>interference</strong> to amplify the correct answer and cancel out the wrong ones—much like ripples on a pond.
                </p>
              </>
            ),
            practiceGoal: 'Review the myths and continue to the quiz.'
          },
          {
            id: 5,
            title: 'Quiz',
            description: 'Test your knowledge on the basics of quantum computing.',
            difficulty: 'Beginner',
            lessonContent: (
              <>
                <p style={{ marginBottom: '16px' }}>
                  Ready to test what you&apos;ve learned? Answer the questions below to complete this module!
                </p>
              </>
            ),
            practiceGoal: 'Pass the quiz!',
            quizzes: [
              {
                question: "What is a qubit?",
                options: [
                  "A classical bit that can only be 0 or 1",
                  "A quantum bit that can exist in a superposition of 0 and 1",
                  "A very fast classical computer"
                ],
                correctAnswerIndex: 1,
                explanation: "Unlike classical bits, qubits leverage quantum mechanics to exist in a state of superposition."
              },
              {
                question: "Are quantum computers going to replace your personal laptop?",
                options: [
                  "Yes, because they are faster at everything.",
                  "No, because they are specialized for specific types of complex problems.",
                  "Yes, they are just the next generation of processors."
                ],
                correctAnswerIndex: 1,
                explanation: "Quantum computers excel at certain mathematical and simulation problems but are not designed for general-purpose computing."
              }
            ]
          }
        ]
      }
    ]
  }
];

export const getAllTutorials = (): TutorialModule[] => {
  const flatten = (modules: TutorialModule[]): TutorialModule[] => {
    return modules.reduce((acc: TutorialModule[], module: TutorialModule) => {
      acc.push(module);
      if (module.subModules) {
        acc.push(...flatten(module.subModules));
      }
      return acc;
    }, []);
  };
  return tutorialSessions.flatMap(session => flatten(session.modules));
};
