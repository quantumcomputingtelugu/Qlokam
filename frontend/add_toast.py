with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\Navigation.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

state_old = """  const [hasSeenContestAlert, setHasSeenContestAlert] = useState(false);
  const [hideContestMessage, setHideContestMessage] = useState(false);
  const pathname = usePathname();"""

state_new = """  const [hasSeenContestAlert, setHasSeenContestAlert] = useState(false);
  const [hideContestMessage, setHideContestMessage] = useState(false);
  const [toastDismissed, setToastDismissed] = useState(false);
  const pathname = usePathname();"""

ui_old = """    {user && showProfileModal && (
      <ProfileModal user={user} onClose={() => setShowProfileModal(false)} />
    )}
    </>
  );
}"""

ui_new = """    {user && showProfileModal && (
      <ProfileModal user={user} onClose={() => setShowProfileModal(false)} />
    )}
    
    {(!hasSeenSeasonReset || !hasSeenContestAlert) && !toastDismissed && user && (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: 'var(--surface-primary)',
        border: '1px solid var(--accent-primary)',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,255,255,0.15)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        animation: 'slideUp 0.3s ease-out'
      }}>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
        <div>
          <h4 style={{ margin: 0, color: 'var(--text-primary)', marginBottom: '4px' }}>New Notifications</h4>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>You have unread updates. Check the bell icon!</p>
        </div>
        <button 
          onClick={() => setToastDismissed(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '20px',
            padding: '4px'
          }}
        >
          &times;
        </button>
      </div>
    )}
    </>
  );
}"""

if state_old in content and ui_old in content:
    content = content.replace(state_old, state_new).replace(ui_old, ui_new)
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\Navigation.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added toast popup successfully")
else:
    print("Could not find injection points")
