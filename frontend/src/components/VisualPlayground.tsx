/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
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

const NUM_STEPS = 20;
const GATES = ['H', 'X', 'Y', 'Z', 'CX', 'M', 'DEL'];

interface VisualPlaygroundProps {
  arenaMode?: boolean;
  arenaProblemId?: string | null;
  onSubmit?: (probs: Record<string, number>) => void;
  submitStatus?: 'idle' | 'verifying' | 'success' | 'failed';
  disableSubmit?: boolean;
}

export default function VisualPlayground({ 
  arenaMode = false, 
  arenaProblemId = null,
  onSubmit, 
  submitStatus = 'idle',
  disableSubmit = false
}: VisualPlaygroundProps = {}) {
  const [language, setLanguage] = useState<'qiskit' | 'cirq'>('qiskit');
  const [numQubits, setNumQubits] = useState(3);
  const [grid, setGrid] = useState<string[][]>(Array(3).fill([]).map(() => Array(NUM_STEPS).fill('')));
  const [draggedGate, setDraggedGate] = useState<string | null>(null);
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [pendingCX, setPendingCX] = useState<{qIdx: number, sIdx: number} | null>(null);
  const [probabilities, setProbabilities] = useState<Record<string, number>>({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [code, setCode] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Source of truth flag
  const typeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset state when problem changes
  useEffect(() => {
    if (arenaMode && arenaProblemId) {
      setGrid(Array(3).fill([]).map(() => Array(NUM_STEPS).fill('')));
      setNumQubits(3);
      setProbabilities({});
      setErrorMsg('');
      setCode('');
      setPendingCX(null);
    }
  }, [arenaProblemId, arenaMode]);

  const addQubit = () => {
    if (numQubits >= 16) {
      alert("Maximum of 16 qubits allowed in the playground.");
      return;
    }
    setNumQubits(prev => prev + 1);
    setGrid(prev => [...prev, Array(NUM_STEPS).fill('')]);
    setIsTyping(false); // Let grid update the code
  };

  const handleDragStart = (e: React.DragEvent, gate: string) => {
    setDraggedGate(gate);
    e.dataTransfer.setData('gate', gate);
  };

  const handleDrop = (e: React.DragEvent, qIdx: number, sIdx: number) => {
    e.preventDefault();
    if (pendingCX) return; // Block drops while pending CX

    const gate = e.dataTransfer.getData('gate');
    if (!gate) return;

    if (gate === 'DEL') {
      const controlQubits: number[] = [];
      for (let i = 0; i < numQubits; i++) {
        const c = grid[i][sIdx];
        if (c && c.startsWith('CX|')) {
           const target = parseInt(c.split('|')[1], 10);
           if (target === qIdx) {
             controlQubits.push(i);
           }
        }
      }
      
      if (controlQubits.length > 0) {
        setIsTyping(false);
        setGrid(prevGrid => {
          const newGrid = [...prevGrid];
          controlQubits.forEach(c => {
             newGrid[c] = [...newGrid[c]];
             newGrid[c][sIdx] = '';
          });
          return newGrid;
        });
      } else if (grid[qIdx][sIdx]) {
        setIsTyping(false);
        setGrid(prevGrid => {
          const newGrid = [...prevGrid];
          newGrid[qIdx] = [...newGrid[qIdx]];
          newGrid[qIdx][sIdx] = '';
          return newGrid;
        });
      }
      return;
    }

    let finalGate = gate;

    if (gate === 'CX') {
      setPendingCX({ qIdx, sIdx });
      finalGate = 'CX_PENDING';
    }
    
    setIsTyping(false);
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[qIdx] = [...newGrid[qIdx]];
      newGrid[qIdx][sIdx] = finalGate;
      return newGrid;
    });
  };

  const handleDragOver = (e: React.DragEvent) => { 
    if (!pendingCX) e.preventDefault(); 
  };

  const removeGate = (qIdx: number, sIdx: number) => {
    setIsTyping(false);
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[qIdx] = [...newGrid[qIdx]];
      newGrid[qIdx][sIdx] = '';
      return newGrid;
    });
  };

  // 1. Grid -> Code
  useEffect(() => {
    if (isTyping) return;

    let displayCode = '';
    if (language === 'qiskit') {
      displayCode = `from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(${numQubits}, ${numQubits})\n`;
      for (let sIdx = 0; sIdx < NUM_STEPS; sIdx++) {
        for (let qIdx = 0; qIdx < numQubits; qIdx++) {
          const gate = grid[qIdx][sIdx];
          if (gate === 'H') displayCode += `qc.h(${qIdx})\n`;
          else if (gate === 'X') displayCode += `qc.x(${qIdx})\n`;
          else if (gate === 'Y') displayCode += `qc.y(${qIdx})\n`;
          else if (gate === 'Z') displayCode += `qc.z(${qIdx})\n`;
          else if (gate === 'M') displayCode += `qc.measure(${qIdx}, ${qIdx})\n`;
          else if (gate.startsWith('CX|')) {
             const target = gate.split('|')[1];
             displayCode += `qc.cx(${qIdx}, ${target})\n`;
          }
        }
      }
    } else if (language === 'cirq') {
      displayCode = `import cirq\n\nqubits = [cirq.LineQubit(i) for i in range(${numQubits})]\ncircuit = cirq.Circuit()\n`;
      for (let sIdx = 0; sIdx < NUM_STEPS; sIdx++) {
        for (let qIdx = 0; qIdx < numQubits; qIdx++) {
          const gate = grid[qIdx][sIdx];
          if (gate === 'H') displayCode += `circuit.append(cirq.H(qubits[${qIdx}]))\n`;
          else if (gate === 'X') displayCode += `circuit.append(cirq.X(qubits[${qIdx}]))\n`;
          else if (gate === 'Y') displayCode += `circuit.append(cirq.Y(qubits[${qIdx}]))\n`;
          else if (gate === 'Z') displayCode += `circuit.append(cirq.Z(qubits[${qIdx}]))\n`;
          else if (gate === 'M') displayCode += `circuit.append(cirq.measure(qubits[${qIdx}]))\n`;
          else if (gate.startsWith('CX|')) {
             const target = gate.split('|')[1];
             displayCode += `circuit.append(cirq.CNOT(qubits[${qIdx}], qubits[${target}]))\n`;
          }
        }
      }
    }
    setCode(displayCode);
  }, [grid, language, numQubits, isTyping]);

  // 2. Code -> Grid
  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode === undefined) return;
    setCode(newCode);
    setIsTyping(true);

    if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
    
    typeTimeoutRef.current = setTimeout(() => {
       const operations: { gate: string, q?: number, c?: number, t?: number }[] = [];
       let newNumQ = numQubits;
       const lines = newCode.split('\n');
       
       for (const line of lines) {
         const l = line.trim();
         if (language === 'qiskit') {
            const qcMatch = l.match(/qc\s*=\s*QuantumCircuit\((\d+)/);
            if (qcMatch) newNumQ = parseInt(qcMatch[1], 10);
            const singleGateMatch = l.match(/qc\.(h|x|y|z)\s*\(\s*(\d+)\s*\)/);
            if (singleGateMatch) operations.push({ gate: singleGateMatch[1].toUpperCase(), q: parseInt(singleGateMatch[2], 10) });
            const mMatch = l.match(/qc\.measure\(\s*(\d+)\s*,\s*\d+\s*\)/);
            if (mMatch) operations.push({ gate: 'M', q: parseInt(mMatch[1], 10) });
            const cxMatch = l.match(/qc\.cx\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
            if (cxMatch) operations.push({ gate: 'CX', c: parseInt(cxMatch[1], 10), t: parseInt(cxMatch[2], 10) });
         } else {
            const qMatch = l.match(/range\((\d+)\)/);
            if (qMatch) newNumQ = parseInt(qMatch[1], 10);
            const singleGateMatch = l.match(/cirq\.(H|X|Y|Z)\(qubits\[(\d+)\]\)/);
            if (singleGateMatch) operations.push({ gate: singleGateMatch[1].toUpperCase(), q: parseInt(singleGateMatch[2], 10) });
            const mMatch = l.match(/cirq\.measure\(qubits\[(\d+)\]\)/);
            if (mMatch) operations.push({ gate: 'M', q: parseInt(mMatch[1], 10) });
            const cxMatch = l.match(/cirq\.CNOT\(qubits\[(\d+)\],\s*qubits\[(\d+)\]\)/);
            if (cxMatch) operations.push({ gate: 'CX', c: parseInt(cxMatch[1], 10), t: parseInt(cxMatch[2], 10) });
         }
       }

       if (newNumQ !== numQubits && newNumQ > 0 && newNumQ <= 16) setNumQubits(newNumQ);

       const newGrid = Array(newNumQ).fill([]).map(() => Array(NUM_STEPS).fill(''));
       const nextFreeStep = Array(newNumQ).fill(0);
       
       for (const op of operations) {
         if (op.gate !== 'CX' && op.q !== undefined) {
           const q = op.q;
           if (q >= newNumQ) continue;
           const step = nextFreeStep[q];
           if (step < NUM_STEPS) {
             newGrid[q][step] = op.gate;
             nextFreeStep[q]++;
           }
         } else if (op.gate === 'CX' && op.c !== undefined && op.t !== undefined) {
           const c = op.c;
           const t = op.t;
           if (c >= newNumQ || t >= newNumQ || t === c) continue;
           const step = Math.max(nextFreeStep[c], nextFreeStep[t]);
           if (step < NUM_STEPS) {
             newGrid[c][step] = `CX|${t}`;
             nextFreeStep[c] = step + 1;
             nextFreeStep[t] = step + 1;
           }
         }
       }
       setGrid(newGrid);
    }, 500);
  };

  const executeCircuit = async (isSubmit = false) => {
    setIsExecuting(true);
    setErrorMsg('');
    
    // Extract measured qubits from the generated code
    const qiskitMMatch = [...code.matchAll(/qc\.measure\(\s*(\d+)/g)];
    const cirqMMatch = [...code.matchAll(/cirq\.measure\(qubits\[(\d+)\]\)/g)];
    const measuredSet = new Set([...qiskitMMatch, ...cirqMMatch].map(m => parseInt(m[1], 10)));
    const measuredQubits = Array.from(measuredSet).sort((a,b) => a-b);
    const hasMeasurements = measuredQubits.length > 0;

    // Strip measurements before sending to execution so that statevector does not collapse
    let safeCode = code;
    safeCode = safeCode.replace(/qc\.measure\([^)]*\)\n/g, '');
    safeCode = safeCode.replace(/circuit\.append\(cirq\.measure\([^)]*\)\)\n/g, '');

    let pythonCode = safeCode + '\n';

    if (language === 'qiskit') {
      pythonCode = `from qiskit.quantum_info import Statevector\nimport json\n` + pythonCode + `\n
try:
    sv = Statevector(qc)
    probs = sv.probabilities_dict()
    measured_indices = [${measuredQubits.join(', ')}]
    
    filtered_probs = {}
    for k, v in probs.items():
        if v > 1e-5:
            if measured_indices:
                # k has length numQubits, Qiskit prints q0 on the far right (index numQubits - 1).
                # To extract q_i, we look at k[numQubits - 1 - i]
                measured_bits = "".join([k[${numQubits} - 1 - idx] for idx in measured_indices])
                # Restore to Qiskit format where lowest measured index is on the right
                measured_bits = measured_bits[::-1]
                filtered_probs[measured_bits] = filtered_probs.get(measured_bits, 0) + float(v)
            else:
                filtered_probs[k] = float(v)

    print("##JSON_START##")
    print(json.dumps(filtered_probs))
    print("##JSON_END##")
except Exception as e:
    print("ERROR:", str(e))
`;
    } else if (language === 'cirq') {
      pythonCode = `import numpy as np\nimport json\n` + pythonCode + `\n
try:
    simulator = cirq.Simulator()
    result = simulator.simulate(circuit)
    state_vector = result.final_state_vector
    probs = np.abs(state_vector)**2
    
    measured_indices = [${measuredQubits.join(', ')}]
    filtered_probs = {}
    
    for i, p in enumerate(probs):
        if p > 1e-5:
            bin_str = format(i, f'0{${numQubits}}b')
            if measured_indices:
                # Cirq format has q0 on the far left (index 0)
                measured_bits = "".join([bin_str[idx] for idx in measured_indices])
                # To match Qiskit format (q0 on the far right), we reverse it
                measured_bits = measured_bits[::-1]
                filtered_probs[measured_bits] = filtered_probs.get(measured_bits, 0) + float(p)
            else:
                # Default reverse to match Qiskit
                rev_bin_str = bin_str[::-1]
                filtered_probs[rev_bin_str] = float(p)
            
    print("##JSON_START##")
    print(json.dumps(filtered_probs))
    print("##JSON_END##")
except Exception as e:
    print("ERROR:", str(e))
`;
    }

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
          const parsed = JSON.parse(match[1]);
          setProbabilities(parsed);
          if (isSubmit && onSubmit) {
            onSubmit(parsed);
          }
        } else {
          setErrorMsg("Could not parse output.");
          if (isSubmit && onSubmit) onSubmit({});
        }
      } else {
        setErrorMsg(data.error || "Execution failed");
        if (isSubmit && onSubmit) onSubmit({});
      }
    } catch (err: unknown) {
      setErrorMsg("Backend connection failed.");
      if (isSubmit && onSubmit) onSubmit({});
    }
    setIsExecuting(false);
  };

  // Auto-run when typing/dragging (only outside Arena Mode)
  useEffect(() => {
    if (arenaMode) return;

    const handler = setTimeout(() => {
      if (code && !code.includes('# Drag gates')) {
        executeCircuit(false);
      } else {
         setProbabilities({ ['0'.repeat(numQubits)]: 1.0 });
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [code, language, numQubits, arenaMode]);

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0, paddingBottom: '16px' }}>
      <div className="flex-between">
        <select 
          value={language} 
          onChange={(e) => { setLanguage(e.target.value as 'qiskit' | 'cirq'); setIsTyping(false); }}
          className="editor-select"
          style={{ padding: '8px', borderRadius: '4px', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--surface-border)' }}
        >
          <option value="qiskit">Qiskit Engine</option>
          <option value="cirq">Cirq Engine</option>
        </select>
        
        {arenaMode ? (
           <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => executeCircuit(false)} disabled={isExecuting}>
                Run Output
              </button>
              <button className="btn-primary" onClick={() => executeCircuit(true)} disabled={isExecuting || disableSubmit}>
                {disableSubmit ? 'Sign In to Submit' : (isExecuting && submitStatus === 'verifying' ? 'Submitting...' : 'Submit')}
              </button>
           </div>
        ) : (
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{isExecuting ? 'Executing...' : 'Ready'}</div>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        
        {/* Top Panel: Palette and Circuit Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
          {/* Gate Palette */}
          <div className="glass-panel" style={{ padding: '12px' }}>
            <h3 style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Drag Gates:</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {GATES.map(gate => (
                <div 
                  key={gate}
                  draggable
                  onDragStart={(e) => handleDragStart(e, gate)}
                  onClick={() => setSelectedGate(gate === selectedGate ? null : gate)}
                  style={{ 
                    width: '36px', height: '36px', 
                    background: selectedGate === gate ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', 
                    border: selectedGate === gate ? '2px solid var(--accent-primary)' : '1px solid var(--surface-border)', 
                    boxShadow: selectedGate === gate ? '0 0 10px rgba(69, 243, 255, 0.4)' : 'none',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    fontWeight: 'bold', fontSize: '14px',
                    color: gate === 'DEL' ? '#ff7b72' : gate === 'CX' ? 'var(--accent-secondary)' : gate === 'M' ? '#ff7b72' : 'var(--accent-primary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {gate === 'DEL' ? '🗑️' : gate}
                </div>
              ))}
            </div>
          </div>

          {/* Circuit Grid */}
          <div className="glass-panel" style={{ padding: '16px', overflowX: 'auto', maxHeight: '600px', position: 'relative' }}>
             
             {pendingCX && (
                <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-secondary)', color: '#000', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', zIndex: 10, animation: 'pulse 1.5s infinite' }}>
                   Select target qubit...
                </div>
             )}

             <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', minWidth: 'max-content' }}>
                {grid.map((row, qIdx) => (
                  <div key={qIdx} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '32px', fontWeight: 'bold', fontSize: '12px', color: 'var(--text-secondary)' }}>|q{qIdx}⟩</div>
                    <div style={{ display: 'flex', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
                      {row.map((cell, sIdx) => {
                        // Check if this cell is a target of any CX in the same step
                        const controlQubits: number[] = [];
                        for (let i = 0; i < numQubits; i++) {
                          const c = grid[i][sIdx];
                          if (c && c.startsWith('CX|')) {
                             const target = parseInt(c.split('|')[1], 10);
                             if (target === qIdx) {
                               controlQubits.push(i);
                             }
                          }
                        }
                        const isCXTarget = controlQubits.length > 0;
                        const isCXPending = cell === 'CX_PENDING';
                        const isOccupied = cell !== '' || isCXTarget || isCXPending;
                        const isCX = cell.startsWith('CX|');
                        
                        let cxDist = 0;
                        let cxLineHeight = 0;
                        let cxLineTop = '50%';
                        if (isCX) {
                           const target = parseInt(cell.split('|')[1], 10);
                           cxDist = target - qIdx;
                           cxLineHeight = Math.abs(cxDist) * 36; // 32px height + 4px gap
                           cxLineTop = cxDist > 0 ? '50%' : `calc(50% - ${cxLineHeight}px)`;
                        }

                        const isPendingCol = pendingCX?.sIdx === sIdx;
                        const isPendingRow = pendingCX?.qIdx === qIdx;

                        return (
                          <div 
                            key={sIdx}
                            draggable={isOccupied}
                            onDragStart={(e) => {
                              if (isCXTarget || isCXPending) {
                                e.dataTransfer.setData('gate', 'CX');
                              } else {
                                e.dataTransfer.setData('gate', cell);
                              }
                            }}
                            onDragEnd={(e) => {
                              if (e.dataTransfer.dropEffect === 'none') {
                                if (isCXTarget || isCX) {
                                  controlQubits.forEach(c => removeGate(c, sIdx));
                                  if (isCX) removeGate(qIdx, sIdx);
                                } else if (cell) {
                                  removeGate(qIdx, sIdx);
                                }
                              }
                            }}
                            onDrop={(e) => {
                              if (!isCXTarget && !pendingCX) handleDrop(e, qIdx, sIdx);
                            }}
                            onDragOver={handleDragOver}
                            onClick={() => {
                              if (pendingCX) {
                                 if (sIdx === pendingCX.sIdx) {
                                    if (qIdx !== pendingCX.qIdx) {
                                       // Finalize target
                                       setIsTyping(false);
                                       setGrid(prev => {
                                          const newGrid = [...prev];
                                          newGrid[pendingCX.qIdx] = [...newGrid[pendingCX.qIdx]];
                                          newGrid[pendingCX.qIdx][sIdx] = `CX|${qIdx}`;
                                          return newGrid;
                                       });
                                    } else {
                                       // Cancel
                                       removeGate(qIdx, sIdx);
                                    }
                                    setPendingCX(null);
                                 }
                                 return;
                              }

                              if (selectedGate) {
                                if (selectedGate === 'DEL') {
                                  if (isCXTarget) {
                                    controlQubits.forEach(c => removeGate(c, sIdx));
                                  } else if (cell) {
                                    removeGate(qIdx, sIdx);
                                  }
                                } else if (!isCXTarget) {
                                  // Override existing gate or place new one
                                  let finalGate = selectedGate;
                                  if (selectedGate === 'CX') {
                                    setPendingCX({ qIdx, sIdx });
                                    finalGate = 'CX_PENDING';
                                  }
                                  setIsTyping(false);
                                  setGrid(prev => {
                                    const newGrid = [...prev];
                                    newGrid[qIdx] = [...newGrid[qIdx]];
                                    newGrid[qIdx][sIdx] = finalGate;
                                    return newGrid;
                                  });
                                }
                                return;
                              }

                              if (isCXTarget) {
                                controlQubits.forEach(c => removeGate(c, sIdx));
                              } else if (cell) {
                                removeGate(qIdx, sIdx);
                              }
                            }}
                            style={{
                              width: '32px', height: '32px',
                              margin: '0 2px',
                              background: (cell && !isCX && !isCXPending) ? 'var(--surface-color)' : (isPendingCol && !isOccupied ? 'rgba(69, 243, 255, 0.1)' : 'transparent'),
                              border: (cell && !isCX && !isCXPending) ? (cell === 'M' ? '1px solid #ff7b72' : '1px solid var(--accent-primary)') : 'none',
                              borderRadius: '4px',
                              zIndex: 1,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: (isOccupied || isPendingCol) ? 'pointer' : 'default',
                              fontWeight: 'bold', fontSize: '12px',
                              color: cell === 'M' ? '#ff7b72' : 'var(--accent-primary)',
                              position: 'relative'
                            }}
                          >
                            {cell && !isCX && !isCXPending && cell}
                            {(isCX || isCXPending) && <div style={{ width: '10px', height: '10px', background: isCXPending ? '#fff' : 'var(--accent-secondary)', borderRadius: '50%', zIndex: 2, boxShadow: isCXPending ? '0 0 10px #fff' : 'none' }} />}
                            {isCX && <div style={{ position: 'absolute', top: cxLineTop, left: '15px', width: '2px', height: `${cxLineHeight}px`, background: 'var(--accent-secondary)', zIndex: -1 }} />}
                            {isCXTarget && (
                              <div style={{ width: '20px', height: '20px', border: '2px solid var(--accent-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', zIndex: 2 }}>
                                <div style={{ position: 'absolute', width: '16px', height: '2px', background: 'var(--accent-secondary)' }} />
                                <div style={{ position: 'absolute', width: '2px', height: '16px', background: 'var(--accent-secondary)' }} />
                              </div>
                            )}
                            {(isPendingCol && !isOccupied && !isPendingRow) && (
                              <div style={{ width: '16px', height: '16px', border: '2px dashed rgba(69, 243, 255, 0.5)', borderRadius: '50%', zIndex: 2 }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
             </div>
             
             <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
               <div style={{ width: '32px' }} />
               <button 
                 onClick={addQubit}
                 style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', borderRadius: '4px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
               >
                 + Add Qubit
               </button>
             </div>
          </div>
        </div>

        {/* Bottom Panel: Visualization and Code */}
        <div className="responsive-flex" style={{ display: 'flex', gap: '16px', minHeight: '300px', minWidth: 0 }}>
          
          <div className="glass-panel" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '300px' }}>
            <h3 style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--accent-primary)' }}>Python Code (Editable)</h3>
            <div style={{ height: '300px', flexShrink: 0, overflow: 'hidden', borderRadius: '8px' }}>
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={handleCodeChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'Consolas, "Courier New", monospace',
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                }}
              />
            </div>
          </div>

          <div className="glass-panel" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '300px' }}>
            {errorMsg && (
              <div style={{ padding: '8px', background: 'rgba(248, 81, 73, 0.1)', border: '1px solid var(--error)', borderRadius: '8px', color: 'var(--error)', fontSize: '12px', marginBottom: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {errorMsg}
              </div>
            )}
            <div style={{ flex: 1, minHeight: '300px', width: '100%', position: 'relative' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
