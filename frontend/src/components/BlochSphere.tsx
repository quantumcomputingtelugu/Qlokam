import React from 'react';

interface BlochSphereProps {
  x: number;
  y: number;
  z: number;
  size?: number;
}

export default function BlochSphere({ x, y, z, size = 200 }: BlochSphereProps) {
  const radius = size / 2.5;
  const cx = size / 2;
  const cy = size / 2;

  // Simple isometric projection
  // Assuming X is forward-left, Y is forward-right, Z is up
  const angleX = Math.PI / 6; // 30 degrees
  const angleY = Math.PI / 6;

  // Projection factors
  const px = (x * Math.cos(angleX) - y * Math.cos(angleY));
  const py = (-z + x * Math.sin(angleX) + y * Math.sin(angleY));

  // The actual screen coordinates for the tip of the vector
  const tipX = cx + px * radius;
  const tipY = cy + py * radius;

  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Sphere background / outline */}
        <circle cx={cx} cy={cy} r={radius} fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        
        {/* Equator */}
        <ellipse cx={cx} cy={cy} rx={radius} ry={radius * Math.sin(angleX)} fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Z-axis */}
        <line x1={cx} y1={cy - radius} x2={cx} y2={cy + radius} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="2 2" />
        <text x={cx} y={cy - radius - 5} fill="rgba(255, 255, 255, 0.5)" fontSize="10" textAnchor="middle">|0⟩</text>
        <text x={cx} y={cy + radius + 12} fill="rgba(255, 255, 255, 0.5)" fontSize="10" textAnchor="middle">|1⟩</text>

        {/* X-axis */}
        <line x1={cx - radius * Math.cos(angleX)} y1={cy - radius * Math.sin(angleX)} x2={cx + radius * Math.cos(angleX)} y2={cy + radius * Math.sin(angleX)} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="2 2" />
        <text x={cx - radius * Math.cos(angleX) - 10} y={cy - radius * Math.sin(angleX)} fill="rgba(255, 255, 255, 0.5)" fontSize="10" textAnchor="middle">X</text>

        {/* Y-axis */}
        <line x1={cx + radius * Math.cos(angleY)} y1={cy - radius * Math.sin(angleY)} x2={cx - radius * Math.cos(angleY)} y2={cy + radius * Math.sin(angleY)} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="2 2" />
        <text x={cx + radius * Math.cos(angleY) + 10} y={cy - radius * Math.sin(angleY)} fill="rgba(255, 255, 255, 0.5)" fontSize="10" textAnchor="middle">Y</text>

        {/* State Vector */}
        <line x1={cx} y1={cy} x2={tipX} y2={tipY} stroke="var(--accent-primary)" strokeWidth="3" />
        <circle cx={tipX} cy={tipY} r="4" fill="var(--accent-primary)" />
        <circle cx={cx} cy={cy} r="2" fill="#fff" />
      </svg>
    </div>
  );
}
