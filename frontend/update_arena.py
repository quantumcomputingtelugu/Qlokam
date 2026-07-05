with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\arena\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import { arenaProblems, ArenaProblem } from '@/data/arena';", "import { getArenaProblems, ArenaProblem } from '@/data/arena';")
content = content.replace("arenaProblems.map", "getArenaProblems().map")
content = content.replace("arenaProblems.filter", "getArenaProblems().filter")
content = content.replace("arenaProblems.find", "getArenaProblems().find")
content = content.replace("arenaProblems.length", "getArenaProblems().length")

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\arena\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import { arenaProblems, ArenaProblem } from '@/data/arena';", "import { getArenaProblems, ArenaProblem } from '@/data/arena';")
content = content.replace("import { arenaProblems } from '@/data/arena';", "import { getArenaProblems } from '@/data/arena';")
content = content.replace("arenaProblems.map", "getArenaProblems().map")
content = content.replace("arenaProblems.filter", "getArenaProblems().filter")
content = content.replace("arenaProblems.find", "getArenaProblems().find")
content = content.replace("arenaProblems.length", "getArenaProblems().length")

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated imports and calls to getArenaProblems()")
