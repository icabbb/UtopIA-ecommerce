const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.emailUser, // Tu correo electrónico de Gmail
    pass: config.emailPassword // Tu contraseña de Gmail o una contraseña de aplicación si tienes 2FA habilitado
  }
});

const sendEmail = async (email, subject, html) => {
  const mailOptions = {
    from: config.emailFrom, // Remitente
    to: email, // Destinatario
    subject: subject,
    html: html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: %s', error);
    throw new Error('Error sending email');
  }
};

module.exports = { sendEmail };
