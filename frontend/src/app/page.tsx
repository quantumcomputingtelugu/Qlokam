import Link from 'next/link';
import QuantumBackground from '@/components/QuantumBackground';

export default function Home() {
  return (
    <>
      <QuantumBackground />
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', textAlign: 'center', gap: '32px' }}>
      
      <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '64px', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Master Quantum Computing<br />
          <span className="text-gradient">By Writing Code</span>
        </h1>
        
        <p style={{ fontSize: '20px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '600px' }}>
          Learn the principles of quantum mechanics, practice your skills with LeetCode-style challenges, and compete globally.
        </p>
        
        <div className="hero-buttons" style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <Link href="/tutorials" className="btn-primary" style={{ display: 'inline-block', fontSize: '18px', padding: '14px 32px' }}>
            Start Learning
          </Link>
          <Link href="/playground" className="btn-secondary" style={{ display: 'inline-block', fontSize: '18px', padding: '14px 32px' }}>
            Open Playground
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '64px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { title: "Learn (GFG Style)", desc: "Comprehensive tutorials and interactive articles covering everything from qubits to Shor's algorithm." },
          { title: "Code (LeetCode Style)", desc: "Solve quantum algorithm challenges in Qiskit and Cirq directly in your browser." },
          { title: "Playground (Quirk Style)", desc: "Visualize quantum states and build circuits with our interactive drag-and-drop tool." }
        ].map((feature, i) => (
          <div key={i} className="glass-panel" style={{ padding: '32px', width: '300px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ✨
            </div>
            <h3 style={{ fontSize: '20px' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{feature.desc}</p>
          </div>
        ))}
      </div>

    </div>
    </>
  );
}
