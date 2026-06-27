"use client";

import React from 'react';
import VisualPlayground from '@/components/VisualPlayground';

export default function PlaygroundPage() {
  return (
    <div className="container" style={{ paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 'calc(100vh - 100px)' }}>
      <h2>Quantum Playground</h2>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <VisualPlayground />
        </div>
      </div>
    </div>
  );
}
