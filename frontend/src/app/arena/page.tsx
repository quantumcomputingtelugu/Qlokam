"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import VisualPlayground from '@/components/VisualPlayground';

export default function ArenaPage() {
  const [language, setLanguage] = useState('qiskit');
  const [code, setCode] = useState(
`from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

# Create a Quantum Circuit acting on the q register
circuit = QuantumCircuit(2, 2)

# Add a H gate on qubit 0
circuit.h(0)
# Add a CX (CNOT) gate on control qubit 0 and target qubit 1
circuit.cx(0, 1)

# Map the quantum measurement to the classical bits
circuit.measure([0, 1], [0, 1])

# Use StatevectorSampler to run the circuit
sampler = StatevectorSampler()
job = sampler.run([circuit])
result = job.result()[0]
counts = result.data.meas.get_counts()

print("Circuit Output Counts:", counts)`
  );
  const [output, setOutput] = useState('Output will appear here...');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'visual'>('code');

  const handleRunCode = async () => {
    setIsExecuting(true);
    setOutput('Running on Quantum Backend...');
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${BACKEND_URL}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      if (data.success) {
        setOutput(data.output || 'Execution complete with no output.');
      } else {
        setOutput(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setOutput(`Connection Error: Make sure the Python backend is running on port 8000.`);
    }
    setIsExecuting(false);
  };

  return (
    <div className="container" style={{ paddingTop: '24px', display: 'flex', gap: '24px', height: 'calc(100vh - 100px)' }}>
      
      {/* Left Panel: Problem Description */}
      <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '24px', color: 'var(--accent-primary)' }}>1. Prepare a Bell State</h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, overflowY: 'auto' }}>
          <p>A Bell state is a specific quantum state of two qubits that represents the simplest (and maximal) example of quantum entanglement.</p>
          <br/>
          <p><strong>Task:</strong></p>
          <p>Write a quantum circuit that prepares the state <code>(|00⟩ + |11⟩) / √2</code>.</p>
          <br/>
          <p><strong>Constraints:</strong></p>
          <ul>
            <li>You must use exactly 2 qubits.</li>
            <li>You may only use the <code>H</code> (Hadamard) and <code>CX</code> (CNOT) gates.</li>
          </ul>
        </div>
        <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Status</div>
          <div style={{ color: 'var(--success)' }}>● Not Submitted</div>
        </div>
      </div>

      {/* Right Panel: Editor / Builder & Output */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Editor Controls */}
        <div className="flex-between glass-panel" style={{ padding: '12px 24px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              onClick={() => setActiveTab('code')}
              style={{ background: 'none', border: 'none', color: activeTab === 'code' ? 'var(--accent-primary)' : 'var(--text-secondary)', fontWeight: activeTab === 'code' ? 'bold' : 'normal', cursor: 'pointer', borderBottom: activeTab === 'code' ? '2px solid var(--accent-primary)' : '2px solid transparent', paddingBottom: '4px' }}
            >
              Code Editor
            </button>
            <button 
              onClick={() => setActiveTab('visual')}
              style={{ background: 'none', border: 'none', color: activeTab === 'visual' ? 'var(--accent-primary)' : 'var(--text-secondary)', fontWeight: activeTab === 'visual' ? 'bold' : 'normal', cursor: 'pointer', borderBottom: activeTab === 'visual' ? '2px solid var(--accent-primary)' : '2px solid transparent', paddingBottom: '4px' }}
            >
              Visual Builder
            </button>
          </div>
          
          {activeTab === 'code' && (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <select 
                className="editor-select" 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="qiskit">Qiskit (Python)</option>
                <option value="cirq">Cirq (Python)</option>
              </select>
              <button className="btn-primary" onClick={handleRunCode} disabled={isExecuting}>
                {isExecuting ? 'Running...' : 'Run Code'}
              </button>
            </div>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'code' ? (
          <>
            <div className="glass-panel" style={{ flex: 2, overflow: 'hidden', padding: '16px 0' }}>
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'Consolas, "Courier New", monospace',
                  padding: { top: 16 }
                }}
              />
            </div>
            <div className="glass-panel" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Console Output</div>
              <pre style={{ flex: 1, background: '#0d1117', padding: '16px', borderRadius: '8px', overflowY: 'auto', color: '#e6edf3', margin: 0, fontFamily: 'Consolas, "Courier New", monospace' }}>
                {output}
              </pre>
            </div>
          </>
        ) : (
          <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <VisualPlayground />
          </div>
        )}

      </div>

    </div>
  );
}
