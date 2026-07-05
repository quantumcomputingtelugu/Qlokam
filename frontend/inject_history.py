with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update imports
if 'import { contests }' not in content:
    content = content.replace(
        "import { getArenaProblems } from '@/data/arena';", 
        "import { getArenaProblems } from '@/data/arena';\nimport { contests } from '@/data/contests';"
    )

content = content.replace(
    "import { doc, getDoc } from 'firebase/firestore';",
    "import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';"
)

# 2. Update state to hold contest history
if 'contestHistory' not in content:
    content = content.replace(
        "const [loading, setLoading] = useState(true);",
        "const [loading, setLoading] = useState(true);\n  const [contestHistory, setContestHistory] = useState<any[]>([]);\n  const [expandedContest, setExpandedContest] = useState<string | null>(null);"
    )

# 3. Fetch contest history
old_fetch = """        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({"""

new_fetch = """        // Fetch contest entries
        const q = query(collection(db, 'contest_entries'), where('userId', '==', user.uid));
        const qs = await getDocs(q);
        const entries = qs.docs.map(d => d.data());
        setContestHistory(entries.sort((a, b) => b.timestamp - a.timestamp));

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({"""

if old_fetch in content:
    content = content.replace(old_fetch, new_fetch)

# 4. Add UI for Contest History at the bottom of the profile view
old_ui_bottom = """              {/* Arena Questions Completed */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '24px' }}>"""

new_ui_bottom = """              {/* Contest History */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-primary)' }}>Contest History</h3>
                  <span style={{ background: 'rgba(210, 153, 34, 0.2)', color: '#d29922', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px' }}>
                    {contestHistory.length}
                  </span>
                </div>
                {contestHistory.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>You haven't participated in any contests yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {contestHistory.map(entry => {
                      const contestDef = contests.find(c => c.id === entry.contestId);
                      const isExpanded = expandedContest === entry.contestId;
                      
                      return (
                        <div key={entry.contestId} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                          <div 
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
                            onClick={() => setExpandedContest(isExpanded ? null : entry.contestId)}
                          >
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                {contestDef?.title || entry.contestId}
                              </div>
                              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                Score: {entry.score} | Time: {Math.floor(entry.timeTaken / 60)}m {entry.timeTaken % 60}s
                              </div>
                            </div>
                            <div style={{ fontSize: '14px', color: 'var(--accent-primary)' }}>
                              {isExpanded ? 'Hide Answers' : 'View Answers'}
                            </div>
                          </div>
                          
                          {isExpanded && contestDef && (
                            <div style={{ padding: '16px', borderTop: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.01)' }}>
                              <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>Contest Questions & Answers</h4>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {contestDef.questions.map((q, idx) => (
                                  <div key={idx} style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                      <strong>Q{idx + 1}:</strong> {q.question}
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#3fb950', background: 'rgba(63, 185, 80, 0.1)', padding: '8px', borderRadius: '4px' }}>
                                      <strong>Answer: </strong>
                                      {q.type === 'mcq' && q.options && q.correctAnswerIndex !== undefined 
                                        ? q.options[q.correctAnswerIndex]
                                        : q.expectedOutputsText 
                                          ? q.expectedOutputsText 
                                          : JSON.stringify(q.expectedProbs)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Arena Questions Completed */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '24px' }}>"""

if old_ui_bottom in content:
    content = content.replace(old_ui_bottom, new_ui_bottom)

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected Contest History successfully")
