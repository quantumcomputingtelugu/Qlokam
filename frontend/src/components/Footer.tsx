'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(0,0,0,0.6)',
      padding: '40px 20px',
      marginTop: 'auto',
      color: 'var(--text-secondary)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '40px'
      }}>
        
        {/* Brand */}
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: 'var(--accent-primary)', fontSize: '24px', marginBottom: '16px', fontWeight: 'bold' }}>
            Qlokam
          </h2>
          <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
            Making quantum computing accessible, interactive, and easy to understand.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '16px', marginBottom: '16px', fontWeight: 'bold' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
            <li><Link href="/tutorials" style={{ color: 'inherit', textDecoration: 'none' }}>Tutorials</Link></li>
            <li><Link href="/playground" style={{ color: 'inherit', textDecoration: 'none' }}>Playground</Link></li>
            <li><Link href="/arena" style={{ color: 'inherit', textDecoration: 'none' }}>Arena</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '16px', marginBottom: '16px', fontWeight: 'bold' }}>Company</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact & Feedback</Link></li>
          </ul>
        </div>

      </div>
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '40px auto 0 auto', 
        paddingTop: '20px', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.3)'
      }}>
        © {new Date().getFullYear()} Qlokam. All rights reserved.
      </div>
    </footer>
  );
}
