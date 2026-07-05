with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\contests\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the layout
old_layout = """      {contestStarted && activeContest && (
        <div style={{ display: "flex", gap: "32px", height: "800px" }}>
          
          {/* Question List Sidebar */}
          <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "24px", background: "var(--surface-primary)", borderRadius: "16px", border: "1px solid var(--surface-border)", textAlign: "center" }}>
              <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>Time Remaining</div>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "var(--accent-primary)", fontFamily: "monospace" }}>
                {formatTime(timeLeft)}
              </div>
            </div>
            
            {activeContest.questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                style={{
                  padding: "12px",
                  background: currentQuestionIndex === idx ? "var(--accent-primary)" : "var(--surface-primary)",
                  color: currentQuestionIndex === idx ? "#000" : "var(--text-primary)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                Question {idx + 1}
                <span style={{ float: "right", fontSize: "12px", opacity: 0.7 }}>
                  {q.difficulty === "easy" ? "2pt" : q.difficulty === "medium" ? "5pt" : "10pt"}
                </span>
              </button>
            ))}
            
            <button
              onClick={() => handleContestSubmit(true)}
              style={{ marginTop: "auto", padding: "12px", background: "#4caf50", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
            >
              Submit Contest
            </button>
          </div>

          {/* Question View */}
          <div style={{ flex: 1, background: "var(--surface-primary)", borderRadius: "16px", border: "1px solid var(--surface-border)", overflow: "hidden", display: "flex", flexDirection: "column" }}>"""

new_layout = """      {contestStarted && activeContest && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
          
          {/* Timer Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", background: "var(--surface-primary)", borderRadius: "16px", border: "1px solid var(--surface-border)" }}>
            <div style={{ fontSize: "16px", color: "var(--text-secondary)" }}>
              Question {currentQuestionIndex + 1} of {activeContest.questions.length}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Time Remaining</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "var(--accent-primary)", fontFamily: "monospace" }}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          {/* Question View */}
          <div style={{ background: "var(--surface-primary)", borderRadius: "16px", border: "1px solid var(--surface-border)", overflow: "hidden", display: "flex", flexDirection: "column" }}>"""

old_navigation = """                </div>
              )}
            </div>
          </div>
        </div>
      )}"""

new_navigation = """                </div>
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div style={{ padding: "24px", borderTop: "1px solid var(--surface-border)", display: "flex", justifyContent: "space-between" }}>
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                style={{
                  padding: "12px 24px",
                  background: "var(--surface-secondary)",
                  color: currentQuestionIndex === 0 ? "rgba(255,255,255,0.3)" : "var(--text-primary)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "8px",
                  cursor: currentQuestionIndex === 0 ? "not-allowed" : "pointer"
                }}
              >
                Previous
              </button>
              
              {currentQuestionIndex < activeContest.questions.length - 1 ? (
                <button
                  className="btn-primary"
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  style={{ padding: "12px 32px" }}
                >
                  Next
                </button>
              ) : (
                <button
                  className="btn-primary"
                  disabled={Object.keys(selectedAnswers).length < activeContest.questions.length}
                  onClick={() => handleContestSubmit(true)}
                  style={{ padding: "12px 32px", background: "#4caf50", borderColor: "#4caf50" }}
                >
                  Submit Contest
                </button>
              )}
            </div>
          </div>
        </div>
      )}"""

if old_layout in content and old_navigation in content:
    content = content.replace(old_layout, new_layout)
    content = content.replace(old_navigation, new_navigation)
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\contests\page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced layout successfully")
else:
    print("Could not find old layout blocks")
