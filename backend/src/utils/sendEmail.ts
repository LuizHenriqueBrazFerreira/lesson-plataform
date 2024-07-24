import CreateReport from './createReport';
import nodemailer from 'nodemailer';

const userEmail = process.env.EMAIL_USER || 'ensinofsmsss@gmail.com';
const userPassword = process.env.EMAIL_PASSWORD;
const baseurl = process.env.FRONTEND_URL || 'http://localhost:3000';

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

export const sendConfirmEmail = async (email: string, token: string, name: string) => {
  try {
    await smtpTransport.sendMail({
      from: {
        name: 'Ensino - FSMSSS',
        address: userEmail
      },
      to: email,
      subject: 'CONFIRME SEU CADASTRO',
      html: `
      <div style="margin: 0 auto; width: 40vw; background-color:#faf9f8; padding: 20px; height: 70vh; font-family: Graphik, Roboto, Helvetica, Calibri, Arial, sans-serif;"">
        <img src="https://storage.googleapis.com/atados-v3/user-uploaded/images/32c816d9-4f08-463e-8676-200895084434.png" alt="Logo" style="display: block; margin: 0 auto; width: 202px; height: 68px;">
        <div style="background-color: rgba(224, 105, 21, 0.1); padding: 20px; border-radius: 5px;">
          <h1 style="font-size: 20px;">Olá, ${name}!</h1>
          <p style="font-size: 25px;">Confirme seu endereço de email</p>
        </div>
        <div style="padding: 20px; background-color: white;"">
          <p style="font-size: 20px;">Seja bem-vindo à plataforma de ensino do FSMSSS. Clique no botão abaixo para verificar o seu email e concluir a configuração da sua conta.</p>
          <a href="${baseurl}confirm/${token}" style="background-color: #e06915; padding: 10px 20px; border-radius: 5px; color: white; text-decoration: none; display: inline-block;">Confirmar seu cadastro</a>
          <p style="margin-top: 50px;">Caso o botão acima não funcione você pode copiar e colar o seguinte link em seu navegador: <a href="${baseurl}confirm/${token}">${baseurl}confirm/${token}</a></p>
        </div>
      </div>`
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendForgotPasswordEmail = async (email: string, token: string, name: string) => {
  try {
    await smtpTransport.sendMail({
      from: {
        name: 'Ensino - FSMSSS',
        address: userEmail
      },
      to: email,
      subject: 'REDEFINIR SENHA',
      html: `
      <div style="margin: 0 auto; width: 40vw; background-color:#faf9f8; padding: 20px; height: 70vh; font-family: Graphik, Roboto, Helvetica, Calibri, Arial, sans-serif;"">
        <img src="https://storage.googleapis.com/atados-v3/user-uploaded/images/32c816d9-4f08-463e-8676-200895084434.png" alt="Logo" style="display: block; margin: 0 auto; width: 202px; height: 68px;">
        <div style="background-color: rgba(224, 105, 21, 0.1); padding: 20px; border-radius: 5px;">
          <h1 style="font-size: 20px;">Olá, ${name}!</h1>
          <p style="font-size: 25px;">Recebemos sua solicitação de redefinição de senha</p>
        </div>
        <div style="padding: 20px; background-color: white;"">
          <p style="font-size: 20px;">Clique no botão abaixo para criar uma nova senha.</p>
          <a href="${baseurl}reset-password/${token}" style="background-color: #e06915; padding: 10px 20px; border-radius: 5px; color: white; text-decoration: none; display: inline-block;">Redefinir sua senha</a>
          <p style="margin-top: 50px;">Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
        </div>
      </div>`
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendSupportEmail = async (email: string, name: string, topic:string, content: string, contact = '') => {
    try {
      await smtpTransport.sendMail({
        from: {
          name: 'Ensino - FSMSSS',
          address: userEmail
        },
        to: userEmail,
        subject: topic,
        html: `
        <div style="margin: 0 auto; width: 40vw; background-color:#faf9f8; padding: 20px; height: 70vh; font-family: Graphik, Roboto, Helvetica, Calibri, Arial, sans-serif;"">
          <img src="https://storage.googleapis.com/atados-v3/user-uploaded/images/32c816d9-4f08-463e-8676-200895084434.png" alt="Logo" style="display: block; margin: 0 auto; width: 202px; height: 68px;">
          <div style="background-color: rgba(224, 105, 21, 0.1); padding: 20px; border-radius: 5px;">
            <h1 style="font-size: 20px;">Suporte - E-mail de usuário recebido!</h1>
            <p style="font-size: 25px;">Recebemos uma solicitação ao Suporte</p>
          </div>
          <div style="padding: 20px; background-color: white;"">
            <p style="font-size: 20px; ">Usuário: ${name} - ${email} ${contact.length !== 0 ? "- número para contato: " + contact : ''}, enviou uma chamada ao suporte, com o seguinte conteúdo:</p>
            <p style="margin-top: 50px; font-size: 18px;">${content}</p>
          </div>
        </div>`
      });
    } catch (error) {
      console.log(error);
    }
};

export const sendReportEmail = async () => {
  const report = new CreateReport();
  const html = await report.transformReport();

  try {
    await smtpTransport.sendMail({
      from: {
        name: 'Ensino - FSMSSS',
        address: userEmail
      },
      to: userEmail,
      subject: 'RELATÓRIO DE USUÁRIOS INSCRITOS',
      html: `
      <div style="margin: 0 auto; width: 40vw; background-color:#faf9f8; padding: 20px; min-height: 70vh; font-family: Graphik, Roboto, Helvetica, Calibri, Arial, sans-serif;"">
        <img src="https://storage.googleapis.com/atados-v3/user-uploaded/images/32c816d9-4f08-463e-8676-200895084434.png" alt="Logo" style="display: block; margin: 0 auto; width: 202px; height: 68px;">
        <div style="background-color: rgba(224, 105, 21, 0.1); padding: 20px; border-radius: 5px;">
          <h1 style="font-size: 20px;">Relatório de Usuários Inscritos</h1>
        </div>
        <div style="padding: 20px; background-color: white;"">
          <p style="font-size: 20px;">Os seguintes usuários estão inscritos nos cursos:</p>
          <div style="margin-top: 50px; font-size: 14px;">${html}</div>
        </div>
      </div>`
    });
  } catch (error) {
    console.log(error);
  }
};

