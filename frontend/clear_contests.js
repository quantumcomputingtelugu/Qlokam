const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: 'qlokam-001'
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

clearContestEntries().catch(console.error);
