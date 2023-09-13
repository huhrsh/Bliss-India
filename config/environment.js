const fs=require('fs');
const rfs=require('rotating-file-stream')
const path=require('path')

const logDirectory=path.join(__dirname,"../production_logs")
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1M',
    path:logDirectory
})

const production={
    name:'production',
    asset_path:process.env.asset_path,
    session_cookie_key: process.env.session_cookie_key,
    db:process.env.db,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure:false,
        auth:{
            user:process.env.user,
            pass:process.env.pass
        }
    },
    google_client_id: process.env.google_client_id,
    google_client_secret: process.env.google_client_secret,
    google_call_back_url: process.env.google_call_back_url,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
    
}

module.exports=eval(process.env.environment)==undefined?development:eval(process.env.environment);