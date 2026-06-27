import React from 'react';

export type ArenaProblem = {
  id: string; // Unique string ID e.g., 'bell-state'
  number: number; // 1, 2, 3 for display ordering
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number; // Rating gained upon solving
  description: React.ReactNode;
  constraints: string[];
  initialCode: string;
  expectedOutputSubstring: string; // VERY basic verification for now: if output contains this string, it's correct.
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
    initialCode: 
`from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

circuit = QuantumCircuit(2, 2)

# Write your code here:


# Do not modify the measurement below
circuit.measure([0, 1], [0, 1])

sampler = StatevectorSampler()
job = sampler.run([circuit])
result = job.result()[0]
counts = result.data.meas.get_counts()

print("Circuit Output Counts:", counts)`,
    expectedOutputSubstring: "'00':" // basic validation that they ran a circuit that produced 00 (and 11, but '00' is enough for a mock check)
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
    initialCode: 
`from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

circuit = QuantumCircuit(1, 1)

# Write your code here:


circuit.measure([0], [0])

sampler = StatevectorSampler()
job = sampler.run([circuit])
counts = job.result()[0].data.meas.get_counts()

print("Circuit Output Counts:", counts)`,
    expectedOutputSubstring: "'1':"
  }
];
