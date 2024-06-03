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
const CoursesModel_1 = __importDefault(require("../models/CoursesModel"));
const validateLessonAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const coursesIds = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses.map((course) => course.courseId);
    const coursesModel = new CoursesModel_1.default();
    const course = yield coursesModel.getCourseByLessonId(Number(id));
    if (coursesIds === null || coursesIds === void 0 ? void 0 : coursesIds.includes((_b = course === null || course === void 0 ? void 0 : course.id) !== null && _b !== void 0 ? _b : 0)) {
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
});
exports.default = validateLessonAccess;
