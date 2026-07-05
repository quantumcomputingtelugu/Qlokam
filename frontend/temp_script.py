with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\arena\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the array of categories
old_categories = """                  {['Quantum Cryptography', 'Error Correction', 'Advanced Algorithms'].map(category => (
                    <div key={category} style={{ flex: '1 1 300px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', borderRadius: '12px' }}>
                      <h3 style={{ fontSize: '18px', color: 'var(--accent-primary)', marginBottom: '8px' }}>{category}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Test your skills in {category.toLowerCase()} challenges.</p>
                      <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary)', display: 'inline-block' }}>
                        No active contests
                      </div>
                    </div>
                  ))}"""

new_categories = """                  <div style={{ flex: '1 1 300px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '18px', color: 'var(--accent-primary)', marginBottom: '8px' }}>Quantum Computing</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Test your skills in general quantum computing challenges.</p>
                    <Link href="/contests" style={{ textDecoration: 'none', padding: '10px 16px', background: 'var(--accent-primary)', color: '#000', borderRadius: '6px', fontSize: '14px', fontWeight: 600, display: 'inline-block', cursor: 'pointer' }}>
                      Join Easy Contest (Active)
                    </Link>
                  </div>"""

if old_categories in content:
    content = content.replace(old_categories, new_categories)
else:
    print("WARNING: Could not find old categories string to replace.")

# Need to make sure Link is imported
if 'import Link from' not in content:
    content = content.replace('import { useState', 'import Link from "next/link";\nimport { useState')

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\arena\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
