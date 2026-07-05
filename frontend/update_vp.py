with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\VisualPlayground.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_code = """        {arenaMode ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              className="btn-secondary"
              onClick={() => executeCircuit(false)}
              disabled={isExecuting}
            >
              Run Output
            </button>
            <button
              className="btn-primary"
              onClick={() => executeCircuit(true)}
              disabled={isExecuting || disableSubmit}
            >
              {disableSubmit
                ? "Sign In to Submit"
                : isExecuting && submitStatus === "verifying"
                  ? "Submitting..."
                  : "Submit"}
            </button>
          </div>
        ) : ("""

new_code = """        {arenaMode ? (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {submitStatus === "success" && (
              <span style={{ color: "#4caf50", fontWeight: "bold", fontSize: "14px" }}>
                Saved ✓
              </span>
            )}
            <button
              className="btn-secondary"
              onClick={() => executeCircuit(false)}
              disabled={isExecuting}
            >
              Run Output
            </button>
            <button
              className="btn-primary"
              onClick={() => executeCircuit(true)}
              disabled={isExecuting || disableSubmit}
            >
              {disableSubmit
                ? "Sign In to Submit"
                : isExecuting && submitStatus === "verifying"
                  ? "Submitting..."
                  : "Submit"}
            </button>
          </div>
        ) : ("""

if old_code in content:
    content = content.replace(old_code, new_code)
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\VisualPlayground.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Could not find old_code")
