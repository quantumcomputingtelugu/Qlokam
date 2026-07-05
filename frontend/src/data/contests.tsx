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
        question: "Consider a 3-qubit circuit with a depth of 5: H on q0, followed by CNOT(control: q0, target: q1), followed by X on q2, followed by CNOT(control: q1, target: q2), followed by Z on q0. What is the equivalent unitary operator matrix for the entire circuit? (Assume time goes left to right, matrix multiplication goes right to left)",
        options: [
          "[\n [0.0, 0.0, 0.0, 0.0, 0.71, 0.71, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.71, 0.71],\n [0.0, 0.0, 0.71, 0.71, 0.0, 0.0, 0.0, 0.0],\n [-0.71, 0.71, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],\n [0.71, 0.71, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, -0.71, 0.71, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.71, 0.71],\n [0.0, 0.0, 0.0, 0.0, -0.71, 0.71, 0.0, 0.0]\n]",
          "[\n [0.71, 0.71, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.71, -0.71, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.71, 0.71, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.71, -0.71],\n [0.0, 0.0, 0.0, 0.0, -0.71, -0.71, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.71, 0.71],\n [-0.71, -0.71, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, -0.71, 0.71, 0.0, 0.0, 0.0, 0.0]\n]",
          "[\n [0.0, 0.0, 0.71, 0.71, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.71, -0.71],\n [0.71, 0.71, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.71, 0.71, 0.0, 0.0],\n [-0.71, 0.71, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, -0.71, 0.71, 0.0, 0.0],\n [0.0, 0.0, -0.71, 0.71, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.71, -0.71]\n]",
          "[\n [0.0, 0.0, 0.0, 0.0, 0.71, -0.71, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.71, 0.71],\n [0.71, -0.71, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.71, 0.71, 0.0, 0.0, 0.0, 0.0],\n [0.71, 0.71, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.71, -0.71, 0.0, 0.0, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.71, 0.71, 0.0, 0.0],\n [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.71, -0.71]\n]"
        ],
        correctAnswerIndex: 0,
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: "Which of the following problems is generally classified as NP-Hard (or harder), whereas the others (TSP, Knapsack) are famously NP-Complete? 1. Quantum Circuit Synthesis, 2. Travelling Salesman Problem, 3. Knapsack Problem",
        options: [
          "1 only",
          "2 and 3 only",
          "1, 2, and 3",
          "None of the above"
        ],
        correctAnswerIndex: 0,
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
        question: "Implement the Superdense Coding protocol to transmit the classical message '11'. Prepare a Bell state |Φ+> on q0 and q1, apply the necessary encoding gates on q0 to send '11' (X and Z), and finally apply the decoding operations on q0 and q1 (CX then H).",
        expectedOutputsText: "Expected output: |11> with 100% probability.",
        expectedProbs: { "11": 1.0 },
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
