import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Computing Tutorials',
  description: 'Interactive quantum computing tutorials. Learn qubits, superposition, quantum gates, entanglement, and more with our visual guides and quizzes.',
  openGraph: {
    title: 'Quantum Computing Tutorials | Qlokam',
    description: 'Interactive quantum computing tutorials. Learn qubits, superposition, quantum gates, entanglement, and more with our visual guides and quizzes.',
  }
};

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
