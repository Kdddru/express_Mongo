//기본 문법
const express = require('express');
const app = express();


const port = 5000
//cors 오류해결하기위해 쓰는것
var cors = require('cors');


app.use(cors());




//listen (서버를 띄울 포트 번호, 띄운 후 실행할 코드)
app.listen(port, function () {
  console.log('listening on 3000');
});

/************************************** */

app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/index.html');
})

app.get('/pet', function (요청, 응답) {
  응답.send('펫용품 쇼핑할 수 있는 페이지 입니다.');
})

app.get('/beauty', function (요청, 응답) {
  응답.send('뷰티 용품 쇼핑페이지');
})


//파라미터, 쿼리 값 이용
app.get('/user/:id',function(req,res){
  //const q = req.params;
  //console.log(q.id)

  const q = req.query
  console.log(q)

  res.json({
    'userid' : q.id
  })
})


//api 
app.get('/sound/:name',function(req,res){

  const {name} = req.params;

  if(name === '고양이'){
    console.log(name);
    res.json({'sound' : '야옹'})
  }
  else{
    console.log(name);
    console.log('고양이가 아님')
  }
})



// 백엔드

//환경변수 에서 필요함 
require('dotenv').config();


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
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