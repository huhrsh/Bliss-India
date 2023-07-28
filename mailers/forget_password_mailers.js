const nodeMailer=require('../config/nodemailer')

exports.forgotPassword=(user)=>{
    let htmlString=nodeMailer.renderTemplate({user:user},'/password/forgetPassword.ejs')
    console.log("Inside new user mailer",user);
    nodeMailer.transporter.sendMail({
        from: 'mailtoharshjain@gmail.com',
        to: user.email,
        subject: "Bliss India | password reset",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending the email',err);
            return;
        }
        console.log("Mail sent: ", info);
        return;
    })
}