const mongoose=require('mongoose');
const multer = require('multer');
const path = require('path');

const PRODUCT_PATH = path.join('/uploads/product');

const productSchema=new mongoose.Schema({
    category:{
        type: String,
        required:true
    },
    // sub_category:{
    //     type: String,
    // },    
    name:{
        type: String,
        required:true
    },
    mrp:{
        type:Number,
        required:true
    },
    selling_price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    inventory:{
        type:Number,
        required:true
    },
    photos:[{
        type: String
    }],
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    review_rating:{
        type:Number,
        default:0
    }
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'..', PRODUCT_PATH ));
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     },
//   });


// productSchema.statics.uploadedAvatar = multer({storage: storage});   
// productSchema.statics.avatarPath = PRODUCT_PATH;
  
  
const Product = new mongoose.model("Product",productSchema);
module.exports=Product;


