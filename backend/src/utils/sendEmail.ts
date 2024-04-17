import nodemailer from 'nodemailer';

const userEmail = process.env.EMAIL_USER;
const userPassword = process.env.EMAIL_PASSWORD;

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host:'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: userEmail,
    pass: userPassword
  }
});

export const sendEmail = async (email: string, token: string) => {
  try {
    await smtpTransport.sendMail({
      from: userEmail,
      to: email,
      subject: 'Confirmação de Cadastro',
      text: 'Email de teste',
      html: `<h1>Teste</h1>
      <p>Teste de envio de email</p>
      <a href="http://localhost:3000/confirm/${token}">Clique aqui para confirmar seu cadastro</a>`
    });
  } catch (error) {
    console.log(error);
  }
};

