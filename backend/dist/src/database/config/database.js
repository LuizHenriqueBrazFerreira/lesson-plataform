"use strict";
const config = {
    username: process.env.MYSQL_ROOT_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'fsmsss_password',
    database: process.env.MYSQL_DATABASE || 'fsmsss_database',
    host: process.env.MYSQL_HOST || 'db',
    port: Number(process.env.MYSQL_PORT) || 3306,
    dialect: 'mysql',
};
module.exports = config;
