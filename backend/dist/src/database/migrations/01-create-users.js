"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('Users', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
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
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('Users');
    }
};
