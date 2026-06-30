'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'' | 'success' | 'error'>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    const endpoint = form.action;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '80px auto',
      padding: '40px 20px',
      color: 'var(--text-primary)',
    }}>
      <h1 style={{
        fontSize: '40px',
        fontWeight: 'bold',
        marginBottom: '16px',
        background: 'linear-gradient(90deg, #fff, var(--accent-primary))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Contact & Feedback
      </h1>
      
      <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
        Have a question, found a bug, or want to suggest a new feature? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
      </p>

      {status === 'success' && (
        <div style={{
          padding: '16px',
          background: 'rgba(46, 213, 115, 0.1)',
          border: '1px solid rgba(46, 213, 115, 0.4)',
          borderRadius: '8px',
          marginBottom: '24px',
          color: '#2ed573'
        }}>
          Thank you for your message! We will get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div style={{
          padding: '16px',
          background: 'rgba(255, 71, 87, 0.1)',
          border: '1px solid rgba(255, 71, 87, 0.4)',
          borderRadius: '8px',
          marginBottom: '24px',
          color: '#ff4757'
        }}>
          Oops! There was a problem submitting your form. Please try again.
        </div>
      )}

      {/* REPLACE THE ACTION URL WITH YOUR FORMSPREE ENDPOINT */}
      <form 
        action="https://formspree.io/f/xwvdnyaq" 
        method="POST" 
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="name" style={{ fontSize: '14px', fontWeight: '500' }}>Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            required 
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(0,0,0,0.4)',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="email" style={{ fontSize: '14px', fontWeight: '500' }}>Email Address</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            required 
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(0,0,0,0.4)',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="topic" style={{ fontSize: '14px', fontWeight: '500' }}>Topic</label>
          <select 
            name="topic" 
            id="topic"
            required
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#1a1a1a',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            <option value="General Feedback">General Feedback</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Business Inquiry">Business Inquiry</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="message" style={{ fontSize: '14px', fontWeight: '500' }}>Message</label>
          <textarea 
            name="message" 
            id="message" 
            required 
            rows={5}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(0,0,0,0.4)',
              color: '#fff',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
        </div>

        <button 
          type="submit"
          style={{
            marginTop: '16px',
            padding: '14px 24px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--accent-primary)',
            color: '#000',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
