const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});
const db = admin.firestore();

async function migrate() {
  const snap = await db.collection('contest_entries').get();
  for (const doc of snap.docs) {
    const data = doc.data();
    if (data.contestId === 'easy-contest-1' && data.score === 10) {
      const userRef = db.collection('users').doc(data.userId);
      await userRef.update({
        solvedArenaProblems: admin.firestore.FieldValue.arrayUnion(
          'easy-contest-1-q2',
          'easy-contest-1-q3',
          'easy-contest-1-q4'
        )
      });
      console.log(`Updated user ${data.username} (${data.userId})`);
    }
  }
}

migrate().then(() => process.exit(0)).catch(console.error);
