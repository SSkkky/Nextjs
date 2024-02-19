import {test} from './db';

export async function GET(){     
    return Response.json( await test() );
}

export async function POST(req){ 
    return Response.json(   await test('post', await req.json())   );
}