import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { tutorialSessions } from '@/data/tutorials';
import { arenaProblems } from '@/data/arena';
import UsernameModal from './UsernameModal';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
}

export default function ProfileModal({ user, onClose }: ProfileModalProps) {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<{
    username: string | null;
    rating: number;
    badges: string[];
    completedTutorials: number[];
    solvedArenaProblems: string[];
    usernameChanges: number;
  }>({
    username: null,
    rating: 0,
    badges: [],
    completedTutorials: [],
    solvedArenaProblems: [],
    usernameChanges: 0,
  });
  
  const [showEditUsername, setShowEditUsername] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!db) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            username: data.username || null,
            rating: data.rating || 0,
            badges: data.badges || [],
            completedTutorials: data.completedTutorials || [],
            solvedArenaProblems: data.solvedArenaProblems || [],
            usernameChanges: data.usernameChanges || 0,
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

  const completedCourses = tutorialSessions.filter(session => 
    session.modules.length > 0 && session.modules.every(m => profileData.completedTutorials.includes(m.id))
  );

  const inProgressCourses = tutorialSessions.filter(session => 
    session.modules.length > 0 && 
    session.modules.some(m => profileData.completedTutorials.includes(m.id)) &&
    !session.modules.every(m => profileData.completedTutorials.includes(m.id))
  );

  const solvedProblemTitles = profileData.solvedArenaProblems
    .map(id => arenaProblems.find(p => p.id === id)?.title)
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
          width: '100%', maxWidth: '600px', padding: '32px', 
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
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Header: User Info & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                alt="Profile" 
                style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--surface-border)' }}
              />
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', color: 'var(--text-primary)' }}>
                  {user.displayName}
                </h2>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              <div style={{ textAlign: 'center', background: 'rgba(210, 153, 34, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(210, 153, 34, 0.3)' }}>
                <div style={{ fontSize: '12px', color: '#d29922', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Arena Rating</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d29922' }}>{profileData.rating}</div>
              </div>
            </div>

            {/* Badges */}
            {profileData.badges.length > 0 && (
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-primary)' }}>Badges Earned</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {profileData.badges.map((badge, i) => (
                    <div key={i} style={{ padding: '8px 16px', background: 'rgba(69, 243, 255, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '20px', color: 'var(--accent-primary)', fontSize: '14px', fontWeight: 500 }}>
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
