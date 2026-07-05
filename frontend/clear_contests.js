const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

if (!admin.apps.length) {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!privateKey) {
    console.error("No private key found in environment");
    process.exit(1);
  }
  
  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    })
  });
}
const db = admin.firestore();

async function clearContestEntries() {
    const snapshot = await db.collection('contest_entries').get();
    let count = 0;
    for (const doc of snapshot.docs) {
        await doc.ref.delete();
        count++;
    }
    console.log(`Deleted ${count} contest entries.`);
}

clearContestEntries().then(() => process.exit(0)).catch(console.error);
