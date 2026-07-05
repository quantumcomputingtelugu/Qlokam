with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\contests.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_time = """    startTime: Date.now() - 100000,
    endTime: Date.now() + 3 * 24 * 60 * 60 * 1000,"""

new_time = """    startTime: new Date("2026-07-05T17:00:00+05:30").getTime(),
    endTime: new Date("2026-07-05T17:30:00+05:30").getTime(),"""

if old_time in content:
    content = content.replace(old_time, new_time)
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\data\contests.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced times successfully")
else:
    print("Could not find old times")
