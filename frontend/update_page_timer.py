import sys

file_path = r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\tutorials\page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. State
content = content.replace(
    "const [warningMessage, setWarningMessage] = useState<string | null>(null);",
    "const [warningMessage, setWarningMessage] = useState<string | null>(null);\n  const [timeLeft, setTimeLeft] = useState<number | null>(null);"
)

# 2. handleStartQuiz confirmation
old_confirm = """      const confirmStart = window.confirm(
        "Are you sure you want to start the Final Exam?\\n\\n" +
        "RULES:\\n" +
        "1. You must score at least 15/20 to pass.\\n" +
        "2. Do NOT switch tabs or minimize the browser, or you will automatically fail.\\n" +
        "3. Failing the exam results in a 24-hour lockout.\\n\\n" +
        "Click OK to begin."
      );
      if (!confirmStart) return;"""

new_confirm = """      const confirmStart = window.confirm(
        "Are you sure you want to start the Final Exam?\\n\\n" +
        "RULES:\\n" +
        "1. You must score a perfect 10/10 to pass.\\n" +
        "2. You have exactly 15 minutes. The exam will auto-submit when time is up.\\n" +
        "3. Do NOT switch tabs or minimize the browser, or you will automatically fail.\\n" +
        "4. Failing the exam results in a 24-hour lockout.\\n\\n" +
        "Click OK to begin."
      );
      if (!confirmStart) return;
      setTimeLeft(15 * 60);"""
content = content.replace(old_confirm, new_confirm)

# 3. handleQuizSubmit scoring rules
content = content.replace("const requiredScore = isExam ? 15 : activeQuizSubset.length;", "const requiredScore = isExam ? 10 : activeQuizSubset.length;")
content = content.replace("if (isExam && score < 15) {", "if (isExam && score < 10) {")
content = content.replace("setWarningMessage(`You scored ${score}/20. You need at least 15 to pass. You are locked out for 24 hours.`);", "setWarningMessage(`You scored ${score}/10. You need a perfect 10/10 to pass. You are locked out for 24 hours.`);")

# 4. Timer useEffect
# I will insert it after handleTabChange
timer_effect = """
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && activeTutorial?.id === 108 && timeLeft !== null && timeLeft > 0 && !showQuizResults) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (quizStarted && activeTutorial?.id === 108 && timeLeft === 0 && !showQuizResults) {
      handleQuizSubmit();
    }
    return () => clearInterval(interval);
  }, [quizStarted, activeTutorial?.id, timeLeft, showQuizResults]);
"""
content = content.replace("  const handleTabChange = ", timer_effect + "\n  const handleTabChange = ")

# 5. UI Timer Display
old_ui = """                          <h4
                            style={{
                              fontSize: "18px",
                              color: "var(--text-primary)",
                              marginBottom: "16px",
                            }}
                          >
                            Question {currentQuizIndex + 1} of{" "}
                            {activeQuizSubset.length}:{" "}
                            {
                              activeTutorial.quizzes[
                                activeQuizSubset[currentQuizIndex]
                              ].question
                            }
                          </h4>"""

new_ui = """                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: "16px" }}>
                            <h4
                              style={{
                                fontSize: "18px",
                                color: "var(--text-primary)",
                                margin: 0,
                                flex: 1
                              }}
                            >
                              Question {currentQuizIndex + 1} of{" "}
                              {activeQuizSubset.length}:{" "}
                              {
                                activeTutorial.quizzes[
                                  activeQuizSubset[currentQuizIndex]
                                ].question
                              }
                            </h4>
                            {activeTutorial.id === 108 && timeLeft !== null && !showQuizResults && (
                              <div style={{ marginLeft: '16px', padding: '8px 16px', background: timeLeft < 60 ? 'rgba(255,0,0,0.2)' : 'rgba(255,255,255,0.1)', borderRadius: '20px', fontWeight: 'bold', color: timeLeft < 60 ? '#ff4d4d' : 'var(--text-primary)' }}>
                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                              </div>
                            )}
                          </div>"""

content = content.replace(old_ui, new_ui)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated page.tsx with timer and scoring")
