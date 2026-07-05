with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\VisualPlayground.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_reset_effect = """  // Reset state when problem changes
  useEffect(() => {
    if (arenaMode && arenaProblemId) {
      setGrid(
        Array(3)
          .fill([])
          .map(() => Array(NUM_STEPS).fill(""))
      );
      setNumQubits(3);
      setProbabilities({});
      setBlochVectors({});
      setMeasuredVals({});
      setErrorMsg("");
      setCode("");
      setPendingTwoQubit(null);
      setAnglePrompt(null);
    }
  }, [arenaProblemId, arenaMode]);"""

# if there's a trailing comma after fill("") in the codebase, let's fix the match string
if old_reset_effect not in content:
    old_reset_effect = old_reset_effect.replace('fill("")\n      );', 'fill("")), \n      );')
    if old_reset_effect not in content:
        old_reset_effect = """  // Reset state when problem changes
  useEffect(() => {
    if (arenaMode && arenaProblemId) {
      setGrid(
        Array(3)
          .fill([])
          .map(() => Array(NUM_STEPS).fill("")),
      );
      setNumQubits(3);
      setProbabilities({});
      setBlochVectors({});
      setMeasuredVals({});
      setErrorMsg("");
      setCode("");
      setPendingTwoQubit(null);
      setAnglePrompt(null);
    }
  }, [arenaProblemId, arenaMode]);"""

new_reset_effect = """  // Load or reset state when problem changes
  useEffect(() => {
    if (arenaMode && arenaProblemId) {
      const saved = localStorage.getItem(`quverse_grid_${arenaProblemId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.grid && parsed.numQubits) {
            setGrid(parsed.grid);
            setNumQubits(parsed.numQubits);
            setProbabilities({});
            setBlochVectors({});
            setMeasuredVals({});
            setErrorMsg("");
            setPendingTwoQubit(null);
            setAnglePrompt(null);
            return;
          }
        } catch (e) {}
      }
      
      setGrid(
        Array(3)
          .fill([])
          .map(() => Array(NUM_STEPS).fill("")),
      );
      setNumQubits(3);
      setProbabilities({});
      setBlochVectors({});
      setMeasuredVals({});
      setErrorMsg("");
      setCode("");
      setPendingTwoQubit(null);
      setAnglePrompt(null);
    }
  }, [arenaProblemId, arenaMode]);

  // Save state when grid changes
  useEffect(() => {
    if (arenaMode && arenaProblemId) {
      localStorage.setItem(`quverse_grid_${arenaProblemId}`, JSON.stringify({ grid, numQubits }));
    }
  }, [grid, numQubits, arenaProblemId, arenaMode]);"""

if old_reset_effect in content:
    content = content.replace(old_reset_effect, new_reset_effect)
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\VisualPlayground.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Replaced successfully')
else:
    print('Could not find old_reset_effect')
