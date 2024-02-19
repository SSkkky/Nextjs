const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://sky:vbHcM2rClT1crAks@cluster0.nah7cdq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export const test = async (type, body)=>{
    let db, collection, data;

    // 접속
    await client.connect();
    db = client.db('nextjs');
    collection = db.collection('test');

    switch(type){
        case 'post' : await collection.insertOne(body);
        break;

        case 'detail' : data = await collection.find(body).toArray();
        break;

        case 'delete' : data = await collection.deleteOne(body);
        break;

        case 'put' : data = await collection.updateOne({id:Number(body.id)}, {$set:{title:body.title}});
        break;
    }
    
    if(type != 'detail') data = await collection.find({}).toArray();
    
    // 접속끊기
    client.close();
    return data;
}