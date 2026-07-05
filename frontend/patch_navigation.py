with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\Navigation.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_use_effect = """  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('seenSeasonReset');
      if (seen) setHasSeenSeasonReset(true);
    }
  }, []);"""

new_use_effect = """  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('seenSeasonReset');
      if (seen) setHasSeenSeasonReset(true);
      
      const seenContest = localStorage.getItem('seenContestAlert');
      if (seenContest) setHasSeenContestAlert(true);
    }
  }, []);"""

old_toast = """        <div>
          <h4 style={{ margin: 0, color: 'var(--text-primary)', marginBottom: '4px' }}>New Notifications</h4>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>You have unread updates. Check the bell icon!</p>
        </div>"""

new_toast = """        <div>
          <h4 style={{ margin: 0, color: 'var(--text-primary)', marginBottom: '4px' }}>Upcoming Contest!</h4>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '300px' }}>Get ready! A new Easy Contest will take place today from 5:00 PM to 5:30 PM. The link will appear here automatically when it starts.</p>
        </div>"""

if old_use_effect in content and old_toast in content:
    content = content.replace(old_use_effect, new_use_effect).replace(old_toast, new_toast)
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\Navigation.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched Notification.tsx successfully")
else:
    print("Could not find blocks to patch.")
