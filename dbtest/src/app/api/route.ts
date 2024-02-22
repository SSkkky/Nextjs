import { connectToDB } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const data = await connectToDB('get', 0);
    return NextResponse.json(data)
}
export async function POST(req: NextRequest) {
    const data = await req.json()
    return NextResponse.json(await connectToDB('post', data));
}