"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
class UsersSequelize extends sequelize_1.Model {
}
UsersSequelize.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    organization: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'STUDENT'
    },
    confirmEmailToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'confirm_email_token'
    },
}, {
    sequelize: index_1.default,
    modelName: 'Users',
    timestamps: false,
});
exports.default = UsersSequelize;
