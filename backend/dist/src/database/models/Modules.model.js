"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const Courses_model_1 = __importDefault(require("./Courses.model"));
class ModulesSequelize extends sequelize_1.Model {
}
ModulesSequelize.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'course_id',
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: index_1.default,
    modelName: 'Modules',
    timestamps: false,
});
Courses_model_1.default.hasMany(ModulesSequelize, {
    foreignKey: 'courseId',
    sourceKey: 'id',
});
ModulesSequelize.belongsTo(Courses_model_1.default, {
    foreignKey: 'courseId',
    targetKey: 'id',
});
exports.default = ModulesSequelize;
