const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    adminAccess:{
        type:Boolean,
    },
    address:{
        type: String,
    },
    
},{timestamps:true})

userSchema.path('adminAccess').default(false);

const User = new mongoose.model("User",userSchema);
module.exports=User;