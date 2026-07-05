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

async function resetNiranjiScore() {
  console.log("Searching for user 'niranji'...");
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();
  
  let found = false;
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const strData = JSON.stringify(data).toLowerCase();
    
    if (strData.includes('niranji')) {
      console.log(`Found matching user: ${doc.id}`);
      await doc.ref.update({
        rating: 0
      });
      console.log("Successfully reset rating to 0 for this user.");
      found = true;
    }
  }
  
  if (!found) {
    console.log("Could not find a user with 'niranji' in their profile.");
  }
}

resetNiranjiScore().then(() => process.exit(0)).catch(console.error);
