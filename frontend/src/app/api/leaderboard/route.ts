import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebaseAdmin';
import { getFirestore } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = getFirebaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Firebase Admin not initialized' }, { status: 500 });
  }

  try {
    const db = getFirestore();
    // Fetch all users to sort them in memory, avoiding the need for a composite index on Firestore
    const snapshot = await db.collection('users').get();
    
    const users: any[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.username) {
         users.push({
           username: data.username,
           rating: data.rating || 0,
           solvedCount: data.solvedArenaProblems?.length || 0,
         });
      }
    });

    // Sort by rating descending, then by solved count descending
    users.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.solvedCount - a.solvedCount;
    });

    // Return top 100
    const leaderboard = users.slice(0, 100);

    return NextResponse.json({ leaderboard });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
