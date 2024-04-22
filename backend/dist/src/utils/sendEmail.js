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
      <div style="margin: 0 auto; width: fit-content;">
        <img src="https://storage.googleapis.com/atados-v3/user-uploaded/images/32c816d9-4f08-463e-8676-200895084434.png" alt="Logo" style="display: block; margin: 0 auto; width: 202px; height: 68px;">
        <h1>Olá, ${name}!</h1>
        <p>Seja bem-vindo à plataforma de ensino da FSMSSS. Clique no link abaixo para verificar o seu email e concluir a configuração da sua conta.</p>
        <a href="${baseurl}/confirm/${token}">Clique aqui para confirmar seu cadastro</a>
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
      <div style="margin: 0 auto; width: fit-content;">
        <img src="https://storage.googleapis.com/atados-v3/user-uploaded/images/32c816d9-4f08-463e-8676-200895084434.png" alt="Logo" style="display: block; margin: 0 auto; width: 202px; height: 68px;">
        <h1>Olá, ${name}!</h1>
        <p>Você solicitou a redefinição de senha. Clique no link abaixo para criar uma nova senha.</p>
        <a href="${baseurl}/reset-password/${token}">Clique aqui para redefinir sua senha</a>
        <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
      </div>`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
