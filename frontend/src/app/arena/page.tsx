/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from 'react';
import VisualPlayground from '@/components/VisualPlayground';
import { arenaProblems, ArenaProblem } from '@/data/arena';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AdBanner from '@/components/AdBanner';

export default function ArenaPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [rating, setRating] = useState(0);
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);
  const [listTab, setListTab] = useState<'practice' | 'contests'>('practice');

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');

  useEffect(() => {
    if (!auth) {
      setLoadingUser(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          if (!db) return;
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.rating) setRating(data.rating);
            if (data.solvedArenaProblems) setSolvedProblems(data.solvedArenaProblems);
          }
        } catch (e) {
          console.error("Error fetching user data", e);
        }
      } else {
        setRating(0);
        setSolvedProblems([]);
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenProblem = (p: ArenaProblem) => {
    setActiveProblemId(p.id);
    setSubmitStatus('idle');
  };

  const activeProblem = arenaProblems.find(p => p.id === activeProblemId);
  const isSolved = activeProblem ? solvedProblems.includes(activeProblem.id) : false;

  const handleSubmit = async (probs: Record<string, number>) => {
    if (!activeProblem) return;
    setSubmitStatus('verifying');
    
    // Check if probabilities match expectedDistribution
    const expected = activeProblem.expectedDistribution;
    let isCorrect = true;

    // Check if every expected key is roughly present
    for (const key of Object.keys(expected)) {
      const userProb = probs[key] || 0;
      const expectedProb = expected[key];
      // Tolerance of 0.05
      if (Math.abs(userProb - expectedProb) > 0.05) {
        isCorrect = false;
        break;
      }
    }

    // Check if user has unexpected keys with high probability
    for (const key of Object.keys(probs)) {
      if (probs[key] > 0.05 && !expected[key]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      setSubmitStatus('success');
      if (!isSolved && user && db) {
        const newRating = rating + activeProblem.points;
        const newSolved = [...solvedProblems, activeProblem.id];
        setRating(newRating);
        setSolvedProblems(newSolved);
        try {
          const docRef = doc(db, 'users', user.uid);
          await setDoc(docRef, { rating: newRating, solvedArenaProblems: newSolved }, { merge: true });
        } catch (e) {
          console.error('Failed to save rating', e);
        }
      }
    } else {
      setSubmitStatus('failed');
    }
  };

  // -------------------------
  // RENDER: LIST VIEW
  // -------------------------
  if (!activeProblem) {
    return (
      <div className="container responsive-flex" style={{ paddingTop: '24px', display: 'flex', gap: '24px', minHeight: 'calc(100vh - 100px)' }}>
        
        {/* Left Panel: Profile & Stats */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Your Arena Rating</h2>
            {loadingUser ? (
              <div style={{ fontSize: '32px' }}>...</div>
            ) : !user ? (
              <div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>?</div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Sign in to track your rating</p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#d29922', textShadow: '0 0 20px rgba(210, 153, 34, 0.3)' }}>
                  {rating}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>Global Rank: Unranked</p>
              </div>
            )}
          </div>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-primary)' }}>Progress</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Solved: <strong style={{color: 'var(--success)'}}>{solvedProblems.length}</strong> / {arenaProblems.length}</p>
          </div>
          
          <AdBanner dataAdSlot="arena_sidebar_1" />
        </div>

        {/* Right Panel: Problem List or Contests */}
        <div className="glass-panel" style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
          
          {/* Header Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--surface-border)', padding: '0 24px' }}>
            <button 
              onClick={() => setListTab('practice')}
              style={{ 
                padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
                color: listTab === 'practice' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                borderBottom: listTab === 'practice' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                fontWeight: listTab === 'practice' ? 600 : 400, fontSize: '16px'
              }}
            >
              Practice Problems
            </button>
            <button 
              onClick={() => setListTab('contests')}
              style={{ 
                padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
                color: listTab === 'contests' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                borderBottom: listTab === 'contests' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                fontWeight: listTab === 'contests' ? 600 : 400, fontSize: '16px'
              }}
            >
              Contests
            </button>
          </div>

          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            {listTab === 'practice' ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    <th style={{ padding: '12px 16px', width: '60px' }}>Status</th>
                    <th style={{ padding: '12px 16px' }}>Title</th>
                    <th style={{ padding: '12px 16px', width: '100px' }}>Difficulty</th>
                    <th style={{ padding: '12px 16px', width: '100px' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {arenaProblems.map(p => {
                    const solved = solvedProblems.includes(p.id);
                    return (
                      <tr 
                        key={p.id} 
                        onClick={() => handleOpenProblem(p)}
                        style={{ 
                          borderBottom: '1px solid rgba(255,255,255,0.05)', 
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '16px', color: solved ? 'var(--success)' : 'var(--surface-border)' }}>
                          {solved ? '✔' : '○'}
                        </td>
                        <td style={{ padding: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                          {p.number}. {p.title}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ 
                            color: p.difficulty === 'Easy' ? 'var(--success)' : p.difficulty === 'Medium' ? '#d29922' : 'var(--error)' 
                          }}>
                            {p.difficulty}
                          </span>
                        </td>
                        <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>
                          +{p.points}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '20px', color: 'var(--text-primary)' }}>Contest Arenas</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Compete in live events to test your skills and climb the global leaderboard!</p>
                
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {['Quantum Cryptography', 'Error Correction', 'Advanced Algorithms'].map(category => (
                    <div key={category} style={{ flex: '1 1 300px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', borderRadius: '12px' }}>
                      <h3 style={{ fontSize: '18px', color: 'var(--accent-primary)', marginBottom: '8px' }}>{category}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Test your skills in {category.toLowerCase()} challenges.</p>
                      <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary)', display: 'inline-block' }}>
                        No active contests
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------
  // RENDER: SOLVER VIEW
  // -------------------------
  return (
    <div className="container responsive-flex" style={{ paddingTop: '24px', display: 'flex', gap: '24px', minHeight: 'calc(100vh - 100px)' }}>
      
      {/* Left Panel: Problem Description */}
      <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <button 
          onClick={() => setActiveProblemId(null)} 
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', marginBottom: '24px', fontSize: '14px' }}
        >
          ← Back to Problem List
        </button>

        <h2 style={{ marginBottom: '8px', fontSize: '24px', color: 'var(--accent-primary)' }}>{activeProblem.number}. {activeProblem.title}</h2>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', fontSize: '12px' }}>
          <span style={{ color: activeProblem.difficulty === 'Easy' ? 'var(--success)' : activeProblem.difficulty === 'Medium' ? '#d29922' : 'var(--error)' }}>
            {activeProblem.difficulty}
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>+{activeProblem.points} Rating</span>
        </div>

        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, overflowY: 'auto' }}>
          {activeProblem.description}
          <br/>
          <p><strong>Constraints:</strong></p>
          <ul>
            {activeProblem.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Status</div>
          {isSolved ? (
            <div style={{ color: 'var(--success)', fontWeight: 'bold' }}>✔ Solved</div>
          ) : submitStatus === 'success' ? (
             <div style={{ color: 'var(--success)', fontWeight: 'bold' }}>✔ Solved! (+{activeProblem.points} Rating)</div>
          ) : submitStatus === 'failed' ? (
             <div style={{ color: 'var(--error)', fontWeight: 'bold' }}>✘ Wrong Answer</div>
          ) : (
            <div style={{ color: 'var(--text-secondary)' }}>● Unsolved</div>
          )}
        </div>
        
        <div style={{ marginTop: '24px' }}>
          <AdBanner dataAdSlot="arena_solver_sidebar" />
        </div>
      </div>

      {/* Right Panel: Visual Builder */}
      <div className="glass-panel" style={{ flex: 2, padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', minWidth: 0 }}>
        {!user && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '8px', background: 'rgba(210, 153, 34, 0.9)', color: '#000', textAlign: 'center', zIndex: 10, fontSize: '14px', fontWeight: 'bold', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
            Sign in to submit your solution and gain rating points!
          </div>
        )}
        <VisualPlayground 
           arenaMode={true} 
           arenaProblemId={activeProblemId}
           onSubmit={handleSubmit}
           submitStatus={submitStatus}
           disableSubmit={!user}
        />
      </div>

    </div>
  );
}
