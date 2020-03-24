const nodeMailer = require('nodemailer');
const {emailPassword} = require('../config/keys');

const user = 'arthurpro95@gmail.com'

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user,
        pass: emailPassword
    }
});

function sendEmail(destiny){
    let mailOptions = {
        from: user,
        to: destiny,
        subject: 'Email teste Node',
        text: 'Testando NodeMailer'
    }
    transporter.sendMail(mailOptions, (err, info) =>{
        if(!err){
            console.log('Email enviado', info.response);
        }else{
            console.log('Error:', err)
        }
    })
}

module.exports = sendEmail;