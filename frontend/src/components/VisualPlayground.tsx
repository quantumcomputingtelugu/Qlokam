/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Editor from "@monaco-editor/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import BlochSphere from "./BlochSphere";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const NUM_STEPS = 20;

const GATE_CATEGORIES = {
  Pauli: [
    {
      id: "X",
      label: "X",
      tooltip: "Pauli-X (NOT): Flips |0⟩ to |1⟩ and vice versa.",
    },
    {
      id: "Y",
      label: "Y",
      tooltip: "Pauli-Y: Rotates around Y-axis. Adds phase i.",
    },
    {
      id: "Z",
      label: "Z",
      tooltip: "Pauli-Z (Phase): Flips phase of |1⟩ to -|1⟩.",
    },
  ],
  Hadamard: [
    {
      id: "H",
      label: "H",
      tooltip: "Hadamard: Creates an equal superposition.",
    },
  ],
  Phase: [
    { id: "S", label: "S", tooltip: "S Gate: 90-degree Z-rotation." },
    { id: "T", label: "T", tooltip: "T Gate: 45-degree Z-rotation." },
  ],
  Rotation: [
    { id: "RX", label: "Rx", tooltip: "Rx: Rotation around X-axis." },
    { id: "RY", label: "Ry", tooltip: "Ry: Rotation around Y-axis." },
    { id: "RZ", label: "Rz", tooltip: "Rz: Rotation around Z-axis." },
  ],
  "2-Qubit": [
    { id: "CX", label: "CX", tooltip: "CNOT: Flips target if control is |1⟩." },
    {
      id: "CZ",
      label: "CZ",
      tooltip: "CZ: Applies Z to target if control is |1⟩.",
    },
    {
      id: "SWAP",
      label: "SWAP",
      tooltip: "SWAP: Swaps the states of two qubits.",
    },
  ],
};

interface VisualPlaygroundProps {
  arenaMode?: boolean;
  arenaProblemId?: string | null;
  onSubmit?: (probs: Record<string, number>) => void;
  submitStatus?: "idle" | "verifying" | "success" | "failed";
  disableSubmit?: boolean;
}

export default function VisualPlayground({
  arenaMode = false,
  arenaProblemId = null,
  onSubmit,
  submitStatus = "idle",
  disableSubmit = false,
}: VisualPlaygroundProps = {}) {
  const [language, setLanguage] = useState<"qiskit" | "cirq">("qiskit");
  const [numQubits, setNumQubits] = useState(3);
  const [grid, setGrid] = useState<string[][]>(
    Array(3)
      .fill([])
      .map(() => Array(NUM_STEPS).fill("")),
  );
  const [draggedGate, setDraggedGate] = useState<string | null>(null);
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [pendingTwoQubit, setPendingTwoQubit] = useState<{
    qIdx: number;
    sIdx: number;
    gate: string;
  } | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof GATE_CATEGORIES>("Pauli");
  const [probabilities, setProbabilities] = useState<Record<string, number>>(
    {},
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [blochVectors, setBlochVectors] = useState<
    Record<string, { x: number; y: number; z: number }>
  >({});
  const [measuredVals, setMeasuredVals] = useState<Record<string, number>>({});
  const [selectedBlochQubit, setSelectedBlochQubit] = useState<number | null>(
    null,
  );
  const [anglePrompt, setAnglePrompt] = useState<{
    gate: string;
    qIdx: number;
    sIdx: number;
  } | null>(null);
  const [angleInputValue, setAngleInputValue] = useState("pi/2");
  const [dailyBonusToast, setDailyBonusToast] = useState<string | null>(null);

  const [code, setCode] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Source of truth flag
  const typeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load or reset state when problem changes
  useEffect(() => {
    if (arenaMode && arenaProblemId) {
      const saved = localStorage.getItem(`quverse_grid_${arenaProblemId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.grid && parsed.numQubits) {
            setGrid(parsed.grid);
            setNumQubits(parsed.numQubits);
            setProbabilities({});
            setBlochVectors({});
            setMeasuredVals({});
            setErrorMsg("");
            setPendingTwoQubit(null);
            setAnglePrompt(null);
            return;
          }
        } catch (e) {}
      }
      
      setGrid(
        Array(3)
          .fill([])
          .map(() => Array(NUM_STEPS).fill("")),
      );
      setNumQubits(3);
      setProbabilities({});
      setBlochVectors({});
      setMeasuredVals({});
      setErrorMsg("");
      setCode("");
      setPendingTwoQubit(null);
      setAnglePrompt(null);
    }
  }, [arenaProblemId, arenaMode]);

  // Save state when grid changes
  useEffect(() => {
    if (arenaMode && arenaProblemId) {
      localStorage.setItem(`quverse_grid_${arenaProblemId}`, JSON.stringify({ grid, numQubits }));
    }
  }, [grid, numQubits, arenaProblemId, arenaMode]);

  const addQubit = () => {
    if (numQubits >= 16) {
      alert("Maximum of 16 qubits allowed in the playground.");
      return;
    }
    setNumQubits((prev) => prev + 1);
    setGrid((prev) => [...prev, Array(NUM_STEPS).fill("")]);
    setIsTyping(false); // Let grid update the code
  };

  const handleDragStart = (e: React.DragEvent, gate: string) => {
    setDraggedGate(gate);
    e.dataTransfer.setData("gate", gate);
  };

  const handleDrop = (e: React.DragEvent, qIdx: number, sIdx: number) => {
    e.preventDefault();
    if (pendingTwoQubit) return; // Block drops while pending 2-qubit

    const gate = e.dataTransfer.getData("gate");
    if (!gate) return;

    if (gate === "DEL") {
      const controlQubits: number[] = [];
      for (let i = 0; i < numQubits; i++) {
        const c = grid[i][sIdx];
        if (
          c &&
          (c.startsWith("CX|") || c.startsWith("CZ|") || c.startsWith("SWAP|"))
        ) {
          const target = parseInt(c.split("|")[1], 10);
          if (target === qIdx) {
            controlQubits.push(i);
          }
        }
      }

      if (controlQubits.length > 0) {
        setIsTyping(false);
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          controlQubits.forEach((c) => {
            newGrid[c] = [...newGrid[c]];
            newGrid[c][sIdx] = "";
          });
          return newGrid;
        });
      } else if (grid[qIdx][sIdx]) {
        setIsTyping(false);
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[qIdx] = [...newGrid[qIdx]];
          newGrid[qIdx][sIdx] = "";
          return newGrid;
        });
      }
      return;
    }

    let finalGate = gate;

    if (gate === "CX" || gate === "CZ" || gate === "SWAP") {
      setPendingTwoQubit({ qIdx, sIdx, gate });
      finalGate = `${gate}_PENDING`;
    } else if (gate === "RX" || gate === "RY" || gate === "RZ") {
      setAnglePrompt({ gate, qIdx, sIdx });
      setAngleInputValue("pi/2");
      return; // Do not place gate yet, wait for prompt
    }

    setIsTyping(false);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[qIdx] = [...newGrid[qIdx]];
      newGrid[qIdx][sIdx] = finalGate;
      return newGrid;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!pendingTwoQubit) e.preventDefault();
  };

  const removeGate = (qIdx: number, sIdx: number) => {
    setIsTyping(false);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[qIdx] = [...newGrid[qIdx]];
      newGrid[qIdx][sIdx] = "";
      return newGrid;
    });
  };

  // 1. Grid -> Code
  useEffect(() => {
    if (isTyping) return;

    let displayCode = "";
    if (language === "qiskit") {
      displayCode = `from qiskit import QuantumCircuit\n\nqc = QuantumCircuit(${numQubits}, ${numQubits})\n`;
      for (let sIdx = 0; sIdx < NUM_STEPS; sIdx++) {
        for (let qIdx = 0; qIdx < numQubits; qIdx++) {
          const gate = grid[qIdx][sIdx];
          if (gate === "H") displayCode += `qc.h(${qIdx})\n`;
          else if (gate === "X") displayCode += `qc.x(${qIdx})\n`;
          else if (gate === "Y") displayCode += `qc.y(${qIdx})\n`;
          else if (gate === "Z") displayCode += `qc.z(${qIdx})\n`;
          else if (gate === "S") displayCode += `qc.s(${qIdx})\n`;
          else if (gate === "T") displayCode += `qc.t(${qIdx})\n`;
          else if (
            gate.startsWith("RX(") ||
            gate.startsWith("RY(") ||
            gate.startsWith("RZ(")
          ) {
            const type = gate.substring(0, 2).toLowerCase();
            const angle = gate.substring(3, gate.length - 1);
            displayCode += `qc.${type}(${angle}, ${qIdx})\n`;
          } else if (gate === "M")
            displayCode += `qc.measure(${qIdx}, ${qIdx})\n`;
          else if (gate.startsWith("CX|"))
            displayCode += `qc.cx(${qIdx}, ${gate.split("|")[1]})\n`;
          else if (gate.startsWith("CZ|"))
            displayCode += `qc.cz(${qIdx}, ${gate.split("|")[1]})\n`;
          else if (gate.startsWith("SWAP|"))
            displayCode += `qc.swap(${qIdx}, ${gate.split("|")[1]})\n`;
        }
      }
    } else if (language === "cirq") {
      displayCode = `import cirq\n\nqubits = [cirq.LineQubit(i) for i in range(${numQubits})]\ncircuit = cirq.Circuit()\n`;
      for (let sIdx = 0; sIdx < NUM_STEPS; sIdx++) {
        for (let qIdx = 0; qIdx < numQubits; qIdx++) {
          const gate = grid[qIdx][sIdx];
          if (gate === "H")
            displayCode += `circuit.append(cirq.H(qubits[${qIdx}]))\n`;
          else if (gate === "X")
            displayCode += `circuit.append(cirq.X(qubits[${qIdx}]))\n`;
          else if (gate === "Y")
            displayCode += `circuit.append(cirq.Y(qubits[${qIdx}]))\n`;
          else if (gate === "Z")
            displayCode += `circuit.append(cirq.Z(qubits[${qIdx}]))\n`;
          else if (gate === "S")
            displayCode += `circuit.append(cirq.S(qubits[${qIdx}]))\n`;
          else if (gate === "T")
            displayCode += `circuit.append(cirq.T(qubits[${qIdx}]))\n`;
          else if (
            gate.startsWith("RX(") ||
            gate.startsWith("RY(") ||
            gate.startsWith("RZ(")
          ) {
            const type = gate.substring(0, 2).toLowerCase();
            const angle = gate.substring(3, gate.length - 1);
            displayCode += `circuit.append(cirq.${type}(${angle})(qubits[${qIdx}]))\n`;
          } else if (gate === "M")
            displayCode += `circuit.append(cirq.measure(qubits[${qIdx}]))\n`;
          else if (gate.startsWith("CX|"))
            displayCode += `circuit.append(cirq.CNOT(qubits[${qIdx}], qubits[${gate.split("|")[1]}]))\n`;
          else if (gate.startsWith("CZ|"))
            displayCode += `circuit.append(cirq.CZ(qubits[${qIdx}], qubits[${gate.split("|")[1]}]))\n`;
          else if (gate.startsWith("SWAP|"))
            displayCode += `circuit.append(cirq.SWAP(qubits[${qIdx}], qubits[${gate.split("|")[1]}]))\n`;
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
      const operations: { gate: string; q?: number; c?: number; t?: number }[] =
        [];
      let newNumQ = numQubits;
      const lines = newCode.split("\n");

      for (const line of lines) {
        const l = line.trim();
        if (language === "qiskit") {
          const qcMatch = l.match(/qc\s*=\s*QuantumCircuit\((\d+)/);
          if (qcMatch) newNumQ = parseInt(qcMatch[1], 10);
          const singleGateMatch = l.match(
            /qc\.(h|x|y|z|s|t)\s*\(\s*(\d+)\s*\)/,
          );
          if (singleGateMatch)
            operations.push({
              gate: singleGateMatch[1].toUpperCase(),
              q: parseInt(singleGateMatch[2], 10),
            });
          const rotGateMatch = l.match(
            /qc\.(rx|ry|rz)\s*\(\s*([^,]+)\s*,\s*(\d+)\s*\)/,
          );
          if (rotGateMatch)
            operations.push({
              gate: `${rotGateMatch[1].toUpperCase()}(${rotGateMatch[2].trim()})`,
              q: parseInt(rotGateMatch[3], 10),
            });
          const mMatch = l.match(/qc\.measure\(\s*(\d+)\s*,\s*\d+\s*\)/);
          if (mMatch)
            operations.push({ gate: "M", q: parseInt(mMatch[1], 10) });
          const twoQubitMatch = l.match(
            /qc\.(cx|cz|swap)\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/,
          );
          if (twoQubitMatch)
            operations.push({
              gate: twoQubitMatch[1].toUpperCase(),
              c: parseInt(twoQubitMatch[2], 10),
              t: parseInt(twoQubitMatch[3], 10),
            });
        } else {
          const qMatch = l.match(/range\((\d+)\)/);
          if (qMatch) newNumQ = parseInt(qMatch[1], 10);
          const singleGateMatch = l.match(
            /cirq\.(H|X|Y|Z|S|T)\(qubits\[(\d+)\]\)/,
          );
          if (singleGateMatch)
            operations.push({
              gate: singleGateMatch[1].toUpperCase(),
              q: parseInt(singleGateMatch[2], 10),
            });
          const rotGateMatch = l.match(
            /cirq\.(rx|ry|rz)\s*\(\s*([^)]+)\s*\)\(qubits\[(\d+)\]\)/,
          );
          if (rotGateMatch)
            operations.push({
              gate: `${rotGateMatch[1].toUpperCase()}(${rotGateMatch[2].trim()})`,
              q: parseInt(rotGateMatch[3], 10),
            });
          const mMatch = l.match(/cirq\.measure\(qubits\[(\d+)\]\)/);
          if (mMatch)
            operations.push({ gate: "M", q: parseInt(mMatch[1], 10) });
          const twoQubitMatch = l.match(
            /cirq\.(CNOT|CZ|SWAP)\(qubits\[(\d+)\],\s*qubits\[(\d+)\]\)/,
          );
          if (twoQubitMatch)
            operations.push({
              gate: twoQubitMatch[1] === "CNOT" ? "CX" : twoQubitMatch[1],
              c: parseInt(twoQubitMatch[2], 10),
              t: parseInt(twoQubitMatch[3], 10),
            });
        }
      }

      if (newNumQ !== numQubits && newNumQ > 0 && newNumQ <= 16)
        setNumQubits(newNumQ);

      const newGrid = Array(newNumQ)
        .fill([])
        .map(() => Array(NUM_STEPS).fill(""));
      const nextFreeStep = Array(newNumQ).fill(0);

      for (const op of operations) {
        if (!["CX", "CZ", "SWAP"].includes(op.gate) && op.q !== undefined) {
          const q = op.q;
          if (q >= newNumQ) continue;
          const step = nextFreeStep[q];
          if (step < NUM_STEPS) {
            newGrid[q][step] = op.gate;
            nextFreeStep[q]++;
          }
        } else if (
          ["CX", "CZ", "SWAP"].includes(op.gate) &&
          op.c !== undefined &&
          op.t !== undefined
        ) {
          const c = op.c;
          const t = op.t;
          if (c >= newNumQ || t >= newNumQ || t === c) continue;
          const step = Math.max(nextFreeStep[c], nextFreeStep[t]);
          if (step < NUM_STEPS) {
            newGrid[c][step] = `${op.gate}|${t}`;
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
    setErrorMsg("");

    // Extract measured qubits from the generated code
    const qiskitMMatch = [...code.matchAll(/qc\.measure\(\s*(\d+)/g)];
    const cirqMMatch = [...code.matchAll(/cirq\.measure\(qubits\[(\d+)\]\)/g)];
    const measuredSet = new Set(
      [...qiskitMMatch, ...cirqMMatch].map((m) => parseInt(m[1], 10)),
    );
    const measuredQubits = Array.from(measuredSet).sort((a, b) => a - b);
    const hasMeasurements = measuredQubits.length > 0;

    // Strip measurements before sending to execution so that statevector does not collapse
    let safeCode = code;
    safeCode = safeCode.replace(/qc\.measure\([^)]*\)\n/g, "");
    safeCode = safeCode.replace(
      /circuit\.append\(cirq\.measure\([^)]*\)\)\n/g,
      "",
    );

    let pythonCode = safeCode + "\n";

    if (language === "qiskit") {
      pythonCode =
        `from qiskit.quantum_info import Statevector\nfrom qiskit_aer import AerSimulator\nimport json\n` +
        pythonCode +
        `\n
try:
    sv = Statevector(qc)
    probs = sv.probabilities_dict()
    measured_indices = [${measuredQubits.join(", ")}]
    
    theoretical_probs = {}
    for k, v in probs.items():
        if v > 1e-5:
            theoretical_probs[k] = float(v)

    bloch_vectors = {}
    try:
        from qiskit.quantum_info import Pauli
        for i in range(${numQubits}):
            op_x = Pauli('I' * (${numQubits} - 1 - i) + 'X' + 'I' * i)
            op_y = Pauli('I' * (${numQubits} - 1 - i) + 'Y' + 'I' * i)
            op_z = Pauli('I' * (${numQubits} - 1 - i) + 'Z' + 'I' * i)
            rx = sv.expectation_value(op_x).real
            ry = sv.expectation_value(op_y).real
            rz = sv.expectation_value(op_z).real
            bloch_vectors[str(i)] = {"x": rx, "y": ry, "z": rz}
    except Exception:
        pass

    collapsed_probs = theoretical_probs
    measured_vals = {}
    if measured_indices:
        try:
` +
        code
          .split("\n")
          .map((l) => "            " + l)
          .join("\n") + // include the original code WITH measurements to simulate collapse
        `
            qc.save_statevector()
            sim = AerSimulator(method='statevector')
            res = sim.run(qc, shots=1).result()
            collapsed_sv = res.get_statevector()
            c_probs = collapsed_sv.probabilities_dict()
            collapsed_probs = {k: float(v) for k, v in c_probs.items() if v > 1e-5}
            for k, v in collapsed_probs.items():
                for idx in measured_indices:
                    measured_vals[str(idx)] = int(k[${numQubits} - 1 - idx])
                break
        except Exception:
            pass

    print("##JSON_START##")
    print(json.dumps({"probs": collapsed_probs, "theoretical_probs": theoretical_probs, "bloch": bloch_vectors, "measured_vals": measured_vals}))
    print("##JSON_END##")
except Exception as e:
    print("ERROR:", str(e))
`;
    } else if (language === "cirq") {
      pythonCode =
        `import numpy as np\nimport json\n` +
        pythonCode +
        `\n
try:
    simulator = cirq.Simulator()
    result = simulator.simulate(circuit)
    state_vector = result.final_state_vector
    probs = np.abs(state_vector)**2
    
    measured_indices = [${measuredQubits.join(", ")}]
    theoretical_probs = {}
    
    for i, p in enumerate(probs):
        if p > 1e-5:
            bin_str = format(i, f'0{${numQubits}}b')
            # Default reverse to match Qiskit
            rev_bin_str = bin_str[::-1]
            theoretical_probs[rev_bin_str] = float(p)
            
    bloch_vectors = {}
    try:
        for i in range(${numQubits}):
            q = qubits[i]
            q_map = {q: idx for idx, q in enumerate(qubits)}
            rx = cirq.PauliString(cirq.X(q)).expectation_from_state_vector(state_vector, qubit_map=q_map).real
            ry = cirq.PauliString(cirq.Y(q)).expectation_from_state_vector(state_vector, qubit_map=q_map).real
            rz = cirq.PauliString(cirq.Z(q)).expectation_from_state_vector(state_vector, qubit_map=q_map).real
            bloch_vectors[str(i)] = {"x": rx, "y": ry, "z": rz}
    except Exception as e:
        pass

    collapsed_probs = theoretical_probs
    measured_vals = {}
    if measured_indices:
        try:
` +
        code
          .split("\n")
          .map((l) => "            " + l)
          .join("\n") + // re-evaluate original code WITH measurements
        `
            result = simulator.simulate(circuit)
            collapsed_sv = result.final_state_vector
            c_probs = np.abs(collapsed_sv)**2
            for i, p in enumerate(c_probs):
                if p > 1e-5:
                    bin_str = format(i, f'0{${numQubits}}b')
                    rev_bin_str = bin_str[::-1]
                    collapsed_probs[rev_bin_str] = float(p)
            for k, v in collapsed_probs.items():
                for idx in measured_indices:
                    measured_vals[str(idx)] = int(k[${numQubits} - 1 - idx])
                break
        except Exception:
            pass
        
    print("##JSON_START##")
    print(json.dumps({"probs": collapsed_probs, "theoretical_probs": theoretical_probs, "bloch": bloch_vectors, "measured_vals": measured_vals}))
    print("##JSON_END##")
except Exception as e:
    print("ERROR:", str(e))
`;
    }

    try {
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${BACKEND_URL}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: pythonCode, language }),
      });
      const data = await response.json();
      if (data.success && data.output) {
        const match = data.output.match(
          /##JSON_START##\n([\s\S]*?)\n##JSON_END##/,
        );
        if (match && match[1]) {
          const parsed = JSON.parse(match[1]);
          // Backward compatibility if backend doesn't return dict with probs
          if (parsed.probs) {
            setProbabilities(parsed.theoretical_probs || parsed.probs);
            if (parsed.bloch && Object.keys(parsed.bloch).length > 0) {
              // We will store bloch vectors in a state variable (we need to add this)
              setBlochVectors(parsed.bloch);
            }
            if (parsed.measured_vals) {
              setMeasuredVals(parsed.measured_vals);
            } else {
              setMeasuredVals({});
            }
          } else {
            setProbabilities(parsed);
          }
          if (onSubmit) {
            onSubmit(parsed.theoretical_probs || parsed.probs || parsed);
          }
        } else {
          setErrorMsg("Could not parse output.");
          if (onSubmit) onSubmit({});
        }
      } else {
        setErrorMsg(data.error || "Execution failed");
        if (onSubmit) onSubmit({});
      }
    } catch (err: unknown) {
      setErrorMsg("Backend connection failed.");
      if (onSubmit) onSubmit({});
    }
    setIsExecuting(false);
  };

  // Auto-run when typing/dragging (only outside Arena Mode)
  useEffect(() => {
    if (arenaMode) return;

    const handler = setTimeout(() => {
      if (code && !code.includes("# Drag gates")) {
        executeCircuit(false);
        // Daily playground bonus: +1 rating once per day
        const grantDailyPlaygroundBonus = async () => {
          try {
            if (!auth || !db) return;
            const currentUser = auth.currentUser;
            if (!currentUser) return;
            const today = new Date().toISOString().split("T")[0];
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) return;
            const data = docSnap.data();
            if (data.lastPlaygroundDate === today) return; // already earned today
            const newRating = (data.rating || 0) + 1;
            await updateDoc(docRef, {
              rating: newRating,
              lastPlaygroundDate: today,
              ratingHistory: arrayUnion({
                reason: "Daily Playground Build",
                points: 1,
                timestamp: new Date().toISOString(),
              }),
            });
            setDailyBonusToast("🧪 +1 Daily Playground Bonus!");
            setTimeout(() => setDailyBonusToast(null), 3500);
          } catch (e) {
            // silently fail
          }
        };
        grantDailyPlaygroundBonus();
      } else {
        setProbabilities({ ["0".repeat(numQubits)]: 1.0 });
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [code, language, numQubits, arenaMode]);

  const chartData = {
    labels: Object.keys(probabilities).sort(),
    datasets: [
      {
        label: "Probability",
        data: Object.keys(probabilities)
          .sort()
          .map((k) => probabilities[k] * 100),
        backgroundColor: "rgba(69, 243, 255, 0.6)",
        borderColor: "#45f3ff",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Measurement Probabilities (%)",
        color: "#e0e6ed",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "#8b949e" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: { ticks: { color: "#e0e6ed" }, grid: { display: false } },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: 0,
        paddingBottom: "16px",
      }}
    >
      <div className="flex-between">
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value as "qiskit" | "cirq");
            setIsTyping(false);
          }}
          className="editor-select"
          style={{
            padding: "8px",
            borderRadius: "4px",
            background: "var(--surface-color)",
            color: "var(--text-primary)",
            border: "1px solid var(--surface-border)",
          }}
        >
          <option value="qiskit">Qiskit Engine</option>
          <option value="cirq">Cirq Engine</option>
        </select>

        {arenaMode ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              className="btn-secondary"
              onClick={() => executeCircuit(false)}
              disabled={isExecuting}
            >
              Run Output
            </button>
            <button
              className="btn-primary"
              onClick={() => executeCircuit(true)}
              disabled={isExecuting || disableSubmit}
            >
              {disableSubmit
                ? "Sign In to Submit"
                : isExecuting && submitStatus === "verifying"
                  ? "Submitting..."
                  : "Submit"}
            </button>
          </div>
        ) : (
          <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            {isExecuting ? "Executing..." : "Ready"}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "24px",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Top Panel: Palette and Circuit Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            minWidth: 0,
          }}
        >
          {/* Gate Palette */}
          <div className="glass-panel" style={{ padding: "12px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  paddingBottom: "4px",
                }}
              >
                {(
                  Object.keys(GATE_CATEGORIES) as Array<
                    keyof typeof GATE_CATEGORIES
                  >
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer",
                      background:
                        activeCategory === cat
                          ? "var(--accent-primary)"
                          : "rgba(255,255,255,0.05)",
                      color:
                        activeCategory === cat
                          ? "#000"
                          : "var(--text-secondary)",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {["M", "DEL"].map((gate) => (
                  <div
                    key={gate}
                    draggable
                    onDragStart={(e) => handleDragStart(e, gate)}
                    onClick={() =>
                      setSelectedGate(gate === selectedGate ? null : gate)
                    }
                    title={gate === "M" ? "Measurement" : "Delete Gate"}
                    style={{
                      width: "36px",
                      height: "36px",
                      background:
                        selectedGate === gate
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(255, 255, 255, 0.1)",
                      border:
                        selectedGate === gate
                          ? "2px solid var(--accent-primary)"
                          : "1px solid var(--surface-border)",
                      boxShadow:
                        selectedGate === gate
                          ? "0 0 10px rgba(69, 243, 255, 0.4)"
                          : "none",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "#ff7b72",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {gate === "DEL" ? "🗑️" : gate}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", minHeight: "40px" }}>
              {GATE_CATEGORIES[activeCategory].map((gateObj) => (
                <div
                  key={gateObj.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, gateObj.id)}
                  onClick={() =>
                    setSelectedGate(
                      gateObj.id === selectedGate ? null : gateObj.id,
                    )
                  }
                  title={gateObj.tooltip}
                  style={{
                    width: "36px",
                    height: "36px",
                    background:
                      selectedGate === gateObj.id
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(255, 255, 255, 0.1)",
                    border:
                      selectedGate === gateObj.id
                        ? "2px solid var(--accent-primary)"
                        : "1px solid var(--surface-border)",
                    boxShadow:
                      selectedGate === gateObj.id
                        ? "0 0 10px rgba(69, 243, 255, 0.4)"
                        : "none",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color:
                      activeCategory === "2-Qubit"
                        ? "var(--accent-secondary)"
                        : "var(--accent-primary)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {gateObj.label}
                </div>
              ))}
            </div>
          </div>

          {/* Circuit Grid */}
          <div
            className="glass-panel"
            style={{
              padding: "16px",
              overflowX: "auto",
              maxHeight: "600px",
              position: "relative",
            }}
          >
            {pendingTwoQubit && (
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--accent-secondary)",
                  color: "#000",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  zIndex: 10,
                  animation: "pulse 1.5s infinite",
                }}
              >
                Select target qubit...
              </div>
            )}

            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: "4px",
                minWidth: "max-content",
              }}
            >
              {[...grid].reverse().map((row, revIdx) => {
                const qIdx = numQubits - 1 - revIdx;
                return (
                <div
                  key={qIdx}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      width: "32px",
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    |q{qIdx}⟩
                  </div>
                  <div style={{ display: "flex", position: "relative" }}>
                    {row.map((cell, sIdx) => {
                      const hasMeasureBefore = row.slice(0, sIdx).includes("M");
                      // Check if this cell is a target of any 2-qubit gate in the same step
                      const controlQubits: number[] = [];
                      for (let i = 0; i < numQubits; i++) {
                        const c = grid[i][sIdx];
                        if (
                          c &&
                          (c.startsWith("CX|") ||
                            c.startsWith("CZ|") ||
                            c.startsWith("SWAP|"))
                        ) {
                          const target = parseInt(c.split("|")[1], 10);
                          if (target === qIdx) {
                            controlQubits.push(i);
                          }
                        }
                      }
                      const isTwoQTarget = controlQubits.length > 0;
                      const isTwoQPending = cell.endsWith("_PENDING");
                      const isOccupied =
                        cell !== "" || isTwoQTarget || isTwoQPending;
                      const isTwoQ =
                        cell.startsWith("CX|") ||
                        cell.startsWith("CZ|") ||
                        cell.startsWith("SWAP|");
                      const isSWAP = cell.startsWith("SWAP");

                      let cxDist = 0;
                      let cxLineHeight = 0;
                      let cxLineTop = "50%";
                      if (isTwoQ) {
                        const target = parseInt(cell.split("|")[1], 10);
                        cxDist = target - qIdx;
                        cxLineHeight = Math.abs(cxDist) * 36; // 32px height + 4px gap
                        cxLineTop =
                          cxDist < 0 ? "50%" : `calc(50% - ${cxLineHeight}px)`;
                      }

                      const isPendingCol = pendingTwoQubit?.sIdx === sIdx;
                      const isPendingRow = pendingTwoQubit?.qIdx === qIdx;

                      return (
                        <div
                          key={sIdx}
                          style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: hasMeasureBefore ? "calc(50% - 2px)" : "50%",
                              left: "-2px",
                              right: "-2px",
                              height: hasMeasureBefore ? "4px" : "2px",
                              background: hasMeasureBefore
                                ? "transparent"
                                : "rgba(255,255,255,0.1)",
                              borderTop: hasMeasureBefore
                                ? "1px solid #8b949e"
                                : "none",
                              borderBottom: hasMeasureBefore
                                ? "1px solid #8b949e"
                                : "none",
                              zIndex: 0,
                            }}
                          />
                          <div
                            draggable={isOccupied}
                            onDragStart={(e) => {
                              if (isTwoQTarget || isTwoQPending) {
                                e.dataTransfer.setData(
                                  "gate",
                                  cell.split("|")[0],
                                );
                              } else {
                                e.dataTransfer.setData("gate", cell);
                              }
                            }}
                            onDragEnd={(e) => {
                              if (e.dataTransfer.dropEffect === "none") {
                                if (isTwoQTarget || isTwoQ) {
                                  controlQubits.forEach((c) =>
                                    removeGate(c, sIdx),
                                  );
                                  if (isTwoQ) removeGate(qIdx, sIdx);
                                } else if (cell) {
                                  removeGate(qIdx, sIdx);
                                }
                              }
                            }}
                            onDrop={(e) => {
                              if (!isTwoQTarget && !pendingTwoQubit)
                                handleDrop(e, qIdx, sIdx);
                            }}
                            onDragOver={handleDragOver}
                            onClick={() => {
                              if (pendingTwoQubit) {
                                if (sIdx === pendingTwoQubit.sIdx) {
                                  if (qIdx !== pendingTwoQubit.qIdx) {
                                    // Finalize target
                                    setIsTyping(false);
                                    setGrid((prev) => {
                                      const newGrid = [...prev];
                                      newGrid[pendingTwoQubit.qIdx] = [
                                        ...newGrid[pendingTwoQubit.qIdx],
                                      ];
                                      newGrid[pendingTwoQubit.qIdx][sIdx] =
                                        `${pendingTwoQubit.gate}|${qIdx}`;
                                      return newGrid;
                                    });
                                  } else {
                                    // Cancel
                                    removeGate(qIdx, sIdx);
                                  }
                                  setPendingTwoQubit(null);
                                }
                                return;
                              }

                              if (selectedGate) {
                                if (selectedGate === "DEL") {
                                  if (isTwoQTarget) {
                                    controlQubits.forEach((c) =>
                                      removeGate(c, sIdx),
                                    );
                                  } else if (cell) {
                                    removeGate(qIdx, sIdx);
                                  }
                                } else if (!isTwoQTarget) {
                                  // Override existing gate or place new one
                                  let finalGate = selectedGate;
                                  if (
                                    selectedGate === "CX" ||
                                    selectedGate === "CZ" ||
                                    selectedGate === "SWAP"
                                  ) {
                                    setPendingTwoQubit({
                                      qIdx,
                                      sIdx,
                                      gate: selectedGate,
                                    });
                                    finalGate = `${selectedGate}_PENDING`;
                                  } else if (
                                    selectedGate === "RX" ||
                                    selectedGate === "RY" ||
                                    selectedGate === "RZ"
                                  ) {
                                    setAnglePrompt({
                                      gate: selectedGate,
                                      qIdx,
                                      sIdx,
                                    });
                                    setAngleInputValue("pi/2");
                                    return; // Do not place gate yet
                                  }
                                  setIsTyping(false);
                                  setGrid((prev) => {
                                    const newGrid = [...prev];
                                    newGrid[qIdx] = [...newGrid[qIdx]];
                                    newGrid[qIdx][sIdx] = finalGate;
                                    return newGrid;
                                  });
                                }
                                return;
                              }

                              if (isTwoQTarget) {
                                controlQubits.forEach((c) =>
                                  removeGate(c, sIdx),
                                );
                              } else if (cell) {
                                removeGate(qIdx, sIdx);
                              }
                            }}
                            style={{
                              width: "32px",
                              height: "32px",
                              margin: "0 2px",
                              background:
                                cell && !isTwoQ && !isTwoQPending
                                  ? "var(--surface-color)"
                                  : isPendingCol && !isOccupied
                                    ? "rgba(69, 243, 255, 0.1)"
                                    : "transparent",
                              border:
                                cell && !isTwoQ && !isTwoQPending
                                  ? cell === "M"
                                    ? "1px solid #ff7b72"
                                    : "1px solid var(--accent-primary)"
                                  : "none",
                              borderRadius: "4px",
                              zIndex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor:
                                isOccupied || isPendingCol
                                  ? "pointer"
                                  : "default",
                              fontWeight: "bold",
                              fontSize: "12px",
                              color:
                                cell === "M"
                                  ? "#ff7b72"
                                  : "var(--accent-primary)",
                              position: "relative",
                            }}
                          >
                            {cell &&
                              !isTwoQ &&
                              !isTwoQPending &&
                              (cell.length > 2 && cell.includes("(")
                                ? cell.split("(")[0]
                                : cell)}
                            {(isTwoQ || isTwoQPending) && !isSWAP && (
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  background: isTwoQPending
                                    ? "#fff"
                                    : "var(--accent-secondary)",
                                  borderRadius: "50%",
                                  zIndex: 2,
                                  boxShadow: isTwoQPending
                                    ? "0 0 10px #fff"
                                    : "none",
                                }}
                              />
                            )}
                            {(isTwoQ || isTwoQPending) && isSWAP && (
                              <div
                                style={{
                                  fontSize: "14px",
                                  zIndex: 2,
                                  fontWeight: "bold",
                                }}
                              >
                                X
                              </div>
                            )}
                            {isTwoQ && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: cxLineTop,
                                  left: "15px",
                                  width: "2px",
                                  height: `${cxLineHeight}px`,
                                  background: "var(--accent-secondary)",
                                  zIndex: -1,
                                }}
                              />
                            )}
                            {isTwoQTarget && !isSWAP && (
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  border: "2px solid var(--accent-secondary)",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "var(--bg-color)",
                                  zIndex: 2,
                                }}
                              >
                                {grid[controlQubits[0]][sIdx].startsWith(
                                  "CZ|",
                                ) ? (
                                  <div
                                    style={{
                                      width: "10px",
                                      height: "10px",
                                      background: "var(--accent-secondary)",
                                      borderRadius: "50%",
                                    }}
                                  />
                                ) : (
                                  <>
                                    <div
                                      style={{
                                        position: "absolute",
                                        width: "16px",
                                        height: "2px",
                                        background: "var(--accent-secondary)",
                                      }}
                                    />
                                    <div
                                      style={{
                                        position: "absolute",
                                        width: "2px",
                                        height: "16px",
                                        background: "var(--accent-secondary)",
                                      }}
                                    />
                                  </>
                                )}
                              </div>
                            )}
                            {isTwoQTarget && isSWAP && (
                              <div
                                style={{
                                  fontSize: "14px",
                                  zIndex: 2,
                                  color: "var(--accent-secondary)",
                                  fontWeight: "bold",
                                }}
                              >
                                X
                              </div>
                            )}
                            {isPendingCol && !isOccupied && !isPendingRow && (
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  border: "2px dashed rgba(69, 243, 255, 0.5)",
                                  borderRadius: "50%",
                                  zIndex: 2,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {/* Bloch Sphere Button at end of wire */}
                    <div
                      onClick={() => {
                        if (Object.keys(blochVectors).length === 0) {
                          executeCircuit(false).then(() =>
                            setSelectedBlochQubit(qIdx),
                          );
                        } else {
                          setSelectedBlochQubit(qIdx);
                        }
                      }}
                      title="View Bloch Sphere"
                      style={{
                        width: "24px",
                        height: "24px",
                        marginLeft: "12px",
                        background: "var(--surface-color)",
                        border: "1px solid var(--surface-border)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 1,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          border: "1px solid rgba(255,255,255,0.3)",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "10%",
                            right: "10%",
                            height: "1px",
                            background: "rgba(255,255,255,0.3)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "1px",
                            height: "50%",
                            background: "var(--accent-primary)",
                          }}
                        />
                      </div>
                    </div>
                    {measuredVals[qIdx] !== undefined && (
                      <div
                        style={{
                          marginLeft: "12px",
                          color: "#ff7b72",
                          fontWeight: "bold",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        M = {measuredVals[qIdx]}
                      </div>
                    )}
                  </div>
                </div>
              );
              })}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "12px",
              }}
            >
              <div style={{ width: "32px" }} />
              <button
                onClick={addQubit}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--text-secondary)",
                  borderRadius: "4px",
                  padding: "4px 12px",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                + Add Qubit
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Panel (Code & Results) */}
        <div
          className="responsive-flex"
          style={{ display: "flex", gap: "24px", flex: 1, minHeight: "300px" }}
        >
          {/* Code Editor */}
          <div
            className="glass-panel"
            style={{
              flex: 1,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                marginBottom: "12px",
                color: "var(--text-secondary)",
              }}
            >
              Generated Code (Editable)
            </h3>
            <div
              style={{
                height: "300px",
                flexShrink: 0,
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
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

          <div
            className="glass-panel"
            style={{
              flex: 1,
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              minHeight: "300px",
            }}
          >
            {errorMsg && (
              <div
                style={{
                  padding: "8px",
                  background: "rgba(248, 81, 73, 0.1)",
                  border: "1px solid var(--error)",
                  borderRadius: "8px",
                  color: "var(--error)",
                  fontSize: "12px",
                  marginBottom: "8px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {errorMsg}
              </div>
            )}
            <div
              style={{
                flex: 1,
                minHeight: "300px",
                width: "100%",
                position: "relative",
              }}
            >
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {anglePrompt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "24px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "16px" }}>
              Set Angle (in radians) for {anglePrompt.gate}
            </h3>
            <input
              type="text"
              value={angleInputValue}
              onChange={(e) => setAngleInputValue(e.target.value)}
              style={{
                padding: "8px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid var(--surface-border)",
                color: "#fff",
                borderRadius: "4px",
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsTyping(false);
                  setGrid((prev) => {
                    const newGrid = [...prev];
                    newGrid[anglePrompt.qIdx] = [...newGrid[anglePrompt.qIdx]];
                    newGrid[anglePrompt.qIdx][anglePrompt.sIdx] =
                      `${anglePrompt.gate}(${angleInputValue})`;
                    return newGrid;
                  });
                  setAnglePrompt(null);
                }
              }}
            />
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="btn-secondary"
                onClick={() => setAnglePrompt(null)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  setIsTyping(false);
                  setGrid((prev) => {
                    const newGrid = [...prev];
                    newGrid[anglePrompt.qIdx] = [...newGrid[anglePrompt.qIdx]];
                    newGrid[anglePrompt.qIdx][anglePrompt.sIdx] =
                      `${anglePrompt.gate}(${angleInputValue})`;
                    return newGrid;
                  });
                  setAnglePrompt(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedBlochQubit !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedBlochQubit(null)}
        >
          <div
            className="glass-panel"
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBlochQubit(null)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ✕
            </button>
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                color: "var(--text-primary)",
              }}
            >
              Bloch Sphere (Qubit {selectedBlochQubit})
            </h3>
            {(() => {
              const vec = blochVectors[selectedBlochQubit.toString()];
              if (!vec)
                return (
                  <div
                    style={{ padding: "40px", color: "var(--text-secondary)" }}
                  >
                    Could not compute Bloch vector. (Is the circuit executed?)
                  </div>
                );

              const length = Math.sqrt(
                vec.x * vec.x + vec.y * vec.y + vec.z * vec.z,
              );
              const isEntangled = length < 0.99;

              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <BlochSphere x={vec.x} y={vec.y} z={vec.z} size={250} />
                  {isEntangled && (
                    <div
                      style={{
                        background: "rgba(255, 165, 0, 0.1)",
                        color: "orange",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                        maxWidth: "250px",
                        border: "1px solid rgba(255, 165, 0, 0.3)",
                      }}
                    >
                      <strong>Mixed State</strong>
                      <br />
                      The vector is inside the sphere (length ={" "}
                      {length.toFixed(2)}) because this qubit is entangled with
                      another.
                    </div>
                  )}
                </div>
              );
            })()}
            <div
              style={{
                display: "flex",
                gap: "16px",
                fontSize: "12px",
                color: "var(--text-secondary)",
              }}
            >
              <span>
                X:{" "}
                {blochVectors[selectedBlochQubit.toString()]?.x.toFixed(3) ||
                  "N/A"}
              </span>
              <span>
                Y:{" "}
                {blochVectors[selectedBlochQubit.toString()]?.y.toFixed(3) ||
                  "N/A"}
              </span>
              <span>
                Z:{" "}
                {blochVectors[selectedBlochQubit.toString()]?.z.toFixed(3) ||
                  "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Daily Bonus Toast */}
      {dailyBonusToast && (
        <div style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          background: "linear-gradient(135deg, #d29922, #f0c060)",
          color: "#000",
          padding: "14px 24px",
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "16px",
          boxShadow: "0 4px 24px rgba(210,153,34,0.5)",
          zIndex: 99999,
          animation: "scaleIn 0.3s ease-out",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          {dailyBonusToast}
        </div>
      )}
    </div>
  );
}
