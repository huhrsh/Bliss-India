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
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    phone:{
        type:String
    },
    order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }],
    googleAuth:{
        type:Boolean
    }
},{
    timestamps:true
})

userSchema.path('googleAuth').default(false);
userSchema.path('adminAccess').default(false);

const User = new mongoose.model("User",userSchema);
module.exports=User;
