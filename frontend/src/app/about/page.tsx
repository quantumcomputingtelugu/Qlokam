import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Qlokam and our mission to democratize quantum computing education.',
};

export default function AboutPage() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '80px auto',
      padding: '40px 20px',
      color: 'var(--text-primary)',
      lineHeight: '1.8'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '24px',
        background: 'linear-gradient(90deg, #fff, var(--accent-primary))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        About Qlokam
      </h1>
      
      <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Welcome to Qlokam, the interactive learning platform designed to make quantum computing accessible, intuitive, and engaging for everyone.
      </p>

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#fff' }}>Our Mission</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Quantum computing is poised to revolutionize technology, medicine, and cryptography. Yet, the barrier to entry remains incredibly high, shrouded in complex mathematics and abstract physics. 
          At Qlokam, our mission is to democratize quantum education. We believe that by transforming abstract concepts into interactive, visual playgrounds, anyone can grasp the fundamentals of quantum mechanics and circuit design.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--accent-primary)' }}>Interactive Learning</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            We replace dense textbooks with visual simulators. Experiment with qubits, apply quantum gates, and instantly observe the resulting states on a Bloch Sphere. 
          </p>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--accent-primary)' }}>Learn by Doing</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Theory only goes so far. Our platform features integrated quizzes and a competitive Arena to test your knowledge and solidify your understanding through practice.
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: '28px', marginBottom: '16px', color: '#fff' }}>Who is this for?</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Whether you are a high school student curious about the future, a software developer looking to upskill, or a physics enthusiast, Qlokam provides the stepping stones you need to enter the quantum era. No advanced PhD required.
      </p>

    </div>
  );
}
