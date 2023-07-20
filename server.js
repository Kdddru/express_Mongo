//기본 문법
const express = require('express');
const app = express();


//listen (서버를 띄울 포트 번호, 띄운 후 실행할 코드)
app.listen(3000,function(){
  console.log('listening on 3000');
});

/************************************** */

app.get('/',function(요청, 응답){
  응답.sendFile(__dirname + '/index.html');
})

app.get('/pet',function(요청, 응답){
  응답.send('펫용품 쇼핑할 수 있는 페이지 입니다.');
})

app.get('/beauty',function(요청, 응답){
  응답.send('뷰티 용품 쇼핑페이지');
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dhk9817:doo980203@cluster0.cvr6pdo.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const db = client.db('User');
    const coll = db.collection('User');

    const cursor = coll.find();

    await cursor.forEach(console.log);

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);