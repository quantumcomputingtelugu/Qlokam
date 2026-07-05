with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\Navigation.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_link = """        {true /* TESTING */ && (
          <Link href="/contests" className="nav-link" style={{ fontWeight: 500, color: pathname === '/contests' ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>Contests</Link>
        )}"""

if old_link in content:
    content = content.replace(old_link, '')
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\Navigation.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Removed contests link successfully")
else:
    print("Could not find old link")
