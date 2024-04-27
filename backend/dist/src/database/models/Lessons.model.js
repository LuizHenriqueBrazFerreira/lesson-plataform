"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const LessonsModel = index_1.default.define('Lessons', {
    title: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    content: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    image: sequelize_1.DataTypes.STRING,
    link: {
        type: sequelize_1.DataTypes.STRING
    },
    topic: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    subTopic: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        field: 'sub_topic'
    }
}, {
    tableName: 'Lessons',
    underscored: true,
    timestamps: false
});
exports.default = LessonsModel;
