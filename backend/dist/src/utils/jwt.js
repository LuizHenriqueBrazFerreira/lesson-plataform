"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.createEmailToken = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_SECRET = JWT_SECRET;
const JWT_CONFIG = {
    algorithm: 'HS256',
};
const createToken = (payload) => jsonwebtoken_1.default.sign(payload, JWT_SECRET, JWT_CONFIG);
exports.createToken = createToken;
const createEmailToken = (payload) => jsonwebtoken_1.default.sign(payload, JWT_SECRET, JWT_CONFIG);
exports.createEmailToken = createEmailToken;
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, JWT_SECRET);
exports.verifyToken = verifyToken;
