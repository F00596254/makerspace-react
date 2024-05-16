const nodemailer = require('nodemailer');
const Email = require('../models/email');
const mailService = require('../service/mailService');

const sendEmail = async (req, res) => {
    try {
        const { to, from, subject, body } = req.body;


        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: body
        };

    
        await mailService.sendMail(mailOptions);

        const newEmail = new Email({ to, from, subject, body });
        await newEmail.save();


        res.status(200).send('Email sent and saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
};

module.exports = { sendEmail };
