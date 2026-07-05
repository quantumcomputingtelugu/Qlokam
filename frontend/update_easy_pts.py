with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\arena.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("let pts = 20;", "let pts = 1;")

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\arena.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated pts = 1 for easy contest questions in arena.tsx")
