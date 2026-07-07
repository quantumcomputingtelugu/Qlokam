import re

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\VisualPlayground.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update props interface
old_props_interface = """interface VisualPlaygroundProps {
  arenaMode?: boolean;
  arenaProblemId?: string | null;
  onSubmit?: (probs: Record<string, number>) => void;
  submitStatus?: "idle" | "verifying" | "success" | "failed";
  disableSubmit?: boolean;
}"""

new_props_interface = """interface VisualPlaygroundProps {
  arenaMode?: boolean;
  arenaProblemId?: string | null;
  onSubmit?: (probs: Record<string, number>) => void;
  submitStatus?: "idle" | "verifying" | "success" | "failed";
  disableSubmit?: boolean;
  inlineMode?: boolean;
  initialGates?: string[][];
  initialNumQubits?: number;
}"""

content = content.replace(old_props_interface, new_props_interface)

# 2. Update component signature
old_sig = """export default function VisualPlayground({
  arenaMode = false,
  arenaProblemId = null,
  onSubmit,
  submitStatus = "idle",
  disableSubmit = false,
}: VisualPlaygroundProps = {}) {"""

new_sig = """export default function VisualPlayground({
  arenaMode = false,
  arenaProblemId = null,
  onSubmit,
  submitStatus = "idle",
  disableSubmit = false,
  inlineMode = false,
  initialGates,
  initialNumQubits,
}: VisualPlaygroundProps = {}) {"""

content = content.replace(old_sig, new_sig)

# 3. Update state initialization
old_state = """  const [numQubits, setNumQubits] = useState(3);
  const [grid, setGrid] = useState<string[][]>(
    Array(3)
      .fill([])
      .map(() => Array(NUM_STEPS).fill("")),
  );"""

new_state = """  const [numQubits, setNumQubits] = useState(initialNumQubits || 3);
  const [grid, setGrid] = useState<string[][]>(
    initialGates || Array(initialNumQubits || 3)
      .fill([])
      .map(() => Array(NUM_STEPS).fill("")),
  );"""

content = content.replace(old_state, new_state)

# 4. Apply height constraint for inlineMode
old_main_div = """      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 72px)",
        background: "var(--background)",
        color: "var(--text-primary)",
      }}"""

new_main_div = """      style={{
        display: "flex",
        flexDirection: "column",
        height: inlineMode ? "600px" : "calc(100vh - 72px)",
        background: inlineMode ? "transparent" : "var(--background)",
        color: "var(--text-primary)",
        border: inlineMode ? "1px solid var(--surface-border)" : "none",
        borderRadius: inlineMode ? "12px" : "0",
        overflow: "hidden",
      }}"""

content = content.replace(old_main_div, new_main_div)

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\VisualPlayground.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("VisualPlayground props updated successfully.")
