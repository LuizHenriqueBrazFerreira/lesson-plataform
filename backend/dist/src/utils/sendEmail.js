"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForgotPasswordEmail = exports.sendConfirmEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const userEmail = process.env.EMAIL_USER || 'ensinofsmsss@gmail.com';
const userPassword = process.env.EMAIL_PASSWORD;
const baseurl = process.env.FRONTEND_URL || 'http://localhost:3000';
const smtpTransport = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: userEmail,
        pass: userPassword
    }
});
const sendConfirmEmail = (email, token, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield smtpTransport.sendMail({
            from: {
                name: 'Ensino - FSMSSS',
                address: userEmail
            },
            to: email,
            subject: 'CONFIRME SEU CADASTRO',
            html: `
      <div style="margin: 0 auto; width: 40vw;">
        <img src="https://storage.googleapis.com/atados-v3/user-uploaded/images/32c816d9-4f08-463e-8676-200895084434.png" alt="Logo" style="display: block; margin: 0 auto; width: 202px; height: 68px;">
        <div style="background-color: rgba(224, 105, 21, 0.1); padding: 20px; border-radius: 5px;">
          <h1 style="font-size: 20px;">Olá, ${name}!</h1>
          <p style="font-size: 30px;">Confirme seu endereço de email</p>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 20px;">Seja bem-vindo à plataforma de ensino da FSMSSS. Clique no botão abaixo para verificar o seu email e concluir a configuração da sua conta.</p>
          <a href="${baseurl}/confirm/${token}" style="background-color: #e06915; padding: 10px 20px; border-radius: 5px; color: white; text-decoration: none; display: inline-block;">Confirmar seu cadastro</a>
          <p style="margin-top: 50px;">Caso o botão acima não funcione você pode copiar e colar o seguinte link em seu navegador: <a href="${baseurl}/confirm/${token}">${baseurl}/confirm/${token}</a></p>
        </div>
      </div>`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendConfirmEmail = sendConfirmEmail;
const sendForgotPasswordEmail = (email, token, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield smtpTransport.sendMail({
            from: {
                name: 'Ensino - FSMSSS',
                address: userEmail
            },
            to: email,
            subject: 'REDEFINIR SENHA',
            html: `
      <div style="margin: 0 auto; width: 40vw;">
        <img src="https://storage.googleapis.com/atados-v3/user-uploaded/images/32c816d9-4f08-463e-8676-200895084434.png" alt="Logo" style="display: block; margin: 0 auto; width: 202px; height: 68px;">
        <div style="background-color: rgba(224, 105, 21, 0.1); padding: 20px; border-radius: 5px;">
          <h1 style="font-size: 20px;">Olá, ${name}!</h1>
          <p style="font-size: 30px;">Recebemos sua solicitação de redefinição de senha</p>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 20px;">Clique no botão abaixo para criar uma nova senha.</p>
          <a href="${baseurl}/reset-password/${token}" style="background-color: #e06915; padding: 10px 20px; border-radius: 5px; color: white; text-decoration: none; display: inline-block;">Redefinir sua senha</a>
          <p style="margin-top: 50px;">Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
        </div>
      </div>`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
