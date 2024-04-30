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
const UserCoursesModel_1 = __importDefault(require("../models/UserCoursesModel"));
class UserCoursesService {
    constructor(userCoursesModel = new UserCoursesModel_1.default()) {
        this.userCoursesModel = userCoursesModel;
    }
    ;
    createUserCourse({ userId, courseTitle, courseId, progress = 0, bookmarked = false }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userCourse = yield this.userCoursesModel.createUserCourse({ userId, courseTitle, courseId, progress, bookmarked });
                return { status: 'CREATED', data: userCourse };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar o curso para o usuário' } };
            }
        });
    }
    findCoursesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userCourses = yield this.userCoursesModel.findCoursesByUserId(userId);
                return { status: 'SUCCESSFUL', data: userCourses };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar os cursos do usuário' } };
            }
        });
    }
    updateUserCourse(key, value, userId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const affectedCount = yield this.userCoursesModel.updateUserCourse(key, value, userId, courseId);
                return { status: 'SUCCESSFUL', data: affectedCount };
            }
            catch (error) {
                return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao atualizar o curso do usuário' } };
            }
        });
    }
}
exports.default = UserCoursesService;
