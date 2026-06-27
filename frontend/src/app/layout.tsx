import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qlokam | Quantum Computing Arena",
  description: "Learn, compete, and execute quantum circuits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="glass-panel" style={{ 
          margin: '16px 24px', 
          padding: '16px 32px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          position: 'sticky',
          top: '16px',
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent-gradient)', borderRadius: '8px' }}></div>
            <h2 style={{ margin: 0, fontWeight: 700 }}><span className="text-gradient">Q</span>lokam</h2>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="/tutorials" className="nav-link" style={{ fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Tutorials</a>
            <a href="/arena" className="nav-link" style={{ fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Arena</a>
            <a href="/playground" className="nav-link" style={{ fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s' }}>Playground</a>
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>Sign In</button>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
