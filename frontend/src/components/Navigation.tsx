/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import UsernameModal from './UsernameModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && db) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists() && userDoc.data().username) {
            setUsername(userDoc.data().username);
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    if (!auth) return;
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <>
      <nav className="glass-panel nav-container" style={{ 
      margin: '16px auto', 
      maxWidth: '1200px', 
      padding: '16px 32px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/icon.svg" alt="Qlokam Logo" style={{ width: '32px', height: '32px' }} />
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ margin: 0, fontWeight: 700 }}><span className="text-gradient">Q</span>lokam</h2>
        </Link>
      </div>
      <div className="nav-menu" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link href="/tutorials" className="nav-link" style={{ fontWeight: 500, color: pathname === '/tutorials' ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>Tutorials</Link>
        {user && (
          <Link href="/arena" className="nav-link" style={{ fontWeight: 500, color: pathname?.startsWith('/arena') ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>Arena</Link>
        )}
        <Link href="/playground" className="nav-link" style={{ fontWeight: 500, color: pathname === '/playground' ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>Playground</Link>
        <a href="mailto:quantumcomputingtelugu@gmail.com?subject=Qlokam%20Feedback" className="nav-link" style={{ fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Feedback</a>
        
        {!loading && (
          user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div 
                style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                onClick={() => alert("Notifications coming soon!")}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.stroke = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.stroke = 'var(--text-secondary)'}>
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span style={{ position: 'absolute', top: '-2px', right: '0px', width: '8px', height: '8px', backgroundColor: 'var(--accent-color)', borderRadius: '50%', border: '2px solid var(--background-elevated)' }}></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                  alt="Profile" 
                  style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                />
                {username && <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>@{username}</span>}
              </div>
              <button onClick={handleSignOut} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Sign Out</button>
            </div>
          ) : (
            <button onClick={handleSignIn} className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign In
            </button>
          )
        )}
      </div>
    </nav>
      
    {user && !loading && !username && (
        <UsernameModal 
          user={user} 
          onUsernameSet={(newUsername) => {
            setUsername(newUsername);
          }} 
        />
      )}
    </>
  );
}
