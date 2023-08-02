const http=require('https');
const port=8000;
const path=require('path');
const express=require('express');
const db=require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//const passportGoogle = require('./config/passport-google-ouath2-strategy');
const MongoStore = require('connect-mongo');
const dbUrl = 'mongodb://0.0.0.0/BlissIndia';
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const expressLayouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const fs=require('fs')

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads' , express.static(__dirname+'/uploads'));
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));


app.use(session({
    name: 'Bliss India',
    secret: 'broCode',
    saveUninitialized: false, //yaha change karna padd sakta hai
    resave: false,
    cookie: {
        maxAge: (1000*60*60)
    },
    store: new MongoStore(
        {
            mongoUrl: dbUrl,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect mongo db setup working');
        }
    )
}));

app.use(flash());
app.use(customMware.setFlash);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error in listening.")
    }
    else{
        console.log("Functioning properly");
    }
})