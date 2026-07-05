with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("Easy: <strong style={{ color: '#3fb950' }}>+20</strong>", "Easy: <strong style={{ color: '#3fb950' }}>+1</strong>")

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ProfileModal.tsx legend to +1 for Easy")
