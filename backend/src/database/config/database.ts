import { Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const config: Options = {
  username: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT),
  dialect: 'mysql',
};

export = config;

