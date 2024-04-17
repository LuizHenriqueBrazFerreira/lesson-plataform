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
const Users_model_1 = __importDefault(require("../database/models/Users.model"));
const jwt_1 = require("../utils/jwt");
const validateLogin_1 = require("../middlewares/validateLogin");
const sendEmail_1 = require("../utils/sendEmail");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
const createUser = ({ name, email, password, role }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_model_1.default.findOne({ where: { email } });
        const isUserValid = (0, validateLogin_1.validateUser)(email, password);
        if (isUserValid)
            return { status: isUserValid.status, data: isUserValid.data };
        if (user)
            return { status: 'CONFLICT', data: { message: 'E-mail já cadastrado.' } };
        const hashedPassword = bcryptjs_1.default.hashSync(password, SALT_ROUNDS);
        const newUser = yield Users_model_1.default.create({ name, email, password: hashedPassword, role });
        const token = (0, jwt_1.createToken)({ email, password });
        yield (0, sendEmail_1.sendEmail)(email, token);
        return { status: 'CREATED', data: { message: 'Usuário criado com sucesso.' } };
    }
    catch (error) {
        return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar o usuário' } };
    }
});
const findByEmail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email || !password)
            return { status: 'BAD_REQUEST', data: { message: 'Todos os campos devem estar preenchidos.' } };
        let isCorrectPassword;
        const userExists = yield Users_model_1.default.findOne({ where: { email } });
        if (userExists) {
            isCorrectPassword = (0, validateLogin_1.validatePassword)(password, userExists.dataValues.password);
        }
        if (!userExists || !isCorrectPassword)
            return { status: 'NOT_FOUND', data: { message: 'E-mail ou senha incorretos.' } };
        const token = (0, jwt_1.createToken)({ email, password });
        return { status: 'SUCCESSFUL', data: { token, role: userExists === null || userExists === void 0 ? void 0 : userExists.dataValues.role } };
    }
    catch (error) {
        console.log(error);
        return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
    }
});
exports.default = { createUser, findByEmail };
