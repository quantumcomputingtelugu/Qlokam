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
};

export type TutorialSession = {
  sessionName: string;
  modules: TutorialModule[];
};

export const tutorialSessions: TutorialSession[] = [
  {
    sessionName: "Quantum Fundamentals",
    modules: [
      {
        id: 1,
        title: 'Introduction to Qubits',
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
        title: 'Quantum Gates: Pauli-X, Y, and Z',
        description: 'Understand single-qubit rotations and how to manipulate quantum states.',
        difficulty: 'Beginner',
        lessonContent: (
          <>
            <p style={{ marginBottom: '16px' }}>
              The Pauli gates act as rotations on the Bloch sphere. They are fundamental single-qubit operations.
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Pauli-X:</strong> Often called the quantum NOT gate. It flips |0⟩ to |1⟩ and vice versa.</li>
              <li style={{ marginBottom: '8px' }}><strong>Pauli-Y:</strong> A rotation around the Y axis of the Bloch sphere.</li>
              <li style={{ marginBottom: '8px' }}><strong>Pauli-Z:</strong> Leaves |0⟩ unchanged, but flips the phase of |1⟩ to -|1⟩.</li>
            </ul>
          </>
        ),
        practiceGoal: 'Apply a Pauli-X gate to flip a qubit from |0> to |1>.',
        quizzes: [
          {
            question: "Which Pauli gate acts as the quantum equivalent of the classical NOT gate?",
            options: ["Pauli-X", "Pauli-Y", "Pauli-Z", "Hadamard"],
            correctAnswerIndex: 0,
            explanation: "The Pauli-X gate flips the state of a qubit from |0> to |1>, or |1> to |0>."
          }
        ]
      },
      {
        id: 3,
        title: 'Entanglement and CNOT',
        description: 'Dive into two-qubit gates and the spooky action at a distance: Quantum Entanglement.',
        difficulty: 'Intermediate',
        lessonContent: (
          <>
            <p style={{ marginBottom: '16px' }}>
              Entanglement is a unique quantum phenomenon where two qubits become inextricably linked.
            </p>
            <p style={{ marginBottom: '16px' }}>
              The <strong>CNOT (Controlled-NOT)</strong> gate flips the state of a target qubit ONLY if the control qubit is in the |1⟩ state.
            </p>
          </>
        ),
        practiceGoal: 'Create a Bell State! Place an H gate on q0, and a CX gate with control on q0 and target on q1.',
        quizzes: []
      }
    ]
  },
  {
    sessionName: "Error Correction & Hardware",
    modules: [
      {
        id: 4,
        title: "Quantum Error Correction (Placeholder)",
        description: "Learn how we protect fragile quantum information from decoherence.",
        difficulty: "Advanced",
        lessonContent: (
          <>
            <p>This is a placeholder for your future Error Correction lesson!</p>
          </>
        ),
        practiceGoal: "Explore the 3-qubit bit-flip code.",
        quizzes: []
      }
    ]
  }
];

export const getAllTutorials = () => {
  return tutorialSessions.flatMap(session => session.modules);
};
