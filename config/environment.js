const fs=require('fs');
const rfs=require('rotating-file-stream')
const path=require('path')
require('dotenv').config();

const logDirectory=path.join(__dirname,"../production_logs")
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1M',
    path:logDirectory
})

const development={
    name: 'development',
    asset_path:'./assets',
    session_cookie_key: 'bliss_india_secret',
    db:'mongodb://0.0.0.0/BlissIndia',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure:false,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS,
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: "localhost:8000/users/auth/google/callback",
     morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
};

const production={
    name: 'production',
    asset_path: process.env.ASSET_PATH,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    db: process.env.DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALL_BACK_URL,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
};

console.log(process.env.environment)

module.exports=eval(process.env.environment)==development?development:production;
