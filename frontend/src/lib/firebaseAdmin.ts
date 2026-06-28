import * as admin from 'firebase-admin';

export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    if (!process.env.FIREBASE_PRIVATE_KEY) {
      return null;
    }
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Handle newlines in the private key when loaded from env variables
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error) {
      console.error('Firebase admin initialization error', error);
      return null;
    }
  }

  return {
    adminDb: admin.firestore(),
    adminAuth: admin.auth()
  };
}
