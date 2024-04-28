"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('UserCourses', {
            userId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                field: 'user_id',
                references: {
                    model: 'Users',
                    key: 'id'
                }
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
            progress: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0
            },
            bookmarked: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING,
                defaultValue: false
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('UserCourses');
    }
};
