const http=require('https');
const env=require('./config/environment')
const morgan=require('morgan')
const port= process.env.PORT || 8000;
const path=require('path');
const express=require('express');
const db=require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const jsPDF  = require("jspdf");
const passportGoogle = require('./config/passport-google-ouath2-strategy');
const MongoStore = require('connect-mongo');
// const dbUrl = 'mongodb://0.0.0.0/BlissIndia';
const dbUrl = "mongodb+srv://harshj2010:qgGBufv9MmCjJ2Bz@cluster0.uikmu5z.mongodb.net/?retryWrites=true&w=majority";
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const expressLayouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const fs=require('fs')

const app=express();
// console.log(process.env.asset_path)
require('./config/view-helper')(app)
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads'), { fallthrough: false }));
// app.use('/uploads', express.static(path.resolve(__dirname, 'uploads'), { fallthrough: false }));

// function customLogFormat(tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens['response-time'](req, res), 'ms -',
//       req.headers['user-agent'],
//     ].join(' ');
//   }

app.use(morgan(env.morgan.mode,env.morgan.options))

app.use(express.static(env.asset_path));
// app.use(express.static('./public/assets'))
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
        maxAge: (1000*60*60*720)
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
})
