// const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');

// async function emailTest() {
//   // let testAccount = await nodemailer.createTestAccount();
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: 'horrorfootage@gmail.com', // generated ethereal user
//       pass: process.env.mail_password, // generated ethereal password
//     },
//     tls: {
//         rejectUnauthorized: false
//       }
//   });

// // send mail with defined transport object
// let info = await transporter.sendMail({
//   from: '"Horror Footage" <horrorfootage@gmail.com>', // sender address
//   to: "sadelena@hotmail.fr", // list of receivers
//   subject: "Hello You !", // Subject line
//   text: "Hello ! Are you there ?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// });
// console.log("Message sent: %s", info.messageId);
// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
// // Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

// };

// emailTest().catch(console.error);

"use strict";
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

// async..await is not allowed in global scope, must use a wrapper
async function main() {

  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'horrorfootage@gmail.com',
      pass: 'arcoroso666!'
    },
    tls: {
        rejectUnauthorized: false
      }
  }));

  var mailOptions = {
    from: 'horrorfootage@gmail.com',
    to: 'sadelena@hotmail.fr',
    subject: 'Lien de confirmation du compte',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
} 

main().catch(console.error);