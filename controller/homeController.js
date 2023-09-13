const Product=require('../models/product');

module.exports.home=function(req,res){
    const predefinedOrder = ['crystal', 'pendant', 'locket', 'earring','bracelet','ring','complete','evil_eye','offer'];
    Product.aggregate([
        {
            $group: {
                _id: '$category',
                products: { $push: '$$ROOT' } 
            }
        }
    ])
    .then((products)=>{
        products.sort((a, b) => {
        const indexA = predefinedOrder.indexOf(a._id);
        const indexB = predefinedOrder.indexOf(b._id);
        return indexA - indexB;
        });
        res.render('home',{
            title:'Home',
            collection:products
        });
    })
}

module.exports.motto=function(req,res){
    res.render('motto',{
        title:'Motto'
    })
}

module.exports.returnPolicy=function(req,res){
    res.render('returnPolicy',{
        title:'Return Policy'
    })
}

module.exports.termsAndConditions=function(req,res){
    res.render('t&c',{
        title:'Terms and Conditions'
    })
}

module.exports.privacyPolicy=function(req,res){
    res.render('privacyPolicy',{
        title:'privacy policy'
    })
}

module.exports.career=function(req,res){
    res.render('career',{
        title:'careers'
    })
}

module.exports.error=(req,res)=>{
    res.render('error',{
        title:"Error"
    })
}