"use client";

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NUM_QUBITS = 12;
const NUM_STEPS = 20;
const GATES = ['H', 'X', 'Y', 'Z', 'CX'];

export default function VisualPlayground() {
  const [language, setLanguage] = useState<'qiskit' | 'cirq'>('qiskit');
  const [numQubits, setNumQubits] = useState(3);
  const [grid, setGrid] = useState<string[][]>(Array(3).fill([]).map(() => Array(NUM_STEPS).fill('')));
  const [draggedGate, setDraggedGate] = useState<string | null>(null);
  const [probabilities, setProbabilities] = useState<Record<string, number>>({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [generatedCode, setGeneratedCode] = useState('');

  const addQubit = () => {
    if (numQubits >= 16) {
      alert("Maximum of 16 qubits allowed in the playground.");
      return;
    }
    setNumQubits(prev => prev + 1);
    setGrid(prev => [...prev, Array(NUM_STEPS).fill('')]);
  };

  const handleDragStart = (e: React.DragEvent, gate: string) => {
    setDraggedGate(gate);
    e.dataTransfer.setData('gate', gate);
  };

  const handleDrop = (e: React.DragEvent, qIdx: number, sIdx: number) => {
    e.preventDefault();
    const gate = e.dataTransfer.getData('gate');
    if (!gate) return;

    const newGrid = [...grid];
    newGrid[qIdx] = [...newGrid[qIdx]];
    
    if (gate === 'CX' && qIdx === numQubits - 1) {
      alert("Cannot place CNOT control on the last qubit (needs a target below it).");
      return;
    }
    
    newGrid[qIdx][sIdx] = gate;
    setGrid(newGrid);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const removeGate = (qIdx: number, sIdx: number) => {
    const newGrid = [...grid];
    newGrid[qIdx] = [...newGrid[qIdx]];
    newGrid[qIdx][sIdx] = '';
    setGrid(newGrid);
  };

  useEffect(() => {
    const runCircuit = async () => {
      setIsExecuting(true);
      setErrorMsg('');
      
      let pythonCode = '';
      let displayCode = '';

      if (language === 'qiskit') {
        pythonCode = `
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
import json

qc = QuantumCircuit(${numQubits})
`;
        displayCode = `from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(${numQubits})\n`;

        for (let sIdx = 0; sIdx < NUM_STEPS; sIdx++) {
          for (let qIdx = 0; qIdx < numQubits; qIdx++) {
            const gate = grid[qIdx][sIdx];
            if (gate === 'H') { pythonCode += `qc.h(${qIdx})\n`; displayCode += `qc.h(${qIdx})\n`; }
            else if (gate === 'X') { pythonCode += `qc.x(${qIdx})\n`; displayCode += `qc.x(${qIdx})\n`; }
            else if (gate === 'Y') { pythonCode += `qc.y(${qIdx})\n`; displayCode += `qc.y(${qIdx})\n`; }
            else if (gate === 'Z') { pythonCode += `qc.z(${qIdx})\n`; displayCode += `qc.z(${qIdx})\n`; }
            else if (gate === 'CX') { pythonCode += `qc.cx(${qIdx}, ${qIdx + 1})\n`; displayCode += `qc.cx(${qIdx}, ${qIdx + 1})\n`; }
          }
        }
        pythonCode += `
try:
    sv = Statevector(qc)
    probs = sv.probabilities_dict()
    filtered_probs = {k: v for k, v in probs.items() if v > 1e-5}
    print("##JSON_START##")
    print(json.dumps(filtered_probs))
    print("##JSON_END##")
except Exception as e:
    print("ERROR:", str(e))
`;
      } else if (language === 'cirq') {
        pythonCode = `
import cirq
import json
import numpy as np

qubits = [cirq.LineQubit(i) for i in range(${numQubits})]
circuit = cirq.Circuit()
`;
        displayCode = `import cirq\n\nqubits = [cirq.LineQubit(i) for i in range(${numQubits})]\ncircuit = cirq.Circuit()\n`;

        for (let sIdx = 0; sIdx < NUM_STEPS; sIdx++) {
          for (let qIdx = 0; qIdx < numQubits; qIdx++) {
            const gate = grid[qIdx][sIdx];
            if (gate === 'H') { pythonCode += `circuit.append(cirq.H(qubits[${qIdx}]))\n`; displayCode += `circuit.append(cirq.H(qubits[${qIdx}]))\n`; }
            else if (gate === 'X') { pythonCode += `circuit.append(cirq.X(qubits[${qIdx}]))\n`; displayCode += `circuit.append(cirq.X(qubits[${qIdx}]))\n`; }
            else if (gate === 'Y') { pythonCode += `circuit.append(cirq.Y(qubits[${qIdx}]))\n`; displayCode += `circuit.append(cirq.Y(qubits[${qIdx}]))\n`; }
            else if (gate === 'Z') { pythonCode += `circuit.append(cirq.Z(qubits[${qIdx}]))\n`; displayCode += `circuit.append(cirq.Z(qubits[${qIdx}]))\n`; }
            else if (gate === 'CX') { pythonCode += `circuit.append(cirq.CNOT(qubits[${qIdx}], qubits[${qIdx + 1}]))\n`; displayCode += `circuit.append(cirq.CNOT(qubits[${qIdx}], qubits[${qIdx + 1}]))\n`; }
          }
        }
        pythonCode += `
try:
    simulator = cirq.Simulator()
    result = simulator.simulate(circuit)
    state_vector = result.final_state_vector
    probs = np.abs(state_vector)**2
    
    filtered_probs = {}
    for i, p in enumerate(probs):
        if p > 1e-5:
            bin_str = format(i, f'0{${numQubits}}b')
            filtered_probs[bin_str] = float(p)
            
    print("##JSON_START##")
    print(json.dumps(filtered_probs))
    print("##JSON_END##")
except Exception as e:
    print("ERROR:", str(e))
`;
      }

      setGeneratedCode(displayCode);

      try {
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
        const response = await fetch(`${BACKEND_URL}/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: pythonCode, language }),
        });
        const data = await response.json();
        if (data.success && data.output) {
          const match = (data.output as string).match(/##JSON_START##\s*([\s\S]*?)\s*##JSON_END##/);
          if (match && match[1]) {
            setProbabilities(JSON.parse(match[1]));
          } else {
            setErrorMsg("Could not parse output: " + data.output);
          }
        } else {
          setErrorMsg(data.error || "Execution failed");
        }
      } catch (err: unknown) {
        setErrorMsg("Backend connection failed.");
      }
      setIsExecuting(false);
    };

    const isEmpty = grid.every(row => row.every(cell => cell === ''));
    if (isEmpty) {
      setTimeout(() => {
        setProbabilities({ ['0'.repeat(numQubits)]: 1.0 });
        setGeneratedCode('# Drag gates onto the grid to generate code!');
      }, 0);
    } else {
      runCircuit();
    }
  }, [grid, language, numQubits]);

  const chartData = {
    labels: Object.keys(probabilities).sort(),
    datasets: [
      {
        label: 'Probability',
        data: Object.keys(probabilities).sort().map(k => probabilities[k] * 100),
        backgroundColor: 'rgba(69, 243, 255, 0.6)',
        borderColor: '#45f3ff',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Measurement Probabilities (%)', color: '#e0e6ed' },
    },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { color: '#8b949e' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      x: { ticks: { color: '#e0e6ed' }, grid: { display: false } }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      <div className="flex-between">
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value as 'qiskit' | 'cirq')}
          className="editor-select"
          style={{ padding: '8px', borderRadius: '4px', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--surface-border)' }}
        >
          <option value="qiskit">Qiskit Engine</option>
          <option value="cirq">Cirq Engine</option>
        </select>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{isExecuting ? 'Executing...' : 'Ready'}</div>
      </div>
      
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', flex: 1 }}>
        
        {/* Top Panel: Palette and Circuit Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Gate Palette */}
          <div className="glass-panel" style={{ padding: '12px' }}>
            <h3 style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Drag Gates:</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {GATES.map(gate => (
                <div 
                  key={gate}
                  draggable
                  onDragStart={(e) => handleDragStart(e, gate)}
                  style={{ 
                    width: '36px', height: '36px', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    border: '1px solid var(--surface-border)', 
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'grab',
                    fontWeight: 'bold', fontSize: '14px',
                    color: gate === 'CX' ? 'var(--accent-secondary)' : 'var(--accent-primary)'
                  }}
                >
                  {gate}
                </div>
              ))}
            </div>
          </div>

          {/* Circuit Grid */}
          <div className="glass-panel" style={{ padding: '16px', overflow: 'auto', maxHeight: '600px', position: 'relative' }}>
             <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px' }}>
                {grid.map((row, qIdx) => (
                  <div key={qIdx} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '32px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-secondary)' }}>|q{qIdx}⟩</div>
                    <div style={{ display: 'flex', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
                      {row.map((cell, sIdx) => {
                        const isCXTarget = qIdx > 0 && grid[qIdx - 1][sIdx] === 'CX';
                        const isOccupied = cell !== '' || isCXTarget;

                        return (
                          <div 
                            key={sIdx}
                            onDrop={(e) => {
                              if (!isCXTarget) handleDrop(e, qIdx, sIdx);
                            }}
                            onDragOver={handleDragOver}
                            onClick={() => {
                              if (isCXTarget) removeGate(qIdx - 1, sIdx);
                              else if (cell) removeGate(qIdx, sIdx);
                            }}
                            style={{
                              width: '32px', height: '32px',
                              margin: '0 2px',
                              background: (cell && cell !== 'CX') ? 'var(--surface-color)' : 'transparent',
                              border: (cell && cell !== 'CX') ? '1px solid var(--accent-primary)' : 'none',
                              borderRadius: '4px',
                              zIndex: 1,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: isOccupied ? 'pointer' : 'default',
                              fontWeight: 'bold', fontSize: '12px',
                              color: 'var(--accent-primary)',
                              position: 'relative'
                            }}
                          >
                            {/* Standard Gates */}
                            {cell && cell !== 'CX' && cell}
                            
                            {/* CX Control (Dot) */}
                            {cell === 'CX' && (
                              <div style={{ 
                                width: '10px', height: '10px', 
                                background: 'var(--accent-secondary)', 
                                borderRadius: '50%', 
                                zIndex: 2 
                              }} />
                            )}
                            
                            {/* Vertical Line for CX */}
                            {cell === 'CX' && (
                              <div style={{ 
                                position: 'absolute', top: '50%', left: '15px', 
                                width: '2px', height: '36px', 
                                background: 'var(--accent-secondary)', 
                                zIndex: -1 
                              }} />
                            )}

                            {/* CX Target (Cross in Circle) */}
                            {isCXTarget && (
                              <div style={{
                                width: '20px', height: '20px',
                                border: '2px solid var(--accent-secondary)',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'var(--background)',
                                zIndex: 2
                              }}>
                                <div style={{ position: 'absolute', width: '20px', height: '2px', background: 'var(--accent-secondary)' }} />
                                <div style={{ position: 'absolute', width: '2px', height: '20px', background: 'var(--accent-secondary)' }} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
             </div>
             
             {/* Add Qubit Button */}
             <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
               <div style={{ width: '32px' }} /> {/* spacer */}
               <button 
                 onClick={addQubit}
                 style={{ 
                   background: 'rgba(255,255,255,0.05)', 
                   border: '1px solid rgba(255,255,255,0.1)', 
                   color: 'var(--text-secondary)',
                   borderRadius: '4px', padding: '4px 12px', fontSize: '12px',
                   cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                 }}
               >
                 + Add Qubit
               </button>
             </div>

          </div>
        </div>

        {/* Bottom Panel: Visualization and Code */}
        <div style={{ display: 'flex', gap: '16px', minHeight: '250px' }}>
          
          <div className="glass-panel" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Generated Code</h3>
            <pre style={{ flex: 1, margin: 0, padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', overflowY: 'auto', color: '#e6edf3', fontSize: '12px', fontFamily: 'Consolas, monospace' }}>
              {generatedCode}
            </pre>
          </div>

          <div className="glass-panel" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
            {errorMsg && (
              <div style={{ padding: '8px', background: 'rgba(248, 81, 73, 0.1)', border: '1px solid var(--error)', borderRadius: '8px', color: 'var(--error)', fontSize: '12px', marginBottom: '8px', whiteSpace: 'pre-wrap' }}>
                {errorMsg}
              </div>
            )}
            <div style={{ flex: 1 }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
