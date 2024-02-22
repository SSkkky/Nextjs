//src/lib/mongodb.ts
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://sky:vbHcM2rClT1crAks@cluster0.nah7cdq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export const connectToDB = async (type: string, body: any) => {
    let db, collection, data;
    console.log(type, '<---type')
    console.log(body, '<---body')

    // 접속
    await client.connect();
    db = client.db('Next');
    collection = db.collection('mongos');

    switch (type) {
        case 'post': await collection.insertOne(body);
            break;

        case 'detail': data = await collection.find(body).toArray();
            break;

        case 'delete': data = await collection.deleteOne(body);
            break;

        case 'put': data = await collection.updateOne({ id: body.postId }, { $set: { title: body.title } });
            break;
    }

    if (type != 'detail') data = await collection.find({}).toArray();

    // 접속끊기
    client.close();
    return data;
}