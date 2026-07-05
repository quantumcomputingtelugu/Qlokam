with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\contests\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_next = """              {currentQuestionIndex < activeContest.questions.length - 1 ? (
                <button
                  className="btn-primary"
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  style={{ padding: "12px 32px" }}
                >
                  Next
                </button>"""

new_next = """              {currentQuestionIndex < activeContest.questions.length - 1 ? (
                <button
                  className="btn-primary"
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  style={{ padding: "12px 32px" }}
                >
                  Next
                </button>"""

if old_next in content:
    content = content.replace(old_next, new_next)
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\contests\page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced Next button disabled state successfully")
else:
    print("Could not find old Next button code")
