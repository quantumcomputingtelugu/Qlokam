import React from 'react';

export default function TutorialsPage() {
  const tutorials = [
    {
      id: 1,
      title: 'Introduction to Qubits',
      description: 'Learn the fundamentals of quantum bits, superposition, and how they differ from classical bits.',
      difficulty: 'Beginner',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Quantum Gates: Pauli-X, Y, and Z',
      description: 'Understand single-qubit rotations and how to manipulate quantum states.',
      difficulty: 'Beginner',
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'The Hadamard Gate and Superposition',
      description: 'Create your first superposition state and learn about interference.',
      difficulty: 'Beginner',
      status: 'Not Started'
    },
    {
      id: 4,
      title: 'Entanglement and the CNOT Gate',
      description: 'Dive into two-qubit gates and the spooky action at a distance: Quantum Entanglement.',
      difficulty: 'Intermediate',
      status: 'Not Started'
    },
  ];

  return (
    <div className="container" style={{ paddingTop: '24px', display: 'flex', gap: '24px', height: 'calc(100vh - 100px)' }}>
      
      {/* Left Panel: Tutorial List */}
      <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', color: 'var(--accent-primary)' }}>Quantum Tutorials</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tutorials.map((tutorial) => (
            <div 
              key={tutorial.id} 
              style={{ 
                padding: '16px', 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--surface-border)', 
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className="tutorial-card"
            >
              <div className="flex-between" style={{ marginBottom: '8px' }}>
                <h3 style={{ fontSize: '16px', margin: 0, color: 'var(--text-primary)' }}>{tutorial.id}. {tutorial.title}</h3>
                <span style={{ 
                  fontSize: '12px', 
                  padding: '4px 8px', 
                  borderRadius: '12px',
                  background: tutorial.status === 'Completed' ? 'rgba(63, 185, 80, 0.2)' : tutorial.status === 'In Progress' ? 'rgba(210, 153, 34, 0.2)' : 'rgba(139, 148, 158, 0.2)',
                  color: tutorial.status === 'Completed' ? 'var(--success)' : tutorial.status === 'In Progress' ? '#d29922' : 'var(--text-secondary)'
                }}>
                  {tutorial.status}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>{tutorial.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Tutorial Content */}
      <div className="glass-panel" style={{ flex: 2, padding: '32px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', color: 'var(--accent-secondary)' }}>
          Currently Reading
        </div>
        <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--text-primary)' }}>1. Introduction to Qubits</h1>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '16px' }}>
          <p style={{ marginBottom: '16px' }}>
            Welcome to the quantum world! In classical computing, information is processed in bits, which can be either a <strong>0</strong> or a <strong>1</strong>. 
            However, quantum computing uses <strong>quantum bits</strong>, or <strong>qubits</strong>.
          </p>
          
          <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '16px' }}>Superposition</h3>
          <p style={{ marginBottom: '16px' }}>
            Unlike classical bits, qubits can exist in a state that is a combination of both 0 and 1 simultaneously. This property is known as <strong>superposition</strong>.
            Mathematically, a qubit&apos;s state $|\psi\rangle$ is represented as a linear combination of the computational basis states $|0\rangle$ and $|1\rangle$:
          </p>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace', textAlign: 'center', fontSize: '18px', color: 'var(--accent-primary)' }}>
            |\psi\rangle = \alpha|0\rangle + \beta|1\rangle
          </div>
          
          <p style={{ marginBottom: '16px' }}>
            Where $\alpha$ and $\beta$ are complex numbers, and their absolute squares represent the probability of measuring the qubit in state 0 or 1, respectively.
          </p>
          
          <div style={{ marginTop: '48px', padding: '24px', background: 'rgba(69, 243, 255, 0.05)', border: '1px solid rgba(69, 243, 255, 0.2)', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 16px 0', color: 'var(--accent-primary)' }}>Interactive Exercise</h4>
            <p style={{ margin: '0 0 16px 0' }}>Head over to the <strong>Playground</strong> and place a single qubit on the grid. Observe its default state!</p>
            <button className="btn-primary" style={{ padding: '8px 16px' }}>Go to Playground</button>
          </div>
        </div>
      </div>

    </div>
  );
}
