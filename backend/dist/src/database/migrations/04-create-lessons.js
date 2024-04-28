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
            moduleId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                field: 'module_id',
                references: {
                    model: 'Modules',
                    key: 'id'
                }
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
            link: sequelize_1.DataTypes.STRING,
            watched: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('Lessons');
    }
};
