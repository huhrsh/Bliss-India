const env=require('./environment')
const fs=require('fs')
const path=require('path')


module.exports=(app)=>[
    app.locals.assetPath=function(filePath){
        // console.log(JSON.parse(fs.readFileSync(path.join(__dirname,'../assets/Bundled/rev-manifest.json')))[filePath])
        if(env.name=='development'){
            return '/CSS/'+filePath;
            return '/Bundled/'+JSON.parse(fs.readFileSync(path.join(__dirname,'../assets/Bundled/rev-manifest.json')))[filePath];
            // return filePath;
        }
        // console.log('/'+filePath);
        return '/CSS/'+filePath;
        return '../public/assets/'+JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
    }
]
