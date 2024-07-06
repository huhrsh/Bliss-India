const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

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
        default:true
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

// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

userSchema.path('googleAuth').default(false);
userSchema.path('adminAccess').default(false);

const User = new mongoose.model("User",userSchema);
module.exports=User;
