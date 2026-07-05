with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_completed = """  const completedCourses = tutorialSessions.filter(session => 
    session.modules.length > 0 && session.modules.every(m => profileData.completedTutorials.includes(m.id))
  );"""

new_completed = """  const completedCourses = tutorialSessions.filter(session => {
    if (session.modules.length === 0) return false;
    const finalTestModule = session.modules.find(m => m.isFinalTest);
    if (finalTestModule && profileData.completedTutorials.includes(finalTestModule.id)) {
      return true;
    }
    return session.modules.every(m => profileData.completedTutorials.includes(m.id));
  });"""

old_in_progress = """  const inProgressCourses = tutorialSessions.filter(session => 
    session.modules.length > 0 && 
    session.modules.some(m => profileData.completedTutorials.includes(m.id)) &&
    !session.modules.every(m => profileData.completedTutorials.includes(m.id))
  );"""

new_in_progress = """  const inProgressCourses = tutorialSessions.filter(session => {
    if (session.modules.length === 0) return false;
    const isCompleted = completedCourses.includes(session);
    const hasStarted = session.modules.some(m => profileData.completedTutorials.includes(m.id));
    return hasStarted && !isCompleted;
  });"""

if old_completed in content and old_in_progress in content:
    content = content.replace(old_completed, new_completed).replace(old_in_progress, new_in_progress)
    with open(r'c:\Users\venna\OneDrive\Desktop\QuVerse\frontend\src\components\ProfileModal.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched course completion logic successfully")
else:
    print("Could not find the completion logic blocks")
