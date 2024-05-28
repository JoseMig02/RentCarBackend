

import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
    }
  },
  database: 'rentcar',
  username: 'jose',
  password: '1234',
  host: 'LAPTOP-DQRIJBVV',
  port: 1433,
});

export {sequelize};