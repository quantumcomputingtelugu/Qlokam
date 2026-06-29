"use client";

import React, { useEffect, useState } from 'react';

export default function AnnouncementModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the announcement today
    const seen = localStorage.getItem('seenRatingResetAnnouncement');
    if (!seen) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seenRatingResetAnnouncement', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(8px)'
    }}>
      <div className="glass-panel" style={{ padding: '32px', maxWidth: '450px', width: '90%', position: 'relative', textAlign: 'center' }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#ff4d4d' }}>⚠️ Important Announcement</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '16px', lineHeight: '1.5' }}>
          Sorry, today we are setting all members' ratings to <strong>0</strong>. 
          <br /><br />
          This is to prepare for the new season and give everyone a fresh start on the leaderboard!
        </p>

        <button 
          onClick={handleClose}
          className="btn-primary" 
          style={{ width: '100%', padding: '12px' }}
        >
          I Understand
        </button>
      </div>
    </div>
  );
}
