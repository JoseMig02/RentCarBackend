"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoCombustible = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const TipoCombustible = connection_1.sequelize.define('TipoCombustible', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    esElectrico: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    }
});
exports.TipoCombustible = TipoCombustible;
