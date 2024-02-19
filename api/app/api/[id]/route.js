import {test} from '../db';

export async function GET(req, {params}){ 
    const data = await test('detail',{id:params.id});
    return Response.json(data);
}

export async function DELETE(req, {params}){ 
    const data = await test('delete',{id:Number(params.id)});
    return Response.json(data);
}

export async function PUT(req){ 
    const data = await test('put', await req.json());
    return Response.json(data);
}