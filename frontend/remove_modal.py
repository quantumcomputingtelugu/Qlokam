with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_str = 'import AnnouncementModal from "@/components/AnnouncementModal";'
tag_str = '<AnnouncementModal />'

if import_str in content:
    content = content.replace(import_str, '// ' + import_str)
if tag_str in content:
    content = content.replace(tag_str, '{/* ' + tag_str + ' */}')

with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\app\layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
