const nodemailer = require("nodemailer");

const sender = process.env.sender_password;
const pass = process.env.mail_password;

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: sender,
        pass: pass
    }
});

module.exports = {

    /**
     * To send email to confirm creation of the account
     * @param {Text} pseudo 
     * @param {Text} email 
     * @param {Text} confirmationCode 
     */
    sendConfirmationEmail(pseudo, email, confirmationCode) {
        console.log("Check, je suis dans ma fonction envoyeuse de mail");
        console.log('pseudo, email, confirmationCode', pseudo, email, confirmationCode);
        transport.sendMail({
            from: sender,
            to: email,
            subject: "Email à confirmer",
            html: 
        `<h1>Confirmation de ton adresse email</h1>

        <h2>Salut ${pseudo}</h2>

        <p>Alors comme ça tu aimes les films d'horreur .. Sûr qu'avec nous tu ne seras pas déçu.e ! Confirme juste ton adresse email en cliquant sur ce lien et on se retrouve de l'autre côté ! Bou hou .. </p>

        <a href=http://localhost:3001/api/v1/confirm/${confirmationCode}> Click here</a>
        </div>`,


        }).catch(error => console.log(error));
    },


}