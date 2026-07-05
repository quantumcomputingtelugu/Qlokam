with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """                <div style={{ textAlign: 'center', background: 'rgba(210, 153, 34, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(210, 153, 34, 0.3)' }}>
                  <div style={{ fontSize: '12px', color: '#d29922', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Arena Rating</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d29922' }}>{profileData.rating}</div>
                  <button onClick={() => setView('history')} style={{ display: 'inline-block', marginTop: '12px', background: 'rgba(210, 153, 34, 0.2)', border: 'none', color: '#d29922', textDecoration: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    View History &rarr;
                  </button>
                </div>"""

new_block = """                <div style={{ textAlign: 'center', background: 'rgba(210, 153, 34, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(210, 153, 34, 0.3)' }}>
                  <div style={{ fontSize: '12px', color: '#d29922', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Arena Rating</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d29922' }}>{profileData.rating}</div>
                  <button onClick={() => setView('history')} style={{ display: 'inline-block', marginTop: '12px', background: 'rgba(210, 153, 34, 0.2)', border: 'none', color: '#d29922', textDecoration: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    View History &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 'bold' }}>Contest Rating Rewards</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text-primary)' }}>Easy: <strong style={{ color: '#3fb950' }}>+20</strong></span>
                    <span style={{ color: 'var(--text-primary)' }}>Medium: <strong style={{ color: '#d29922' }}>+40</strong></span>
                    <span style={{ color: 'var(--text-primary)' }}>Hard: <strong style={{ color: '#f85149' }}>+50</strong></span>
                    <span style={{ color: 'var(--text-primary)' }}>Very Hard: <strong style={{ color: '#a371f7' }}>+70</strong></span>
                    <span style={{ color: 'var(--text-primary)' }}>Master: <strong style={{ color: '#58a6ff' }}>+100</strong></span>
                  </div>
                </div>"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added rating rewards legend successfully.")
else:
    print("Could not find the block to replace.")
