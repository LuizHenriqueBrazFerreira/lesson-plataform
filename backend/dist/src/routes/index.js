"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lessons_routes_1 = __importDefault(require("./lessons.routes"));
const User_routes_1 = __importDefault(require("./User.routes"));
const Courses_routes_1 = __importDefault(require("./Courses.routes"));
const Modules_routes_1 = __importDefault(require("./Modules.routes"));
const UserCourses_routes_1 = __importDefault(require("./UserCourses.routes"));
exports.default = { lessonRouter: lessons_routes_1.default, userRouter: User_routes_1.default, courseRouter: Courses_routes_1.default, moduleRouter: Modules_routes_1.default, userCoursesRouter: UserCourses_routes_1.default };
