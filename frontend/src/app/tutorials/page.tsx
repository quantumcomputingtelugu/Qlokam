"use client";

import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import VisualPlayground from '@/components/VisualPlayground';

export default function TutorialsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'lesson' | 'practice'>('lesson');
  const [activeTutorialId, setActiveTutorialId] = useState(1);
  const [completedTutorials, setCompletedTutorials] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  // Hardcoded for now. In reality, you'd fetch this from a DB or JSON file.
  const tutorials = [
    {
      id: 1,
      title: 'Introduction to Qubits',
      description: 'Learn the fundamentals of quantum bits, superposition, and how they differ from classical bits.',
      difficulty: 'Beginner',
      lessonContent: (
        <>
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
        </>
      ),
      practiceGoal: 'Place a single qubit in superposition by dragging a Hadamard (H) gate onto it!',
    },
    {
      id: 2,
      title: 'Quantum Gates: Pauli-X, Y, and Z',
      description: 'Understand single-qubit rotations and how to manipulate quantum states.',
      difficulty: 'Beginner',
      lessonContent: (
        <>
          <p style={{ marginBottom: '16px' }}>
            The Pauli gates act as rotations on the Bloch sphere. They are fundamental single-qubit operations.
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Pauli-X:</strong> Often called the quantum NOT gate. It flips |0⟩ to |1⟩ and vice versa.</li>
            <li style={{ marginBottom: '8px' }}><strong>Pauli-Y:</strong> A rotation around the Y axis of the Bloch sphere.</li>
            <li style={{ marginBottom: '8px' }}><strong>Pauli-Z:</strong> Leaves |0⟩ unchanged, but flips the phase of |1⟩ to -|1⟩.</li>
          </ul>
        </>
      ),
      practiceGoal: 'Apply a Pauli-X gate to flip a qubit from |0> to |1>.',
    },
    {
      id: 3,
      title: 'Entanglement and CNOT',
      description: 'Dive into two-qubit gates and the spooky action at a distance: Quantum Entanglement.',
      difficulty: 'Intermediate',
      lessonContent: (
        <>
          <p style={{ marginBottom: '16px' }}>
            Entanglement is a unique quantum phenomenon where two qubits become inextricably linked.
          </p>
          <p style={{ marginBottom: '16px' }}>
            The <strong>CNOT (Controlled-NOT)</strong> gate flips the state of a target qubit ONLY if the control qubit is in the |1⟩ state.
          </p>
        </>
      ),
      practiceGoal: 'Create a Bell State! Place an H gate on q0, and a CX gate with control on q0 and target on q1.',
    }
  ];

  useEffect(() => {
    if (!auth) {
      setLoadingUser(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch progress
        try {
          if (!db) return;
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().completedTutorials) {
            setCompletedTutorials(docSnap.data().completedTutorials);
          }
        } catch (e) {
          console.error("Error fetching progress", e);
        }
      } else {
        setCompletedTutorials([]); // clear on logout
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  const handleMarkComplete = async () => {
    if (!user || !db || completedTutorials.includes(activeTutorialId)) return;
    setSaving(true);
    const newCompleted = [...completedTutorials, activeTutorialId];
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { completedTutorials: newCompleted }, { merge: true });
      setCompletedTutorials(newCompleted);
    } catch (e) {
      console.error("Error saving progress", e);
    }
    setSaving(false);
  };

  const activeTutorial = tutorials.find(t => t.id === activeTutorialId) || tutorials[0];
  const isCompleted = completedTutorials.includes(activeTutorial.id);

  return (
    <div className="container" style={{ paddingTop: '24px', display: 'flex', gap: '24px', height: 'calc(100vh - 100px)' }}>
      {/* Left Panel: Tutorial List */}
      <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', color: 'var(--accent-primary)' }}>Quantum Modules</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tutorials.map((tutorial) => {
            const completed = completedTutorials.includes(tutorial.id);
            const isActive = activeTutorialId === tutorial.id;
            return (
              <div 
                key={tutorial.id} 
                onClick={() => { setActiveTutorialId(tutorial.id); setActiveTab('lesson'); }}
                style={{ 
                  padding: '16px', 
                  background: isActive ? 'rgba(69, 243, 255, 0.1)' : 'rgba(255,255,255,0.03)', 
                  border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--surface-border)'}`, 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                className="tutorial-card"
              >
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', margin: 0, color: 'var(--text-primary)' }}>{tutorial.id}. {tutorial.title}</h3>
                  {completed && (
                    <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '12px', background: 'rgba(63, 185, 80, 0.2)', color: 'var(--success)' }}>
                      Completed
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>{tutorial.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Content Area */}
      <div className="glass-panel" style={{ flex: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Header Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--surface-border)', padding: '0 24px' }}>
          <button 
            onClick={() => setActiveTab('lesson')}
            style={{ 
              padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === 'lesson' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'lesson' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              fontWeight: activeTab === 'lesson' ? 600 : 400,
              fontSize: '16px'
            }}
          >
            Lesson
          </button>
          <button 
            onClick={() => setActiveTab('practice')}
            style={{ 
              padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === 'practice' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'practice' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              fontWeight: activeTab === 'practice' ? 600 : 400,
              fontSize: '16px'
            }}
          >
            Practice
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '32px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--text-primary)' }}>{activeTutorial.title}</h1>
          
          {activeTab === 'lesson' ? (
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '16px' }}>
              {activeTutorial.lessonContent}
              
              <div style={{ marginTop: '48px', padding: '24px', background: 'rgba(69, 243, 255, 0.05)', border: '1px solid rgba(69, 243, 255, 0.2)', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 16px 0', color: 'var(--accent-primary)' }}>Ready for practice?</h4>
                <p style={{ margin: '0 0 16px 0' }}>Switch to the Practice tab to apply what you&apos;ve learned!</p>
                <button className="btn-primary" onClick={() => setActiveTab('practice')} style={{ padding: '8px 16px' }}>Go to Practice</button>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {loadingUser ? (
                <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)' }}>Loading...</div>
              ) : !user ? (
                <div style={{ textAlign: 'center', marginTop: '64px', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--surface-border)' }}>
                  <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '16px' }}>Practice is Locked</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
                    Sign in with Google to unlock interactive circuit building, save your progress, and track your learning journey!
                  </p>
                </div>
              ) : activeTutorial.id > 1 && !completedTutorials.includes(activeTutorial.id - 1) ? (
                <div style={{ textAlign: 'center', marginTop: '64px', padding: '40px', background: 'rgba(210, 153, 34, 0.05)', borderRadius: '12px', border: '1px dashed rgba(210, 153, 34, 0.3)' }}>
                  <h3 style={{ fontSize: '24px', color: '#d29922', marginBottom: '16px' }}>Practice is Locked</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
                    You must complete the practice for <strong>Module {activeTutorial.id - 1}</strong> before you can unlock this one!
                  </p>
                  <button className="btn-primary" onClick={() => { setActiveTutorialId(activeTutorial.id - 1); setActiveTab('practice'); }} style={{ padding: '8px 16px' }}>Go to Module {activeTutorial.id - 1}</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(63, 185, 80, 0.1)', border: '1px solid rgba(63, 185, 80, 0.3)', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: 'var(--success)' }}>Goal</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{activeTutorial.practiceGoal}</p>
                  </div>
                  
                  {/* The Interactive Editor */}
                  <div style={{ flex: 1, minHeight: '500px', marginBottom: '24px', border: '1px solid var(--surface-border)', borderRadius: '8px', overflow: 'hidden' }}>
                    <VisualPlayground />
                  </div>

                  {/* Completion Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <span style={{ color: isCompleted ? 'var(--success)' : 'var(--text-secondary)' }}>
                      {isCompleted ? '🎉 You have completed this module!' : 'Complete the circuit above, then mark as complete.'}
                    </span>
                    <button 
                      onClick={handleMarkComplete} 
                      disabled={isCompleted || saving}
                      style={{ 
                        padding: '10px 24px', 
                        background: isCompleted ? 'rgba(63, 185, 80, 0.2)' : 'var(--success)', 
                        color: isCompleted ? 'var(--success)' : '#fff', 
                        border: 'none', borderRadius: '8px', cursor: isCompleted ? 'default' : 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {saving ? 'Saving...' : isCompleted ? 'Completed' : 'Mark as Complete'}
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
