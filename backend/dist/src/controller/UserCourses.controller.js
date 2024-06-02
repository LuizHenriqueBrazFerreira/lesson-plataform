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
const UserCourses_service_1 = __importDefault(require("../services/UserCourses.service"));
class UserCoursesController {
    constructor() {
        this.userCoursesService = new UserCourses_service_1.default();
    }
    createUserCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, courseTitle, courseId, progress, bookmarked } = req.body;
            const { status, data } = yield this.userCoursesService.createUserCourse({ userId, courseTitle, courseId, progress, bookmarked });
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    requestUserCoursesByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const { status, data } = yield this.userCoursesService.findCoursesByUserId(Number(userId));
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
    updateUserCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key, value, userId, courseId } = req.body;
            const { status, data } = yield this.userCoursesService.updateUserCourse(key, value, userId, courseId);
            return res.status((0, mapHttp_1.default)(status)).json(data);
        });
    }
}
exports.default = UserCoursesController;
