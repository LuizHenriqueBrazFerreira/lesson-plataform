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
const mapHttp_1 = __importDefault(require("../utils/mapHttp"));
const User_service_1 = __importDefault(require("../services/User.service"));
class UsersController {
    constructor() {
        this.userService = new User_service_1.default();
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const { status, data } = yield this.userService.createUser(userData);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    requestUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { status, data } = yield this.userService.findByEmail(email, password);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    confirmEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            const { status, data } = yield this.userService.confirmEmail(token);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    resendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const { status, data } = yield this.userService.resendEmail(email);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const { status, data } = yield this.userService.forgotPassword(email);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, password } = req.body;
            const { status, data } = yield this.userService.resetPassword(token, password);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    sendSupportEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, topic, content } = req.body;
            const { status, data } = yield this.userService.requestSuport(email, name, topic, content);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    requestProfileData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const { status, data } = yield this.userService.findProfileData(email);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    updateProfileData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { oldEmail, email, name, password, country, organization } = req.body;
            const { status, data } = yield this.userService.updateProfileData(oldEmail, email, name, password, country, organization);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
}
exports.default = UsersController;
