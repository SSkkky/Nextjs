//src/app/api/route.ts
import { connectToDB } from '@/lib/mongodb';
import { myProjectPostType } from '@/types/datatype';

export async function GET() {
    const data = await connectToDB('get', 0);
    return Response.json(data)
}

export async function DELETE(req: any, { params }: any) {
    console.log(req, 'req!!!!!!!!!!!!!!')
    console.log(params, 'req!!!!!!!!!!!!!!')
    const data = await connectToDB('delete', { postId: Number(params.postId) });
    return Response.json(data);
}

export async function PUT(req: any, res: any) {
    const data = await connectToDB('put', await req.json());
    return res.json(data);
}
