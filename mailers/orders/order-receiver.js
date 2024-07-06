const nodeMailer=require('../../config/nodemailer')

exports.orderEmail=(user,order)=>{
    let htmlString=nodeMailer.renderTemplate({order:order,user:user},'/order/order-receiver.ejs');
    // console.log("Inside new user mailer",user);
    nodeMailer.transporter.sendMail({
        from: 'blissofficialindia@gmail.com',
        // to: "harshj2010@gmail.com",
        to: "manyajainmj16@gmail.com",
        subject: "Bliss India | New order received",
        html:htmlString,
    },(err,info)=>{
        if(err){
            console.log('Error in sending the email',err);
            return;
        }
        // console.log("Mail sent to harsh: ");
        return;
    })
}