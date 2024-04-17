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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const userEmail = process.env.EMAIL_USER;
const userPassword = process.env.EMAIL_PASSWORD;
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
const sendEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield smtpTransport.sendMail({
            from: userEmail,
            to: email,
            subject: 'Confirmação de Cadastro',
            text: 'Email de teste',
            html: `<h1>Teste</h1>
      <p>Teste de envio de email</p>
      <a href="http://localhost:3000/confirm/${token}">Clique aqui para confirmar seu cadastro</a>`
        }, (error, info) => {
            if (error) {
                console.log(error);
            }
            console.log(info);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmail = sendEmail;
