/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
  const admin: any = await getFirebaseAdmin();
  if (!admin || admin.error) {
    console.error('Firebase Admin is not initialized:', admin?.error);
    return NextResponse.json({ error: `Server misconfiguration: ${admin?.error || 'Firebase Admin not initialized'}` }, { status: 500 });
  }
  const { adminAuth, adminDb } = admin;

  try {
    const { username } = await req.json();
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    
    if (!username || typeof username !== 'string' || username.length < 3 || username.length > 20) {
      return NextResponse.json({ error: 'Username must be between 3 and 20 characters.' }, { status: 400 });
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json({ error: 'Username can only contain letters, numbers, and underscores.' }, { status: 400 });
    }

    const lowerUsername = username.toLowerCase();

    // Run a transaction to ensure username uniqueness
    const result = await adminDb.runTransaction(async (transaction: any) => {
      const usernameRef = adminDb.collection('usernames').doc(lowerUsername);
      const userRef = adminDb.collection('users').doc(uid);

      const usernameDoc = await transaction.get(usernameRef as any);
      if ((usernameDoc as any).exists) {
        throw new Error('Username is already taken.');
      }

      const userDoc = await transaction.get(userRef as any);
      if ((userDoc as any).exists && (userDoc as any).data()?.username) {
         throw new Error('You already have a username.');
      }

      transaction.set(usernameRef, { uid, createdAt: new Date().toISOString() });
      transaction.set(userRef, { username: lowerUsername }, { merge: true });

      return lowerUsername;
    });

    return NextResponse.json({ success: true, username: result });

  } catch (error: any) {
    console.error('Error setting username:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
