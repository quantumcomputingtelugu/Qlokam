export async function getFirebaseAdmin() {
  let appModule, firestoreModule, authModule;
  try {
    appModule = await import('firebase-admin/app');
    firestoreModule = await import('firebase-admin/firestore');
    authModule = await import('firebase-admin/auth');
  } catch (err: any) {
    console.error('Failed to import firebase-admin modules:', err);
    return { error: 'Dynamic import failed: ' + err.message };
  }

  const { initializeApp, getApps, cert } = appModule;
  const { getFirestore } = firestoreModule;
  const { getAuth } = authModule;

  if (!getApps().length) {
    if (!process.env.FIREBASE_PRIVATE_KEY) {
      console.error('No private key found');
      return { error: 'No FIREBASE_PRIVATE_KEY found in environment variables' };
    }
    try {
      let formattedKey = process.env.FIREBASE_PRIVATE_KEY || '';
      if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
        formattedKey = formattedKey.slice(1, -1);
      }
      formattedKey = formattedKey.replace(/\\n/g, '\n').trim();

      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: formattedKey,
        }),
      });
    } catch (error: any) {
      console.error('Firebase admin initialization error', error);
      return { error: error.message || 'Unknown initialization error' };
    }
  }

  return {
    adminDb: getFirestore(),
    adminAuth: getAuth()
  };
}
