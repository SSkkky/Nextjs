//src/app/api/route.ts
import {connectToDB} from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import {myProjectPostType} from '@/types/datatype';

export async function GET() {
    const data = await connectToDB('get', 0);
    return Response.json(data)
}

export async function POST(req: NextApiRequest, res: NextApiResponse){ 
    return res.json(await connectToDB('post', await req.body));
}