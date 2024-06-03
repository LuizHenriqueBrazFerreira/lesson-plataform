"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapHttp_1 = __importDefault(require("../utils/mapHttp"));
const checkAdminRole = (req, res, next) => {
    var _a;
    const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (role !== 'ADMIN') {
        const data = { message: 'Você não tem permissão para acessar esta rota.' };
        return res.status((0, mapHttp_1.default)('FORBIDDEN')).json(data);
    }
    next();
};
exports.default = checkAdminRole;
