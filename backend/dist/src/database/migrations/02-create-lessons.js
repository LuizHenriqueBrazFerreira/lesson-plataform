"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('Lessons', {
            id: {
                primaryKey: true,
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true
            },
            title: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
            },
            content: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING
            },
            image: sequelize_1.DataTypes.STRING,
            link: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING
            },
            topic: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING
            },
            subTopic: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING
            }
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('Lessons');
    }
};
