import React from 'react';

export type ArenaProblem = {
  id: string; // Unique string ID e.g., 'bell-state'
  number: number; // 1, 2, 3 for display ordering
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number; // Rating gained upon solving
  description: React.ReactNode;
  constraints: string[];
  expectedDistribution: Record<string, number>;
};

export const arenaProblems: ArenaProblem[] = [
  {
    id: 'prepare-bell-state',
    number: 1,
    title: 'Prepare a Bell State',
    difficulty: 'Easy',
    points: 10,
    description: (
      <>
        <p>A Bell state is a specific quantum state of two qubits that represents the simplest (and maximal) example of quantum entanglement.</p>
        <br/>
        <p><strong>Task:</strong></p>
        <p>Write a quantum circuit that prepares the state <code>(|00⟩ + |11⟩) / √2</code>.</p>
      </>
    ),
    constraints: [
      'You must use exactly 2 qubits.',
      'You may only use the H (Hadamard) and CX (CNOT) gates.'
    ],
    expectedDistribution: {
      '00': 0.5,
      '11': 0.5
    }
  },
  {
    id: 'pauli-x-gate',
    number: 2,
    title: 'Bit Flip (Pauli-X)',
    difficulty: 'Easy',
    points: 10,
    description: (
      <>
        <p>The Pauli-X gate is the quantum equivalent of the classical NOT gate.</p>
        <br/>
        <p><strong>Task:</strong></p>
        <p>Apply a Pauli-X gate to the first qubit so that it flips from |0⟩ to |1⟩.</p>
      </>
    ),
    constraints: [
      'Use exactly 1 qubit.'
    ],
    expectedDistribution: {
      '1': 1.0
    }
  }
];
