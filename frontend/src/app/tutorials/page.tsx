"use client";

import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import VisualPlayground from '@/components/VisualPlayground';
import { tutorialSessions, getAllTutorials } from '@/data/tutorials';

export default function TutorialsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz' | 'practice'>('lesson');
  const [activeTutorialId, setActiveTutorialId] = useState(1);
  const [completedTutorials, setCompletedTutorials] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const allTutorials = getAllTutorials();

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
          if (docSnap.exists() && docSnap.data().completedTutorials) {
            setCompletedTutorials(docSnap.data().completedTutorials);
          }
        } catch (e) {
          console.error("Error fetching progress", e);
        }
      } else {
        setCompletedTutorials([]); 
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

  const activeTutorial = allTutorials.find(t => t.id === activeTutorialId) || allTutorials[0];
  const isCompleted = completedTutorials.includes(activeTutorial.id);

  const handleTabChange = (tab: 'lesson' | 'quiz' | 'practice') => {
    setActiveTab(tab);
  };

  const handleQuizOptionSelect = (qIndex: number, optIndex: number) => {
    if (showQuizResults) return; // prevent changing after submitted
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
  };

  return (
    <div className="container" style={{ paddingTop: '24px', display: 'flex', gap: '24px', height: 'calc(100vh - 100px)' }}>
      {/* Left Panel: Tutorial List */}
      <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', color: 'var(--accent-primary)' }}>Quantum Modules</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {tutorialSessions.map((session, sIndex) => (
            <div key={sIndex}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '16px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '8px' }}>
                {session.sessionName}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {session.modules.map((tutorial) => {
                  const completed = completedTutorials.includes(tutorial.id);
                  const isActive = activeTutorialId === tutorial.id;
                  return (
                    <div 
                      key={tutorial.id} 
                      onClick={() => { 
                        setActiveTutorialId(tutorial.id); 
                        setActiveTab('lesson'); 
                        setSelectedAnswers({}); 
                        setShowQuizResults(false); 
                      }}
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
                        <h4 style={{ fontSize: '16px', margin: 0, color: 'var(--text-primary)' }}>{tutorial.id}. {tutorial.title}</h4>
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
          ))}
        </div>
      </div>

      {/* Right Panel: Content Area */}
      <div className="glass-panel" style={{ flex: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Header Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--surface-border)', padding: '0 24px' }}>
          {(['lesson', 'quiz', 'practice'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => handleTabChange(tab)}
              style={{ 
                padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
                color: activeTab === tab ? 'var(--accent-primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab ? '2px solid var(--accent-primary)' : '2px solid transparent',
                fontWeight: activeTab === tab ? 600 : 400,
                fontSize: '16px',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div style={{ padding: '32px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <h1 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--text-primary)' }}>{activeTutorial.title}</h1>
          
          {activeTab === 'lesson' ? (
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '16px' }}>
              {activeTutorial.lessonContent}
              
              <div style={{ marginTop: '48px', padding: '24px', background: 'rgba(69, 243, 255, 0.05)', border: '1px solid rgba(69, 243, 255, 0.2)', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 16px 0', color: 'var(--accent-primary)' }}>Finished reading?</h4>
                <p style={{ margin: '0 0 16px 0' }}>Test your knowledge with a quick quiz, or jump straight to practice!</p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {activeTutorial.quizzes && activeTutorial.quizzes.length > 0 && (
                    <button className="btn-secondary" onClick={() => handleTabChange('quiz')} style={{ padding: '8px 16px' }}>Take Quiz</button>
                  )}
                  <button className="btn-primary" onClick={() => handleTabChange('practice')} style={{ padding: '8px 16px' }}>Go to Practice</button>
                </div>
              </div>
            </div>
          ) : activeTab === 'quiz' ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {!activeTutorial.quizzes || activeTutorial.quizzes.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)' }}>
                  No quiz available for this module yet. Jump to Practice!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {activeTutorial.quizzes.map((quiz, qIndex) => (
                    <div key={qIndex} style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                      <h4 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '16px' }}>{quiz.question}</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {quiz.options.map((opt, optIndex) => {
                          const isSelected = selectedAnswers[qIndex] === optIndex;
                          let btnBorder = '1px solid var(--surface-border)';
                          let btnBg = isSelected ? 'rgba(69, 243, 255, 0.1)' : 'transparent';
                          let btnColor = isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)';

                          if (showQuizResults) {
                            if (optIndex === quiz.correctAnswerIndex) {
                              btnBorder = '1px solid var(--success)';
                              btnBg = 'rgba(63, 185, 80, 0.1)';
                              btnColor = 'var(--success)';
                            } else if (isSelected) {
                              btnBorder = '1px solid var(--error)';
                              btnBg = 'rgba(248, 81, 73, 0.1)';
                              btnColor = 'var(--error)';
                            }
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleQuizOptionSelect(qIndex, optIndex)}
                              style={{
                                padding: '16px',
                                textAlign: 'left',
                                background: btnBg,
                                border: btnBorder,
                                color: btnColor,
                                borderRadius: '8px',
                                cursor: showQuizResults ? 'default' : 'pointer',
                                transition: 'all 0.2s',
                                fontSize: '16px'
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {showQuizResults && quiz.explanation && (
                        <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(69, 243, 255, 0.05)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
                          <strong>Explanation:</strong> {quiz.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                  {!showQuizResults ? (
                    <button 
                      className="btn-primary" 
                      onClick={handleQuizSubmit} 
                      disabled={Object.keys(selectedAnswers).length < activeTutorial.quizzes.length}
                      style={{ alignSelf: 'flex-start', padding: '12px 32px' }}
                    >
                      Submit Answers
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button className="btn-secondary" onClick={() => { setShowQuizResults(false); setSelectedAnswers({}); }} style={{ padding: '8px 16px' }}>Retry Quiz</button>
                      <button className="btn-primary" onClick={() => handleTabChange('practice')} style={{ padding: '8px 16px' }}>Continue to Practice</button>
                    </div>
                  )}
                </div>
              )}
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
