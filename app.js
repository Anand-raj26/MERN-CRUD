const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo = require('./views/db');
//const ObjectId = dbo.ObjectId;
const bookModel = require('./models/booksModel');


dbo.getDatabase();
app.engine('hbs',exhbs.engine(
    {
    layoutsDir:'views/',
    defaultLayout:'main',
    extname:'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault:true,
        allowProtoMethodsByDefault:true}}));
app.set('view engine','hbs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',async (req,res)=>{
   // let database = await dbo.getDatabase();
   // const collection = database.collection('books');
   // const cursor = collection.find({});
   // let books = await cursor.toArray();

   let books = await bookModel.find({});

    let message = '';
    let edit_id,edit_book;

    if (req.query.edit_id) {
        edit_id = req.query.edit_id;
        //edit_book = await collection.findOne({_id: new ObjectId(edit_id)});
       edit_book = await bookModel.findOne({_id:edit_id});
    }

    if (req.query.delete_id) {
        //await collection.deleteOne({_id: new ObjectId(req.query.delete_id)});
       await bookModel.deleteOne({_id:req.query.delete_id});
        return res.redirect('/?status=3');
    }

    switch (req.query.status) {
        case '1':
            message = 'INSERTED SUCCESSFULLY'
            break;
        case '2':
            message = 'UPDATED SUCCESSFULLY'
            break;
        case '3':
            message = "DELETED SUCCESSFULLY"
            break;    
        default:
            break;
    }

    res.render('main',{message,books,edit_id,edit_book});
});


app.listen(3000,()=>{
    console.log('LISTENING TO 3000 PORT');
    
});

app.post('/store_book',async (req,res)=>{
    //let database = await dbo.getDatabase();
    //const collection = database.collection('books');
    //let book = {title:req.body.title,author:req.body.author};
    //await collection.insertOne(book);
   const book =  new bookModel({title:req.body.title,author:req.body.author});
   book.save();
   return res.redirect('/?status=1');
})


app.post('/update_book/:edit_id',async (req,res)=>{
   // let database = await dbo.getDatabase();
    //const collection = database.collection('books');
    //let book = {title:req.body.title,author:req.body.author};
    let edit_id = req.params.edit_id;
    //await collection.updateOne({_id : new ObjectId(edit_id)},{$set:book});
    await bookModel.findOneAndUpdate({_id:edit_id},{title:req.body.title,author:req.body.author});
    return res.redirect('/?status=2');
})