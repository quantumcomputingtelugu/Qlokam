import React from 'react';

export default function AnnouncementBanner() {
  return (
    <div style={{
      background: 'rgba(255, 77, 77, 0.1)',
      borderBottom: '1px solid rgba(255, 77, 77, 0.3)',
      color: '#ff4d4d',
      padding: '12px 24px',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }}>
      <span>⚠️</span>
      <span>
        <strong>Important:</strong> Sorry, today we are setting all members' ratings to <strong>0</strong> to prepare for the new season!
      </span>
    </div>
  );
}
