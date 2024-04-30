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
const UserCourses_model_1 = __importDefault(require("../database/models/UserCourses.model"));
class UserCoursesModel {
    constructor() {
        this.model = UserCourses_model_1.default;
    }
    createUserCourse({ userId, courseTitle, courseId, progress = 0, bookmarked = false }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCourse = yield this.model.create({ userId, courseTitle, courseId, progress, bookmarked });
            return userCourse;
        });
    }
    findCoursesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCourses = yield this.model.findAll({ where: { userId } });
            return userCourses;
        });
    }
    updateUserCourse(key, value, userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedCount] = yield this.model.update({ [key]: value }, { where: { userId, courseId } });
            return affectedCount;
        });
    }
}
exports.default = UserCoursesModel;
