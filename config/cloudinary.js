const cloudinary = require('cloudinary').v2;
require('dotenv').config(); 
const env=require('./environment')

cloudinary.config(env.cloudinary);


module.exports = cloudinary;
