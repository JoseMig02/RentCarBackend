"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoVehiculo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const TipoVehiculo = connection_1.sequelize.define('TipoVehiculo', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    }
});
exports.TipoVehiculo = TipoVehiculo;
