"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const Courses_model_1 = __importDefault(require("./Courses.model"));
const Users_model_1 = __importDefault(require("./Users.model"));
class UserCoursesSequelize extends sequelize_1.Model {
}
UserCoursesSequelize.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    progress: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    bookmarked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: index_1.default,
    modelName: 'UserCourses',
    timestamps: false,
});
UserCoursesSequelize.belongsTo(Courses_model_1.default, {
    foreignKey: 'course_id',
    targetKey: 'id',
});
UserCoursesSequelize.belongsTo(Users_model_1.default, {
    foreignKey: 'user_id',
    targetKey: 'id',
});
exports.default = UserCoursesSequelize;
