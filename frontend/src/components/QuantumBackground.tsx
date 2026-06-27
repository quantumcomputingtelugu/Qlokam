"use client";

import React, { useEffect, useRef } from 'react';

const QuantumBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    // Node representing a quantum state or gate
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      phase: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1.5;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        
        this.phase += 0.05;
      }

      draw() {
        if (!ctx) return;
        const glow = Math.sin(this.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(69, 243, 255, ${0.4 + glow * 0.6})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#45f3ff';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const nodes = Array.from({ length: 80 }, () => new Node());

    let animationFrameId: number;

    const drawGrid = () => {
       ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
       ctx.lineWidth = 1;
       const step = 50;
       for(let x=0; x<width; x+=step) {
           ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
       }
       for(let y=0; y<height; y+=step) {
           ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
       }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw a subtle quantum hardware grid
      drawGrid();

      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Draw connecting lines (circuit wires)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            // Lines snap to horizontal/vertical if close to form circuit-like patterns occasionally
            const isCircuit = Math.abs(dx) < 20 || Math.abs(dy) < 20;
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            
            if (isCircuit) {
              // Draw stepped line
              ctx.lineTo(nodes[j].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(192, 132, 252, ${1 - dist / 150})`; // Purple accent
            } else {
              // Normal straight line
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(69, 243, 255, ${(1 - dist / 150) * 0.5})`; // Blue primary
            }
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#0b0c10',
        pointerEvents: 'none'
      }}
    />
  );
};

export default QuantumBackground;
