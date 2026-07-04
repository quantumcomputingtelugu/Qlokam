export type ContestQuestion = {
  type: "mcq" | "circuit";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  // For MCQ
  options?: string[];
  correctAnswerIndex?: number;
  // For Circuit
  expectedOutputsText?: string;
  expectedProbs?: Record<string, number>;
  explanation?: string;
};

export type Contest = {
  id: string;
  title: string;
  description: string;
  startTime: number; // Unix timestamp in ms
  endTime: number;   // Unix timestamp in ms
  timeLimitMinutes: number;
  questions: ContestQuestion[];
};

export const contests: Contest[] = [
  {
    id: "easy-contest-1",
    title: "Easy Contest",
    description: "Welcome to the Easy Contest! Complete 5 questions (2 MCQs, 3 Circuits) within 10 minutes to rank on the leaderboard and earn huge rating boosts.",
    startTime: 1783251000000, // July 5, 2026 5:00 PM IST
    endTime: 1783252800000,   // July 5, 2026 5:30 PM IST
    timeLimitMinutes: 10,

    questions: [
      {
        type: "mcq",
        difficulty: "easy",
        question: "Dummy MCQ 1?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswerIndex: 0,
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: "Dummy MCQ 2?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswerIndex: 1,
      },
      {
        type: "circuit",
        difficulty: "medium",
        question: "Dummy Circuit 1: Build a circuit that does X.",
        expectedOutputsText: "Output: Measure q0.",
        expectedProbs: { "1": 1.0 },
      },
      {
        type: "circuit",
        difficulty: "medium",
        question: "Dummy Circuit 2: Build a circuit that does Y.",
        expectedOutputsText: "Output: Measure q0.",
        expectedProbs: { "1": 1.0 },
      },
      {
        type: "circuit",
        difficulty: "hard",
        question: "Dummy Circuit 3: Build a circuit that does Z.",
        expectedOutputsText: "Output: Measure q0 and q1.",
        expectedProbs: { "11": 1.0 },
      }
    ]
  }
];
