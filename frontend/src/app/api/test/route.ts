import { NextResponse } from "next/server";
import { getFirebaseAdmin } from '@/lib/firebaseAdmin';

export async function GET() { 
  const admin = await getFirebaseAdmin();
  return NextResponse.json({ ok: true, admin: !!admin }); 
}
export async function POST() { return NextResponse.json({ ok: true }); }
