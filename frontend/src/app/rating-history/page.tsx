"use client";

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

interface RatingHistoryEvent {
  reason: string;
  points: number;
  timestamp: string;
}

export default function RatingHistoryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<RatingHistoryEvent[]>([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const docRef = doc(db, 'users', u.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.rating) setRating(data.rating);
            if (data.ratingHistory) {
              const sortedHistory = (data.ratingHistory as RatingHistoryEvent[]).sort(
                (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
              );
              setHistory(sortedHistory);
            }
          }
        } catch (e) {
          console.error("Error fetching rating history", e);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading History...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', padding: '24px' }}>
        <Link href="/" style={{ display: 'inline-block', marginBottom: '24px', color: 'var(--accent-primary)', textDecoration: 'none' }}>&larr; Back to Home</Link>
        <h2>Please log in to view your rating history.</h2>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <header className="glass-panel" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/arena" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginRight: '16px', fontSize: '20px' }}>&larr;</Link>
        <h1 style={{ margin: 0, fontSize: '20px', color: 'var(--text-primary)' }}>Rating History</h1>
      </header>
      
      <main style={{ flex: 1, padding: '24px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', padding: '24px', background: 'rgba(210, 153, 34, 0.05)', borderRadius: '12px', border: '1px solid rgba(210, 153, 34, 0.2)' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#d29922', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Current Rating</div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#d29922' }}>{rating}</div>
          </div>
          <img 
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
            alt="Profile" 
            style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(210, 153, 34, 0.5)' }}
          />
        </div>

        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: 'var(--text-secondary)' }}>Activity Log</h3>
        
        {history.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--surface-border)' }}>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No rating history found. Solve problems in the Arena or complete quizzes to earn rating!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {history.map((item, i) => (
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
      </main>
    </div>
  );
}
