import React from 'react';
import { contests } from './contests';

export type ArenaProblem = {
  id: string; // Unique string ID e.g., 'bell-state'
  number: number; // 1, 2, 3 for display ordering
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Master';
  points: number; // Rating gained upon solving
  description: React.ReactNode;
  constraints: string[];
  expectedDistribution: Record<string, number>;
};

export const getArenaProblems = (): ArenaProblem[] => {
  const problems: ArenaProblem[] = [];
  let counter = 1;
  const now = Date.now();

  contests.forEach((contest) => {
    if (now > contest.endTime) {
      contest.questions.forEach((q, index) => {
        if (q.type === 'circuit' && q.expectedProbs) {
          let diff: ArenaProblem['difficulty'] = 'Easy';
          let pts = 1;
          if (q.difficulty === 'medium') {
            diff = 'Medium';
            pts = 40;
          } else if (q.difficulty === 'hard') {
            diff = 'Hard';
            pts = 50;
          }
          
          problems.push({
            id: `${contest.id}-q${index}`,
            number: counter++,
            title: `[${contest.title}] Circuit Challenge ${index + 1}`,
            difficulty: diff,
            points: pts,
            description: (
              <div>
                <p style={{ fontSize: "16px", marginBottom: "12px" }}>{q.question}</p>
                {q.expectedOutputsText && (
                  <p style={{ color: "var(--text-secondary)" }}>
                    <strong>{q.expectedOutputsText}</strong>
                  </p>
                )}
              </div>
            ),
            constraints: [],
            expectedDistribution: q.expectedProbs
          });
        }
      });
    }
  });

  return problems;
};
