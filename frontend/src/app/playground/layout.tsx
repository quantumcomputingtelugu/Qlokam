import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Circuit Playground',
  description: 'Design, simulate, and execute quantum circuits in your browser. Drag and drop quantum gates, visualize states on the Bloch sphere, and explore quantum algorithms.',
  openGraph: {
    title: 'Quantum Circuit Playground | Qlokam',
    description: 'Design, simulate, and execute quantum circuits in your browser. Drag and drop quantum gates, visualize states on the Bloch sphere, and explore quantum algorithms.',
  }
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
