with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\tutorials.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
    if '"circuit"' in content:
        print('Found circuit quizzes in tutorials.tsx')
    else:
        print('No circuit quizzes found in tutorials.tsx')
