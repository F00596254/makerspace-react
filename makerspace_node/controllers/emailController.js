const nodemailer = require('nodemailer');
const Email = require('../models/email');

const sendEmail = async (req, res) => {
    const { to, from, subject, body, attachments } = req.body;

    let attachmentArray = [];
    if (attachments) {
        attachmentArray = attachments.map(att => ({ filename: att.filename, path: att.path }));
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chouderpallysravya@gmail.com',
            pass: 'Fall@2023',
        },
    });

    const mailOptions = {
        from,
        to,
        subject,
        text: body,
        attachments: attachmentArray,
    };

    try {
        await transporter.sendMail(mailOptions);
        const newEmail = new Email({ to, from, subject, body, attachments: attachmentArray });
        await newEmail.save();
        res.status(200).send('Email sent and saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
};

module.exports = { sendEmail };
