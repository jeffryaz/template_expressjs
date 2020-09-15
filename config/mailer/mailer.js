var moment = require('moment');

var nodemailer = require('nodemailer');

var { configMailer, configFrom } = require('./mailer.config');

async function mailerRegis(arrayEmail, subject, nama, linkVerif) {
    var transporter = nodemailer.createTransport(configMailer);
    var mailOptions = {
        from: configFrom,
        to: arrayEmail,
        subject: `KitaBimbingan.com - ${subject}`,
        attachments: [
            {
                filename: 'email.png',
                path: '/path/to/email.png',
                cid: 'email'
            },
            {   // file on disk as an attachment
                filename: 'text3.txt',
                path: '/path/to/file.txt' // stream this file
            }
        ],
        icalEvent: { //if have calender
            method: 'PUBLISH',
            path: '/path/to/file'
        },
        html: `<table></table>`
    };
    var info = await transporter.sendMail(mailOptions);
    respons = { code: 200, data: info, message: null };
    return respons;
}

mailerRegis().catch(console.error);

module.exports = { mailerRegis };