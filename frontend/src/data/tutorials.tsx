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

export type TutorialSession = {
  id: string; // e.g. "course-basics"
  sessionName: string;
  modules: TutorialModule[];
};

export const tutorialSessions: TutorialSession[] = [
  {
    id: "course-basics",
    sessionName: "Quantum Computing Basics",
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
                <strong style={{ color: 'var(--accent-primary)' }}>Introduction to Qubits:</strong> The fundamental unit of quantum information, capable of superposition.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Superposition:</strong> How a qubit can exist in a state that is a combination of both 0 and 1 simultaneously.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>Myths about Quantum Computing:</strong> We separate the science fiction from the science fact in our subtopic lesson.
              </li>
            </ul>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', color: 'white' }}>How to navigate</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                In the sidebar to your left, you will see a <strong>▼ button</strong> on this module. Clicking it will reveal additional subtopics, such as <em>Myths about Quantum Computing</em>. You can navigate freely between these subtopics to learn at your own pace!
              </p>
            </div>
          </>
        ),
        practiceGoal: 'Place a single qubit in superposition by dragging a Hadamard (H) gate onto it!',
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
          }
        ],
        subModules: [
          {
            id: 2,
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
                  <strong>Reality:</strong> Quantum computers are highly specialized machines. They are exceptionally good at specific tasks (like factoring large numbers or simulating molecules), but they are actually <em>slower</em> than your laptop for everyday tasks like browsing the web or sending emails.
                </p>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Myth 2: They try all possibilities at once</h3>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Reality:</strong> While superposition allows qubits to represent many states simultaneously, a quantum computer does not simply "try all paths at once." Instead, quantum algorithms use <strong>interference</strong> to amplify the correct answer and cancel out the wrong ones—much like ripples on a pond.
                </p>
              </>
            ),
            practiceGoal: 'Review the myths and proceed to the quiz.',
            quizzes: [
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
