"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lessons_routes_1 = __importDefault(require("./lessons.routes"));
const User_routes_1 = __importDefault(require("./User.routes"));
exports.default = { lessonRouter: lessons_routes_1.default, userRouter: User_routes_1.default };
