const nodemailer = require('nodemailer');

async function sendEmail(recipient, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // 'host': 'smtp.gmail.com',
    // 'secure': 'false',
    auth: {
      user: process.env.EMAIL_SERVICE_ID,
      pass: process.env.EMAIL_SERVICE_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_SERVICE_ID,
    to: `${recipient}`,
    subject: `${subject}`,
    html: `${text}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
}

module.exports = sendEmail