//const mongodb = require('mongodb');
//const mongoClient = mongodb.MongoClient;
//const ObjectId = mongodb.ObjectId;
const mongoose = require('mongoose');

let database;

async function getDatabase(){
    /*const client = await mongoClient.connect('mongodb://127.0.0.1:27017');
    database = client.db('library');

    if(!database){
        console.log('DATABASE NOT CONNECTED');
    }
    return database;*/
    mongoose.connect('mongodb://localhost:27017/').then(()=>{
        console.log('database connected');
    }).catch((err)=>{
        console.log('error while connecting...',err);
        
    });
}

module.exports = {
    getDatabase
    //ObjectId
}