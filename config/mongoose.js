const mongoose=require('mongoose');
const env=require('./environment')

mongoose.connect("mongodb+srv://harshj2010:qgGBufv9MmCjJ2Bz@cluster0.uikmu5z.mongodb.net/?retryWrites=true&w=majority")
// mongoose.connect(`mongodb://localhost:27017/${env.db}`)

const db=mongoose.connection;

db.on('error', console.error.bind(console,"error"));

db.once('open', function(){
    // console.log("Connection to database successfully established");
})

