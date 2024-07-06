const Order=require('../models/order')
const User=require('../models/user')
const Product=require('../models/product');
const orderEmailer =  require('../mailers/orders/order-mailer.js');
const orderReceiver =  require('../mailers/orders/order-receiver.js');

module.exports.home=function(req,res){
    // console.log(req.query.id);
    Order.findOne({_id:req.query.id}).populate('user')
    .then((order)=>{
        res.render('orderDetails',{
            title:req.query.id,
            order:order
        })
    })
    .catch((err)=>{
        console.log("Error in finding an order to be displayed",err);
        return res.redirect('back')
    })
}




module.exports.createOrder=async function(req,res){
    Order.create({user:res.locals.user._id,  products:res.locals.user.cart, totalAmount:req.body.totalAmount})
    .then((order)=>{
        for(let i of res.locals.user.cart){
            Product.findOneAndUpdate({_id:i.product},{ $inc: { inventory: -i.quantity } }, { new: true } )
            .then((updatedProduct)=>{
                // console.log("The updated product is: ",updatedProduct);
            })
        }        
        User.findOneAndUpdate(
            { _id: res.locals.user._id },
            { $push: { order: order._id }, $set: { cart: [] } },
            { new: true }               
        )
        
        .then((user) => {

            order.populate('products.product')
            .then((order)=>{
                orderEmailer.orderEmail(user,order);
                orderReceiver.orderEmail(user,order);
                return res.redirect(`/orders/receipt?id=${order._id}`);
            })
        })
        .catch((err)=>{
            console.log("Error in finding user",err);
            return res.redirect('back')
        })
    })
    .catch((err)=>{
        console.log("Error in creating order",err);
        res.redirect('back')
    })
}

// Order.deleteMany({})
// .then(()=>{
//     console.log("Deleted all");
// })


module.exports.receipt=function(req,res){
    Order.findOne({_id:req.query.id}).populate('user').populate('products.product')
    .then((order)=>{
        res.render('receipt',{
            title: 'Receipt',
            order:order
        })
    })
}