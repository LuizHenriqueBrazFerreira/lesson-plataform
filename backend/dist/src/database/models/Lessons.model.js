"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const Modules_model_1 = __importDefault(require("./Modules.model"));
class LessonsSequelize extends sequelize_1.Model {
}
LessonsSequelize.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    moduleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'module_id',
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    link: {
        type: sequelize_1.DataTypes.STRING,
    },
    watched: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: index_1.default,
    modelName: 'Lessons',
    timestamps: false,
});
LessonsSequelize.belongsTo(Modules_model_1.default, {
    foreignKey: 'module_id',
    targetKey: 'id',
});
exports.default = LessonsSequelize;
