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
        field: 'user_id',
    },
    courseTitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'course_title',
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'course_id',
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
Users_model_1.default.hasMany(UserCoursesSequelize, {
    foreignKey: 'userId',
    sourceKey: 'id',
});
Courses_model_1.default.hasMany(UserCoursesSequelize, {
    foreignKey: 'courseId',
    sourceKey: 'id',
});
UserCoursesSequelize.belongsTo(Courses_model_1.default, {
    foreignKey: 'courseId',
    targetKey: 'id',
});
UserCoursesSequelize.belongsTo(Users_model_1.default, {
    foreignKey: 'userId',
    targetKey: 'id',
});
exports.default = UserCoursesSequelize;
