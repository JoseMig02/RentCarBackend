"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Empleado = connection_1.sequelize.define('Empleado', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tandaLabor: {
        type: sequelize_1.DataTypes.ENUM('Matutina', 'Vespertina', 'Nocturna'),
        allowNull: false
    },
    porcentajeComision: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    fechaIngreso: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('empleado', 'admin', 'pendiente'),
        defaultValue: 'pendiente'
    }
});
exports.Empleado = Empleado;
