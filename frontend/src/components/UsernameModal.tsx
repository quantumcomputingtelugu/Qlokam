"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { User } from 'firebase/auth';

interface UsernameModalProps {
  user: User;
  onUsernameSet: (username: string) => void;
}

export default function UsernameModal({ user, onUsernameSet }: UsernameModalProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/user/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ username: username.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to set username');
      }

      onUsernameSet(data.username);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)'
    }}>
      <div className="glass-panel" style={{ padding: '32px', maxWidth: '400px', width: '90%', position: 'relative' }}>
        <h2 style={{ marginTop: 0, marginBottom: '8px' }}>Choose your Username</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
          Welcome to Qlokam! Please choose a unique username to appear on the Leaderboard and your profile.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. quantum_master"
              className="glass-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              disabled={loading}
              pattern="^[a-zA-Z0-9_]+$"
              title="Only letters, numbers, and underscores are allowed"
              minLength={3}
              maxLength={20}
              required
            />
          </div>

          {error && (
            <div style={{ color: '#ff4d4d', fontSize: '14px', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '12px' }}
            disabled={loading || !username.trim()}
          >
            {loading ? 'Verifying...' : 'Claim Username'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
