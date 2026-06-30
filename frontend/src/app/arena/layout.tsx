import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Arena',
  description: 'Test your quantum computing skills in the Arena. Solve quantum circuit puzzles, compete on the leaderboard, and earn badges.',
  openGraph: {
    title: 'Quantum Arena | Qlokam',
    description: 'Test your quantum computing skills in the Arena. Solve quantum circuit puzzles, compete on the leaderboard, and earn badges.',
  }
};

export default function ArenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
