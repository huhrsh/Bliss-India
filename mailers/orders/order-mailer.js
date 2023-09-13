const nodeMailer=require('../../config/nodemailer')

exports.orderEmail=(user,order)=>{
    let htmlString=nodeMailer.renderTemplate({order:order,user:user},'/order/order-mail.ejs');
    // console.log("Inside new user mailer",user);
    nodeMailer.transporter.sendMail({
        from: 'mailtoharshjain@gmail.com',
        to: user.email,
        subject: "Bliss India | Order placed",
        html:htmlString,
    },(err,info)=>{
        if(err){
            console.log('Error in sending the email',err);
            return;
        }
        // console.log("Mail sent: ");
        return;
    })
}