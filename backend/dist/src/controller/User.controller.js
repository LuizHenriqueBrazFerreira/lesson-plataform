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
const User_service_1 = __importDefault(require("../services/User.service"));
const mapHttp_1 = __importDefault(require("../utils/mapHttp"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const { status, data } = yield User_service_1.default.createUser(userData);
    res.status((0, mapHttp_1.default)(status)).json(data);
});
const requestUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { status, data } = yield User_service_1.default.findByEmail(email, password);
    return res.status((0, mapHttp_1.default)(status)).json(data);
});
const confirmEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const { status, data } = yield User_service_1.default.confirmEmail(token);
    return res.status((0, mapHttp_1.default)(status)).json(data);
});
const resendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { status, data } = yield User_service_1.default.resendEmail(email);
    return res.status((0, mapHttp_1.default)(status)).json(data);
});
exports.default = { registerUser, requestUserByEmail, confirmEmail, resendEmail };
