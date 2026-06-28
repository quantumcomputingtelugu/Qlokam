"use client";

import React, { useEffect } from 'react';

type AdBannerProps = {
  dataAdSlot?: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
};

export default function AdBanner({
  dataAdSlot = "1234567890", // Placeholder slot
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = ""
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className={`glass-panel ${className}`} style={{ padding: '8px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--surface-border)', overflow: 'hidden', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* If AdSense isn't fully approved yet, this text will show. Once approved, the ad covers it. */}
      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Advertisement</span>
      
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-7454305472547947"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}
