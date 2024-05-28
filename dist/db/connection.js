"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
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
exports.sequelize = sequelize;
