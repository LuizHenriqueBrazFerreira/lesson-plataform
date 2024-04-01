"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const UserModel = index_1.default.define('Users', {
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        unique: true,
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'users',
    underscored: true,
    timestamps: false
});
exports.default = UserModel;
