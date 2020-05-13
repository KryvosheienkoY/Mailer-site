const nodemailer = require('nodemailer');
let transporter;
let mailOptions;

function send(destEmail, subject, text) {

    console.log(`Sending letter with subject "${subject}" to mail "${destEmail}"`);

     transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'k@gmail.com',
            pass: ''
        }
    });

     mailOptions = {
        from: 'k@gmail.com',
        to: destEmail,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {send};