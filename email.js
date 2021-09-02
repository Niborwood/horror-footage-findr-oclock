//! Test pour l'envoie d'un email de confirmation de compte :

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