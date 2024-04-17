"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validateUser = exports.validateToken = exports.validatePassword = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const validatePassword = (password, dbPassword) => bcrypt
    .compareSync(password, dbPassword);
exports.validatePassword = validatePassword;
const validateEmail = (email, dbEmail) => {
    if (email === dbEmail) {
        return true;
    }
    return false;
};
exports.validateEmail = validateEmail;
const validateToken = (req) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return { status: 'UNAUTHORIZED', data: { message: 'Token não encontrado' } };
    }
    const token = authorization.split(' ')[1];
    try {
        const tokenInfo = (0, jwt_1.verifyToken)(token);
        if (tokenInfo) {
            return true;
        }
    }
    catch (error) {
        console.log(error);
        return { status: 'UNAUTHORIZED', data: { message: 'Token deve ser um token válido' } };
    }
};
exports.validateToken = validateToken;
const validateUser = (email, password) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
        return { status: 'BAD_REQUEST', data: { message: 'Todos os campos devem estar preenchidos.' } };
    }
    const validMail = regex.test(email);
    if (!validMail) {
        return { status: 'UNAUTHORIZED', data: { message: 'E-mail inválido.' } };
    }
    if (password.length < 8) {
        return { status: 'UNAUTHORIZED', data: { message: 'Senha deve ter pelo menos 8 caracteres.' } };
    }
    return null;
};
exports.validateUser = validateUser;
