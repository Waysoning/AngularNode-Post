import { Sequelize } from 'sequelize';
import {} from 'dotenv/config';

const sequelize = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
