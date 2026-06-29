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
        ]
      },
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
];

export const getAllTutorials = () => {
  return tutorialSessions.flatMap(session => session.modules);
};
