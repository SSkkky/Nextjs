//src/app/api/route.ts
import { connectToDB } from '@/lib/mongodb';
import { myProjectPostType } from '@/types/datatype';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const data = await connectToDB('get', 0);
    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {

    const data = await req.json()
    console.log("data :", data)
    return NextResponse.json(await connectToDB('post', data));
}