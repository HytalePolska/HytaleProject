var options = {
     useNewUrlParser: true, useUnifiedTopology: true
  };
const MongoClient = require('mongodb').MongoClient;
const config = {
  "mongo": {
    "hostString": "9a.mongo.evennode.com:27017/test,9b.mongo.evennode.com:27017/test",
    "user": "02533d90e1749e39dc2850fc8aa15255",
    "db": "02533d90e1749e39dc2850fc8aa15255"
  }
}
const uRL = "mongodb+srv://JW:qaz123ksp@jwdatabase-a15gw.mongodb.net/test?retryWrites=true&w=majority";
var mongoPassword = 'qaz123ksp';
const uri =  "mongodb://" +config.mongo.user+":"+encodeURIComponent(mongoPassword)+"@"+ config.mongo.hostString; 

let sesion = null;
 connection();

async function connection()
{
  MongoClient.connect( uri,options,(err,db) => {
   
    if(!err) {
      console.log("Connected to DB");
      let col = db.db("MC_Server");
         console.log(col.databaseName);
      col.createCollection("Loading", (err,res)=>{ sesion = col;});
    } 
     else
      console.log("Error while connecting to MongoDB  "+err);
   
  });
}
    

module.exports = sesion;

