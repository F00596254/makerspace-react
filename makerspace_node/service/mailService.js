const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'csravya333@gmail.com', //  Gmail address
    pass: 'jcemjlceqxsilwig' //  Gmail account pwd
  }
});

const sendMail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info);
      }
    });
  });
};

module.exports = {
  sendMail
};
