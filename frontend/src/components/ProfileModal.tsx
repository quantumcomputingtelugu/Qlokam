import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { tutorialSessions } from '@/data/tutorials';
import { getArenaProblems } from '@/data/arena';
import { contests } from '@/data/contests';
import UsernameModal from './UsernameModal';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
}

export default function ProfileModal({ user, onClose }: ProfileModalProps) {
  const [loading, setLoading] = useState(true);
  const [contestHistory, setContestHistory] = useState<any[]>([]);
  const [expandedContest, setExpandedContest] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<{
    username: string | null;
    rating: number;
    badges: string[];
    completedTutorials: number[];
    solvedArenaProblems: string[];
    usernameChanges: number;
    ratingHistory: { reason: string; points: number; timestamp: string }[];
  }>({
    username: null,
    rating: 0,
    badges: [],
    completedTutorials: [],
    solvedArenaProblems: [],
    usernameChanges: 0,
    ratingHistory: [],
  });
  
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [view, setView] = useState<'profile' | 'history'>('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!db) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        // Fetch contest entries
        const q = query(collection(db, 'contest_entries'), where('userId', '==', user.uid));
        const qs = await getDocs(q);
        const entries = qs.docs.map(d => d.data());
        setContestHistory(entries.sort((a, b) => b.timestamp - a.timestamp));

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            username: data.username || null,
            rating: data.rating || 0,
            badges: data.badges || [],
            completedTutorials: data.completedTutorials || [],
            solvedArenaProblems: data.solvedArenaProblems || [],
            usernameChanges: data.usernameChanges || 0,
            ratingHistory: data.ratingHistory ? data.ratingHistory.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) : [],
          });
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const completedCourses = tutorialSessions.filter(session => {
    if (session.modules.length === 0) return false;
    const finalTestModule = session.modules.find(m => m.isFinalTest);
    if (finalTestModule && profileData.completedTutorials.includes(finalTestModule.id)) {
      return true;
    }
    return session.modules.every(m => profileData.completedTutorials.includes(m.id));
  });

  const inProgressCourses = tutorialSessions.filter(session => {
    if (session.modules.length === 0) return false;
    const isCompleted = completedCourses.includes(session);
    const hasStarted = session.modules.some(m => profileData.completedTutorials.includes(m.id));
    return hasStarted && !isCompleted;
  });

  const solvedProblemTitles = profileData.solvedArenaProblems
    .map(id => getArenaProblems().find(p => p.id === id)?.title)
    .filter(Boolean) as string[];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }} onClick={onClose}>
      <div 
        className="glass-panel" 
        style={{ 
          width: '100%', maxWidth: '800px', padding: '32px', 
          borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '24px' }}
        >
          &times;
        </button>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading Profile...</div>
        ) : view === 'history' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => setView('profile')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px' }}>&larr;</button>
              <h2 style={{ margin: 0, fontSize: '24px', color: 'var(--text-primary)' }}>Rating History</h2>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: 'rgba(210, 153, 34, 0.05)', borderRadius: '12px', border: '1px solid rgba(210, 153, 34, 0.2)' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#d29922', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Current Rating</div>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#d29922' }}>{profileData.rating}</div>
              </div>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                alt="Profile" 
                style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(210, 153, 34, 0.5)' }}
              />
            </div>

            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: 'var(--text-secondary)' }}>Activity Log</h3>
            
            {profileData.ratingHistory.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--surface-border)' }}>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No rating history found. Solve problems in the Arena or complete quizzes to earn rating!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {profileData.ratingHistory.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>{item.reason}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {new Date(item.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3fb950', background: 'rgba(63, 185, 80, 0.1)', padding: '8px 16px', borderRadius: '20px' }}>
                      +{item.points}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Header: User Info & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                alt="Profile" 
                style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--surface-border)' }}
              />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: 'var(--text-primary)' }}>
                  {user.displayName}
                </h2>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span>{profileData.username ? `@${profileData.username}` : 'No username set'}</span>
                  {profileData.usernameChanges < 3 && (
                    <button 
                      onClick={() => setShowEditUsername(true)}
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--surface-border)', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                    >
                      Edit Username ({3 - profileData.usernameChanges} left)
                    </button>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-start' }}>
                <div style={{ textAlign: 'center', background: 'rgba(210, 153, 34, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(210, 153, 34, 0.3)' }}>
                  <div style={{ fontSize: '12px', color: '#d29922', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Arena Rating</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d29922' }}>{profileData.rating}</div>
                  <button onClick={() => setView('history')} style={{ display: 'inline-block', marginTop: '12px', background: 'rgba(210, 153, 34, 0.2)', border: 'none', color: '#d29922', textDecoration: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    View History &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 'bold' }}>Contest Rating Rewards</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-primary)' }}>Easy: <strong style={{ color: '#3fb950' }}>+1</strong></span>
                    <span style={{ color: 'var(--text-primary)' }}>Medium: <strong style={{ color: '#d29922' }}>+40</strong></span>
                    <span style={{ color: 'var(--text-primary)' }}>Hard: <strong style={{ color: '#f85149' }}>+50</strong></span>
                    <span style={{ color: 'var(--text-primary)' }}>Very Hard: <strong style={{ color: '#a371f7' }}>+70</strong></span>
                    <span style={{ color: 'var(--text-primary)' }}>Master: <strong style={{ color: '#58a6ff' }}>+100</strong></span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {['Easy', 'Medium', 'Hard', 'Very Hard', 'Master'].map((b) => {
                    const count = profileData.badges.filter(badge => badge === b).length;
                    let color = 'var(--text-secondary)';
                    if (b === 'Easy') color = '#3fb950'; // green
                    if (b === 'Medium') color = '#d29922'; // yellow/gold
                    if (b === 'Hard') color = '#f85149'; // red
                    if (b === 'Very Hard') color = '#a371f7'; // purple
                    if (b === 'Master') color = '#58a6ff'; // blue
                    
                    return (
                      <div key={b} style={{ 
                        display: 'flex', flexDirection: 'column', alignItems: 'center', 
                        background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '8px', 
                        border: `1px solid ${count > 0 ? color : 'rgba(255,255,255,0.1)'}`,
                        opacity: count > 0 ? 1 : 0.5
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: count > 0 ? color : 'var(--text-secondary)', textTransform: 'uppercase' }}>{b}</div>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
              {/* Courses Completed */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-primary)' }}>Courses Completed</h3>
                  <span style={{ background: 'var(--success)', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px' }}>
                    {completedCourses.length}
                  </span>
                </div>
                {completedCourses.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>You haven't completed any courses yet.</p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.8 }}>
                    {completedCourses.map((course) => (
                      <li key={course.id}>{course.sessionName}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Courses In Progress */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-primary)' }}>Courses In Progress</h3>
                  <span style={{ background: 'var(--accent-primary)', color: '#000', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px' }}>
                    {inProgressCourses.length}
                  </span>
                </div>
                {inProgressCourses.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>You don't have any courses in progress.</p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.8 }}>
                    {inProgressCourses.map((course) => (
                      <li key={course.id}>{course.sessionName}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Contest History */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-primary)' }}>Contest History</h3>
                  <span style={{ background: 'rgba(210, 153, 34, 0.2)', color: '#d29922', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px' }}>
                    {contestHistory.length}
                  </span>
                </div>
                {contestHistory.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>You haven't participated in any contests yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {contestHistory.map(entry => {
                      const contestDef = contests.find(c => c.id === entry.contestId);
                      const isExpanded = expandedContest === entry.contestId;
                      
                      return (
                        <div key={entry.contestId} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                          <div 
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
                            onClick={() => setExpandedContest(isExpanded ? null : entry.contestId)}
                          >
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                {contestDef?.title || entry.contestId}
                              </div>
                              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                Score: {entry.score} | Time: {Math.floor(entry.timeTaken / 60)}m {entry.timeTaken % 60}s
                              </div>
                            </div>
                            <div style={{ fontSize: '14px', color: 'var(--accent-primary)' }}>
                              {isExpanded ? 'Hide Answers' : 'View Answers'}
                            </div>
                          </div>
                          
                          {isExpanded && contestDef && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.01)' }}>
                              <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>Contest Questions & Answers</h4>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {contestDef.questions.map((q, idx) => (
                                  <div key={idx} style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                      <strong>Q{idx + 1}:</strong> {q.question}
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#3fb950', background: 'rgba(63, 185, 80, 0.1)', padding: '8px', borderRadius: '4px' }}>
                                      <strong>Answer: </strong>
                                      {q.type === 'mcq' && q.options && q.correctAnswerIndex !== undefined 
                                        ? q.options[q.correctAnswerIndex]
                                        : q.expectedOutputsText 
                                          ? q.expectedOutputsText 
                                          : JSON.stringify(q.expectedProbs)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Arena Questions Completed */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-primary)' }}>Arena Problems Solved</h3>
                  <span style={{ background: '#d29922', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px' }}>
                    {solvedProblemTitles.length}
                  </span>
                </div>
                {solvedProblemTitles.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>You haven't solved any Arena problems yet.</p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.8 }}>
                    {solvedProblemTitles.map((title, i) => (
                      <li key={i}>{title}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          </div>
        )}
      </div>

      {showEditUsername && (
        <UsernameModal 
          user={user} 
          mode="edit"
          remainingChanges={3 - profileData.usernameChanges}
          onClose={() => setShowEditUsername(false)}
          onUsernameSet={(newUsername) => {
            setProfileData(prev => ({ 
              ...prev, 
              username: newUsername,
              usernameChanges: prev.usernameChanges + 1
            }));
            setShowEditUsername(false);
          }} 
        />
      )}
    </div>
  );
}
