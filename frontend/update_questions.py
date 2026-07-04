import sys
import re

file_path = r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_str = 'practiceGoal: "Pass the final exam with at least 15/20!",\n        quizzes: ['
start_idx = content.find(start_str)
end_str = '        ]\n      },\n    ],\n  },\n];'
end_idx = content.find(end_str)

if start_idx == -1 or end_idx == -1:
    print('Could not find start or end bounds.')
    sys.exit(1)

new_quizzes = '''practiceGoal: "Pass the final exam with a perfect 10/10!",
        quizzes: [
          {
            type: "mcq",
            question: "What operations do the S and T gates perform respectively?",
            options: [
              "S applies a 90° phase shift, T applies a 45° phase shift (both around Z-axis).",
              "S applies a 45° phase shift, T applies a 90° phase shift (both around Z-axis).",
              "S is a bit flip (X), T is a phase flip (Z).",
              "S applies a 180° phase shift, T applies a 90° phase shift."
            ],
            correctAnswerIndex: 0,
            explanation: "The S gate (Phase gate) applies a π/2 (90°) rotation around the Z-axis. The T gate (π/8 gate) applies a π/4 (45°) rotation."
          },
          {
            type: "mcq",
            question: "Trace this 4-qubit circuit (initialized to |0000⟩): 1. X on q0  2. H on q1  3. CNOT(q0->q2)  4. CZ(q1->q3)  5. H on q1  6. Z on q2  7. CNOT(q2->q3). What is the final state of the 4 qubits?",
            options: [
              "|1011⟩",
              "|1100⟩",
              "|1111⟩",
              "|1010⟩"
            ],
            correctAnswerIndex: 0,
            explanation: "q0 becomes 1. q1 becomes |+⟩ then H makes it 0. q2 becomes 1 (flipped by q0), Z adds a phase but leaves prob as 1. q3 starts at 0, CZ does nothing, then q2 flips it to 1. Result: 1011."
          },
          {
            type: "mcq",
            question: "Are these two 5-depth 3-qubit circuits perfectly equivalent? Circuit A: SWAP(q0,q1) using 3 CNOTs, then CNOT(q1,q2), then X(q0). Circuit B: CNOT(q0,q2), SWAP(q0,q1) using 3 CNOTs, then X(q0).",
            options: [
              "Yes, they produce the exact same final state.",
              "No, because the control qubit changes in Circuit B.",
              "No, because SWAP cannot be built with 3 CNOTs.",
              "Yes, but only if q2 is initialized to |0⟩."
            ],
            correctAnswerIndex: 0,
            explanation: "They are equivalent! In Circuit A, q1 acts as control for q2 after q0 and q1 swap (so original q0 controls q2). In Circuit B, original q0 controls q2 before the swap. The X(q0) happens at the end for both."
          },
          {
            type: "mcq",
            question: "In physical superconducting quantum computers, how is an arbitrary continuous rotation gate like Rx(θ) actually implemented in real life?",
            options: [
              "By applying a calibrated microwave pulse at the qubit's resonance frequency for a specific duration.",
              "By physically rotating the superconducting loop by θ degrees.",
              "By sending photons through a sequence of beam splitters.",
              "By cooling the dilution refrigerator to exactly θ millikelvin."
            ],
            correctAnswerIndex: 0,
            explanation: "Arbitrary single-qubit rotations are implemented using microwave pulses. The amplitude, phase, and duration of the pulse dictate the rotation angle θ."
          },
          {
            type: "mcq",
            question: "Why can't Quantum Teleportation be used to achieve faster-than-light (FTL) communication?",
            options: [
              "Because Bob must wait to receive the 2 classical bits from Alice's measurement to decode the state.",
              "Because the entangled particles degrade over large distances.",
              "Because FTL teleportation requires too much energy.",
              "Because measuring the state instantly destroys the receiver's qubit."
            ],
            correctAnswerIndex: 0,
            explanation: "Teleportation requires a classical channel. Bob's qubit is in a mixed state until he applies the Pauli corrections (X, Z) based on Alice's classical 2-bit message, which travels at light speed."
          },
          {
            type: "circuit",
            question: "Teleportation Protocol: Alice wants to teleport q0 to Bob's q2. 1) Create a Bell state on q1 and q2. 2) Alice does Bell basis measurement prep: CNOT(q0->q1) then H(q0).",
            expectedOutputsText: "Output: Measure q0 and q1.",
            expectedProbs: { "00": 0.25, "01": 0.25, "10": 0.25, "11": 0.25 },
            explanation: "This is the core preparation and measurement part of the teleportation protocol. The 4 outcomes occur with equal probability."
          },
          {
            type: "circuit",
            question: "Superdense Coding: Alice wants to send '11' to Bob. 1) Create a Bell state on q0, q1. 2) Alice encodes '11' by applying X then Z to her qubit (q0). 3) Bob decodes by applying CNOT(q0->q1) then H(q0).",
            expectedOutputsText: "Output: Measure q0 and q1.",
            expectedProbs: { "11": 1.0 },
            explanation: "Superdense coding relies on applying Pauli gates to one half of a Bell state to encode 2 classical bits. Bob's decoding perfectly retrieves '11'."
          },
          {
            type: "circuit",
            question: "Build exactly this 10-depth sequence: H(q0), X(q1), Z(q2), CNOT(q0,q1), CNOT(q1,q2), H(q1), CNOT(q2,q0), X(q0), Z(q1), H(q2).",
            expectedOutputsText: "Output: Measure all 3 qubits.",
            expectedProbs: { "000": 0.25, "010": 0.25, "101": 0.25, "111": 0.25 },
            explanation: "Just follow the exact sequence!"
          },
          {
            type: "circuit",
            question: "Create a 4-qubit GHZ state 1/sqrt(2) (|0000> + |1111>) so measuring one perfectly predicts all others. Hint: Use H on q0, then cascade CNOTs.",
            expectedOutputsText: "Output: Measure all 4 qubits.",
            expectedProbs: { "0000": 0.5, "1111": 0.5 },
            explanation: "H on q0 creates |+>. CNOT(q0,q1) makes Bell state |00>+|11>. CNOT(q1,q2) and CNOT(q2,q3) extends the entanglement to all 4 qubits."
          },
          {
            type: "circuit",
            question: "Demonstrate Phase Kickback: 1) Prepare q1 in the |-> state (X then H). 2) Apply H to q0. 3) Apply CNOT with q0 as control and q1 as target. 4) Apply H to q0. Measure q0.",
            expectedOutputsText: "Output: Measure q0.",
            expectedProbs: { "1": 1.0 },
            explanation: "When a CNOT targets the |-> state, it kicks back a phase of -1 to the control qubit (q0). This acts like a Z gate on q0, turning |+> into |->. The final H turns |-> into |1>."
          }'''

content = content[:start_idx] + new_quizzes + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully updated the 10 questions in tutorials.tsx')
