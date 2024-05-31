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
const jwt_1 = require("../utils/jwt");
const validateLogin_1 = require("../middlewares/validateLogin");
const sendEmail_1 = require("../utils/sendEmail");
const UsersModel_1 = __importDefault(require("../models/UsersModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
class UsersService {
    constructor() {
        this.userModel = new UsersModel_1.default();
    }
    createUser({ name, email, password, role, country, organization = '' }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findByEmail(email);
                const isUserValid = (0, validateLogin_1.validateUser)(email, password, name, country);
                if (isUserValid)
                    return { status: isUserValid.status, data: isUserValid.data };
                if (user)
                    return { status: 'CONFLICT', data: { message: 'E-mail já cadastrado.' } };
                yield this.userModel.createUser({ name, email, password, role, country, organization });
                const confirmEmailToken = (0, jwt_1.createEmailToken)({ email });
                const firstName = name.split(' ')[0];
                yield (0, sendEmail_1.sendConfirmEmail)(email, confirmEmailToken, firstName);
                return { status: 'CREATED', data: { message: 'Usuário criado com sucesso.' } };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar o usuário' } };
            }
        });
    }
    findByEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password)
                    return { status: 'BAD_REQUEST', data: { message: 'Todos os campos devem estar preenchidos.' } };
                let isCorrectPassword;
                const userExists = yield this.userModel.findByEmail(email);
                if (userExists) {
                    isCorrectPassword = (0, validateLogin_1.validatePassword)(password, userExists.dataValues.password);
                    const isConfirmedEmail = (0, validateLogin_1.validateConfirmEmailToken)(userExists.dataValues.confirmEmailToken, email);
                    if (!isConfirmedEmail)
                        return { status: 'BAD_REQUEST', data: { message: 'Por favor, confirme seu e-mail.' } };
                }
                if (!userExists || !isCorrectPassword)
                    return { status: 'NOT_FOUND', data: { message: 'E-mail ou senha incorretos.' } };
                const token = (0, jwt_1.createToken)({ email, password });
                return { status: 'SUCCESSFUL', data: { token, user: userExists.dataValues } };
            }
            catch (error) {
                console.log(error);
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
            }
        });
    }
    confirmEmail(confirmEmailToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = (0, jwt_1.verifyToken)(confirmEmailToken);
                yield this.userModel.updateUser('confirmEmailToken', confirmEmailToken, email);
                return { status: 'SUCCESSFUL', data: { message: 'E-mail confirmado com sucesso.' } };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
            }
        });
    }
    resendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findByEmail(email);
                if (!user)
                    return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };
                const confirmEmailToken = (0, jwt_1.createEmailToken)({ email });
                const name = user.dataValues.name.split(' ')[0];
                yield (0, sendEmail_1.sendConfirmEmail)(email, confirmEmailToken, name);
                return { status: 'SUCCESSFUL', data: { message: 'E-mail reenviado com sucesso.' } };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
            }
        });
    }
    forgotPassword(email) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findByEmail(email);
                if (!user)
                    return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };
                const forgotPasswordToken = (_a = user.dataValues.confirmEmailToken) !== null && _a !== void 0 ? _a : '';
                const name = user.dataValues.name.split(' ')[0];
                yield (0, sendEmail_1.sendForgotPasswordEmail)(email, forgotPasswordToken, name);
                return { status: 'SUCCESSFUL', data: { message: 'E-mail enviado com sucesso.' } };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
            }
        });
    }
    resetPassword(emailToken, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = (0, jwt_1.verifyToken)(emailToken);
                const user = yield this.userModel.findByEmail(email);
                if (!user)
                    return { status: 'NOT_FOUND', data: { message: 'E-mail não encontrado.' } };
                const hashedPassword = bcryptjs_1.default.hashSync(password, SALT_ROUNDS);
                yield this.userModel.updateUser('password', hashedPassword, email);
                return { status: 'SUCCESSFUL', data: { message: 'Senha alterada com sucesso.' } };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
            }
        });
    }
    findProfileData(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findByEmail(email);
                if (!user)
                    return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado.' } };
                return { status: 'SUCCESSFUL', data: user.dataValues };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: error } };
            }
        });
    }
    updateProfileData(oldEmail, email, name, password, country, organization) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findByEmail(oldEmail);
                if (!user)
                    return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado.' } };
                if (password.length > 8) {
                    const hashedPassword = bcryptjs_1.default.hashSync(password, SALT_ROUNDS);
                    yield this.userModel.updateUser('password', hashedPassword, oldEmail);
                }
                yield this.userModel.updateUser('country', country, oldEmail);
                yield this.userModel.updateUser('organization', organization, oldEmail);
                yield this.userModel.updateUser('name', name, oldEmail);
                yield this.userModel.updateUser('email', email, oldEmail);
                if (oldEmail !== email) {
                    const confirmEmailToken = (0, jwt_1.createEmailToken)({ email });
                    yield this.userModel.updateUser('confirmEmailToken', confirmEmailToken, email);
                }
                return { status: 'SUCCESSFUL', data: { message: 'Perfil atualizado com sucesso!' } };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Erro ao atualizar perfil.' } };
            }
        });
    }
}
exports.default = UsersService;
