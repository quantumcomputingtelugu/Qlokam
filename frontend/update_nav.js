const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src', 'components', 'Navigation.tsx');
let content = fs.readFileSync(p, 'utf8');

// 1. Add new state for the contest alert
content = content.replace(
  'const [hasSeenSeasonReset, setHasSeenSeasonReset] = useState(false);',
  'const [hasSeenSeasonReset, setHasSeenSeasonReset] = useState(false);\n  const [hasSeenContestAlert, setHasSeenContestAlert] = useState(false);'
);

content = content.replace(
  "const seenSeasonReset = localStorage.getItem('seenSeasonReset');",
  "const seenSeasonReset = localStorage.getItem('seenSeasonReset');\n    const seenContestAlert = localStorage.getItem('seenContestAlert');"
);

content = content.replace(
  "if (seenSeasonReset) {",
  "if (seenContestAlert) {\n      setHasSeenContestAlert(true);\n    }\n    if (seenSeasonReset) {"
);

// 2. Update the notification badge condition
content = content.replace(
  "{!hasSeenSeasonReset && (",
  "{(!hasSeenSeasonReset || !hasSeenContestAlert) && ("
);

// 3. Update the click handler for marking as read
const oldClickHandler = `if (willShow && !hasSeenSeasonReset) {
                    localStorage.setItem('seenSeasonReset', 'true');
                    setHasSeenSeasonReset(true);
                  }`;
const newClickHandler = `if (willShow) {
                    if (!hasSeenSeasonReset) {
                      localStorage.setItem('seenSeasonReset', 'true');
                      setHasSeenSeasonReset(true);
                    }
                    if (!hasSeenContestAlert) {
                      localStorage.setItem('seenContestAlert', 'true');
                      setHasSeenContestAlert(true);
                    }
                  }`;
content = content.replace(oldClickHandler, newClickHandler);

// 4. Add the notification UI in the dropdown menu, above the Season Reset
const oldNotification = `                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-color)', borderRadius: '50%', opacity: hasSeenSeasonReset ? 0 : 1 }}></span>
                          <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>New Season Started!</span>
                        </div>`;
const contestNotification = `                    <div 
                        style={{ 
                          padding: '12px', 
                          borderRadius: '8px', 
                          background: 'rgba(255, 255, 255, 0.03)', 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          cursor: 'default',
                          transition: 'background 0.2s',
                          marginBottom: '8px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-color)', borderRadius: '50%', opacity: hasSeenContestAlert ? 0 : 1 }}></span>
                          <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>Upcoming Contest!</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '16px' }}>
                          Get ready! A new Easy Contest will take place tomorrow from 5:00 PM to 5:30 PM. The link will appear here automatically when it starts.
                        </p>
                      </div>\n\n`;

content = content.replace('<div \n                        style={{ \n                          padding: \'12px\', \n                          borderRadius: \'8px\', \n                          background: \'rgba(255, 255, 255, 0.03)\',', contestNotification + '<div \n                        style={{ \n                          padding: \'12px\', \n                          borderRadius: \'8px\', \n                          background: \'rgba(255, 255, 255, 0.03)\',');

// 5. Update the navigation link to show if Date.now() >= 1783251000000
content = content.replace(
  "{/* <Link href=\"/contests\" className=\"nav-link\" style={{ fontWeight: 500, color: pathname === '/contests' ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>Contests</Link> */}",
  "{Date.now() >= 1783251000000 && (\n          <Link href=\"/contests\" className=\"nav-link\" style={{ fontWeight: 500, color: pathname === '/contests' ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>Contests</Link>\n        )}"
);

fs.writeFileSync(p, content, 'utf8');
console.log('Navigation.tsx successfully updated');
