"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('Modules', {
            id: {
                primaryKey: true,
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true
            },
            courseId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                field: 'course_id',
                references: {
                    model: 'Courses',
                    key: 'id'
                }
            },
            title: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('Modules');
    }
};
