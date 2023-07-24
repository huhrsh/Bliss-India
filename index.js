const http=require('https');
const port=8000;
const path=require('path');
const express=require('express');
const db=require('./config/mongoose');
const app=express();
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts)
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

app.use('/',require('./routes'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('./assets'));





app.listen(port,function(err){
    if(err){
        console.log("Error in listening.")
    }
    else{
        console.log("Functioning properly");
    }
})