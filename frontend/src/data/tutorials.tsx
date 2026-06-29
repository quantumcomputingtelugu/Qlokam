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
      }
    ]
  }
];

export const getAllTutorials = () => {
  return tutorialSessions.flatMap(session => session.modules);
};
