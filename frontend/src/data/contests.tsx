export type ContestQuestion = {
  type: "mcq" | "circuit";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options?: string[];
  correctAnswerIndex?: number;
  expectedOutputsText?: string;
  expectedProbs?: Record<string, number>;
  explanation?: string;
};

export type Contest = {
  id: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  timeLimitMinutes: number;
  questions: ContestQuestion[];
};

export const contests: Contest[] = [
  {
    id: "easy-contest-1",
    title: "Easy Contest",
    description: "Welcome to the Easy Contest! Complete 5 questions (2 MCQs, 3 Circuits) within 10 minutes to rank on the leaderboard and earn huge rating boosts.",
    startTime: 1783251000000,
    endTime: 1783252800000,
    timeLimitMinutes: 10,
    questions: [
      {
        type: "mcq",
        difficulty: "easy",
        question: "Consider a 3-qubit circuit with a depth of 5: H(q0) -> CNOT(q0 as control, q1 as target) -> X(q2) -> CNOT(q1 as control, q2 as target) -> Z(q0). If the initial state is |000>, what is the final state vector equivalent of this unitary circuit?",
        options: [
          "(|001> - |110>) / √2",
          "(|011> + |100>) / √2",
          "(|000> + |111>) / √2",
          "(|101> - |010>) / √2"
        ],
        correctAnswerIndex: 0,
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: "Which of the following problems are known to be NP-Hard (or harder)? 1. Quantum Circuit Synthesis, 2. Travelling Salesman Problem, 3. Knapsack Problem, 4. Non-local Games.",
        options: [
          "2 and 3 only",
          "1, 2, and 3 only",
          "All of them (1, 2, 3, and 4)",
          "2, 3, and 4 only"
        ],
        correctAnswerIndex: 2,
      },
      {
        type: "circuit",
        difficulty: "easy",
        question: "Create the unnormalized state |1000> + |0111> using 4 qubits. (Format: |q0 q1 q2 q3>).",
        expectedOutputsText: "Expected: |1000> + |0111>",
        expectedProbs: { "1000": 0.5, "0111": 0.5 },
      },
      {
        type: "circuit",
        difficulty: "easy",
        question: "The CHSH game demonstrates quantum non-locality. To win optimally, Alice and Bob must share a Bell state. Build the circuit to prepare the standard Bell state |Φ+> = (|00> + |11>)/√2 on q0 and q1.",
        expectedOutputsText: "Expected: |00> and |11> with equal probability.",
        expectedProbs: { "00": 0.5, "11": 0.5 },
      },
      {
        type: "circuit",
        difficulty: "easy",
        question: "Implement the unitary operations for the Quantum Teleportation protocol on 3 qubits. Entangle q1 and q2, then perform Alice's operations on q0 and q1.",
        expectedOutputsText: "Expected states: 000, 100, 011, 111",
        expectedProbs: { "000": 0.25, "100": 0.25, "011": 0.25, "111": 0.25 },
      }
    ]
  }
];
