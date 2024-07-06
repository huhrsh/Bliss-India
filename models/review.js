const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    stars:{
        type:Number,
        required: true
    },
    content:{
        type:String,
    },
    username: {
        type: String,
        required: true
        
    },
    email:{
        type: String,
        required:true
    }
},{timestamps:true})

const Review=mongoose.model('Review',reviewSchema);

module.exports=Review;