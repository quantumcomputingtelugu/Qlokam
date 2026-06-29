/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import VisualPlayground from '@/components/VisualPlayground';
import { tutorialSessions, getAllTutorials } from '@/data/tutorials';
import AdBanner from '@/components/AdBanner';

export default function TutorialsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz' | 'practice'>('lesson');
  const [activeTutorialId, setActiveTutorialId] = useState(1);
  const [completedTutorials, setCompletedTutorials] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCourseId, setActiveCourseId] = useState(tutorialSessions[0].id);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const [rating, setRating] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);

  const [adLoading, setAdLoading] = useState<'hint' | 'skip' | null>(null);
  const [hintUnlocked, setHintUnlocked] = useState(false);
  
  const [showSimulatedAd, setShowSimulatedAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);

  const allTutorials = getAllTutorials();
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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSimulatedAd && adCountdown > 0) {
      timer = setTimeout(() => {
        setAdCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showSimulatedAd, adCountdown]);

  const handleWatchAd = () => {
    setShowSimulatedAd(true);
  };

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
            if (data.completedTutorials) setCompletedTutorials(data.completedTutorials);
            if (data.rating) setRating(data.rating);
            if (data.badges) setBadges(data.badges);
          }
        } catch (e) {
          console.error("Error fetching progress", e);
        }
      } else {
        setCompletedTutorials([]); 
        setRating(0);
        setBadges([]);
      }
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  const handleMarkComplete = async () => {
    if (!user || !db || completedTutorials.includes(activeTutorialId)) return;
    setSaving(true);
    const newCompleted = [...completedTutorials, activeTutorialId];
    
    let updatedRating = rating;
    let updatedBadges = [...badges];
    
    if (activeTutorial.isFinalTest) {
      if (activeTutorial.pointsAward) updatedRating += activeTutorial.pointsAward;
      if (activeTutorial.badgeAward && !updatedBadges.includes(activeTutorial.badgeAward)) {
        updatedBadges.push(activeTutorial.badgeAward);
      }
    }

    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { 
        completedTutorials: newCompleted,
        ...(activeTutorial.isFinalTest && { rating: updatedRating, badges: updatedBadges })
      }, { merge: true });
      
      setCompletedTutorials(newCompleted);
      
      if (activeTutorial.isFinalTest) {
        setRating(updatedRating);
        setBadges(updatedBadges);
        setEarnedBadge(activeTutorial.badgeAward || null);
        setEarnedPoints(activeTutorial.pointsAward || null);
      }
    } catch (e) {
      console.error("Error saving progress", e);
    }
    setSaving(false);
  };


  return (
    <div className="container responsive-flex" style={{ paddingTop: '24px', display: 'flex', gap: '24px', height: 'calc(100vh - 100px)', width: '100%' }}>
      {/* Left Panel: Tutorial List */}
      <div 
        className="glass-panel responsive-sidebar" 
        style={{ 
          width: isSidebarOpen ? '350px' : '60px', 
          flexShrink: 0, 
          padding: isSidebarOpen ? '20px' : '20px 10px', 
          display: 'flex', 
          flexDirection: 'column', 
          overflowY: 'auto',
          transition: 'width 0.3s ease, padding 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          {isSidebarOpen && <h2 style={{ fontSize: '20px', color: 'var(--accent-primary)', margin: 0 }}>Quantum Modules</h2>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px', padding: 0 }}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        {isSidebarOpen && (
          <>
            {/* Horizontal Scroll for Courses */}
            <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '12px', marginBottom: '16px', borderBottom: '1px solid var(--surface-border)' }}>
              {tutorialSessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => { setActiveCourseId(session.id); }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    whiteSpace: 'nowrap',
                    background: activeCourseId === session.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                    color: activeCourseId === session.id ? '#000' : 'var(--text-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: activeCourseId === session.id ? 'bold' : 'normal',
                    fontSize: '14px',
                    transition: 'all 0.2s'
                  }}
                >
                  {session.sessionName}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {tutorialSessions.find(s => s.id === activeCourseId)?.modules.map((tutorial) => {
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
                    <div className="flex-between">
                      <h4 style={{ fontSize: '15px', margin: 0, color: tutorial.isFinalTest ? '#d29922' : 'var(--text-primary)' }}>
                        {tutorial.isFinalTest ? '🏆 ' : `${tutorial.id}. `}{tutorial.title}
                      </h4>
                      {completed && (
                        <span style={{ fontSize: '12px', color: 'var(--success)' }}>
                          ✔
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
              <AdBanner dataAdSlot="tutorials_sidebar" />
            </div>
          </>
        )}
      </div>

      {/* Right Panel: Content Area */}
      <div className="glass-panel responsive-content" style={{ flex: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
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
              ) : activeTutorial.id > 1 && !completedTutorials.includes(activeTutorial.id - 1) ? (
                <div style={{ textAlign: 'center', marginTop: '64px', padding: '40px', background: 'rgba(210, 153, 34, 0.05)', borderRadius: '12px', border: '1px dashed rgba(210, 153, 34, 0.3)' }}>
                  <h3 style={{ fontSize: '24px', color: '#d29922', margin: '0 0 16px 0' }}>Quiz is Locked</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: '0 auto 24px', maxWidth: '400px' }}>
                    You must complete <strong>Module {activeTutorial.id - 1}</strong> before you can unlock this quiz!
                  </p>
                  <button className="btn-primary" onClick={() => { setActiveTutorialId(activeTutorial.id - 1); setActiveTab('lesson'); }} style={{ padding: '8px 16px' }}>
                    Go to Module {activeTutorial.id - 1}
                  </button>
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <button 
                        className="btn-primary" 
                        onClick={handleQuizSubmit} 
                        disabled={Object.keys(selectedAnswers).length < activeTutorial.quizzes.length}
                        style={{ alignSelf: 'flex-start', padding: '12px 32px' }}
                      >
                        Submit Answers
                      </button>
                      
                      {/* Rewarded Ads Integration */}
                      <div style={{ display: 'flex', gap: '16px', marginTop: '16px', padding: '16px', background: 'rgba(210, 153, 34, 0.05)', borderRadius: '8px', border: '1px dashed rgba(210, 153, 34, 0.3)' }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 8px 0', color: '#d29922' }}>Stuck on this quiz?</h4>
                          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Watch a short sponsored message to unlock a hint.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <button 
                            className="btn-secondary" 
                            onClick={handleWatchAd}
                            disabled={adLoading !== null || hintUnlocked}
                            style={{ padding: '8px 16px', fontSize: '14px' }}
                          >
                            {adLoading === 'hint' ? 'Loading Ad...' : hintUnlocked ? 'Hint Unlocked!' : '🎥 Watch Ad for Hint'}
                          </button>
                        </div>
                      </div>
                      
                      {hintUnlocked && (
                        <div style={{ padding: '16px', background: 'rgba(69, 243, 255, 0.05)', borderRadius: '8px', border: '1px solid var(--accent-primary)', color: 'var(--text-primary)' }}>
                          <strong>Hint:</strong> Look closely at how the states change before and after applying the quantum gates. If you are ever stuck, try testing it out in the Playground!
                        </div>
                      )}
                    </div>
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
      
      {/* Simulated Ad Modal */}
      {showSimulatedAd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', maxWidth: '600px', width: '100%', animation: 'scaleIn 0.3s ease-out', position: 'relative' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '16px' }}>Sponsored Message</h2>
            
            <div style={{ background: '#000', width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--surface-border)', overflow: 'hidden' }}>
               <img src="/quantum_hardware_bg_1782555897437.png" alt="Ad Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
               <div style={{ position: 'absolute', fontSize: '24px', fontWeight: 'bold' }}>Video Ad Playing...</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Reward in {adCountdown}s</span>
              <button 
                className="btn-secondary" 
                disabled={adCountdown > 0}
                onClick={() => {
                  setHintUnlocked(true);
                  setShowSimulatedAd(false);
                  setAdCountdown(5);
                }}
                style={{ padding: '8px 24px', opacity: adCountdown > 0 ? 0.5 : 1 }}
              >
                {adCountdown > 0 ? 'Wait...' : 'Skip & Get Reward'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gamification Modal */}
      {earnedBadge && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', maxWidth: '500px', animation: 'scaleIn 0.3s ease-out' }}>
            <h2 style={{ fontSize: '32px', color: '#d29922', marginBottom: '16px' }}>Course Completed!</h2>
            <div style={{ fontSize: '64px', margin: '24px 0' }}>{earnedBadge.split(' ')[0]}</div>
            <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>{earnedBadge.substring(earnedBadge.indexOf(' ') + 1)}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              You earned <strong style={{ color: '#d29922' }}>+{earnedPoints} Arena Points</strong>! Keep up the great work!
            </p>
            <button className="btn-primary" onClick={() => { setEarnedBadge(null); setEarnedPoints(null); }} style={{ padding: '12px 32px' }}>
              Awesome!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
