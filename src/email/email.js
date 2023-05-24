const nodemailer = require('nodemailer');

const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendVerificationEmail = async (email, verificationLink) => {
  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: 'Verificación de cuenta',
      html: `Por favor, haz clic en el siguiente enlace para verificar tu cuenta: <a href="${verificationLink}">${verificationLink}</a>`,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al enviar el correo electrónico de verificación');
  }
};

module.exports = {
  sendVerificationEmail,
};
