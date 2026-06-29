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

export const arenaProblems: ArenaProblem[] = [];
