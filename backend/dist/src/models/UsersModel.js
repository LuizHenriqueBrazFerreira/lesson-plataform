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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
class UsersModel {
    constructor() {
        this.model = Users_model_1.default;
    }
    createUser({ name, email, password, role, country, organization = '' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = bcryptjs_1.default.hashSync(password, SALT_ROUNDS);
            const user = yield this.model.create({ name, email, password: hashedPassword, role, country, organization });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.model.findOne({ where: { email } });
            return userExists;
        });
    }
    updateUser(key, value, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.update({ [key]: value }, { where: { email } });
            return user;
        });
    }
}
exports.default = UsersModel;
