"use client";

import React from 'react';

type AdBannerProps = {
  dataAdSlot?: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
};

export default function AdBanner({ className = "" }: AdBannerProps) {
  return (
    <div className={`glass-panel ${className}`} style={{ 
      padding: '16px', 
      background: 'rgba(255,255,255,0.02)', 
      border: '1px solid var(--surface-border)', 
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '300px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ 
          width: '130px', 
          height: '100px', 
          background: 'rgba(69, 243, 255, 0.1)',
          border: '1px solid var(--accent-primary)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '10px', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Image (130x100)</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
            Accelerate your quantum algorithms on the world's most powerful cloud infrastructure.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <a href="#" style={{ fontSize: '10px', color: 'var(--text-secondary)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          ads via Carbon
        </a>
      </div>
      
      {/* 
        NOTE FOR DEPLOYMENT:
        Once approved by Carbon Ads, replace this entire component's return statement with your provided script tag:
        
        return (
          <div className={className} id="carbon-container">
            <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=YOUR_SERVE_ID&placement=YOUR_PLACEMENT" id="_carbonads_js"></script>
          </div>
        );
      */}
    </div>
  );
}
