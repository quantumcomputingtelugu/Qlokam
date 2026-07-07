"use client";

import React, { useEffect, useRef } from 'react';

type AdBannerProps = {
  dataAdSlot?: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
};

export default function AdBanner({
  dataAdSlot = "1234567890",
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = ""
}: AdBannerProps) {
  const reference = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (reference.current && !reference.current.getAttribute('data-adsbygoogle-status')) {
        const w = window as any;
        if (typeof w !== 'undefined' && w.adsbygoogle) {
          (w.adsbygoogle = w.adsbygoogle || []).push({});
        }
      }
    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, []);

  return (
    <div className={`glass-panel ${className}`} style={{ padding: '8px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--surface-border)', overflow: 'hidden', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Advertisement Space</span>
      
      <ins
        ref={reference}
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
