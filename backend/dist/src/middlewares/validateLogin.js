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
exports.validateConfirmEmailToken = exports.validateUser = exports.validateToken = exports.validatePassword = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const UsersModel_1 = __importDefault(require("../models/UsersModel"));
const LessonsModel_1 = __importDefault(require("../models/LessonsModel"));
const ModulesModel_1 = __importDefault(require("../models/ModulesModel"));
const UserCoursesModel_1 = __importDefault(require("../models/UserCoursesModel"));
const validatePassword = (password, dbPassword) => bcrypt
    .compareSync(password, dbPassword);
exports.validatePassword = validatePassword;
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const userModel = new UsersModel_1.default();
    const lessonsModel = new LessonsModel_1.default();
    const modulesModel = new ModulesModel_1.default();
    const userCoursesModel = new UserCoursesModel_1.default();
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    const token = authorization.split(' ')[1];
    const { email } = (0, jwt_1.verifyToken)(token);
    const user = yield userModel.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    const courses = yield userCoursesModel.findCoursesByUserId(user.id);
    const userData = Object.assign(Object.assign({}, user.dataValues), { courses: courses.map((course) => course.dataValues) });
    req.user = userData;
    next();
});
exports.validateToken = validateToken;
const validateUser = (email, password, name, country) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password || !name || !country) {
        return { status: 'BAD_REQUEST', data: { message: 'Todos os campos obrigatórios devem estar preenchidos.' } };
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
const validateConfirmEmailToken = (emailToken, userEmail) => {
    const { email } = (0, jwt_1.verifyToken)(emailToken !== null && emailToken !== void 0 ? emailToken : '');
    return email === userEmail;
};
exports.validateConfirmEmailToken = validateConfirmEmailToken;
