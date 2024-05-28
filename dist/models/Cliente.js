"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Cliente = connection_1.sequelize.define('Cliente', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // correo: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true
    // },
    // contrasena: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    noTarjetaCR: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    limiteCredito: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    tipoPersona: {
        type: sequelize_1.DataTypes.ENUM('Física', 'Jurídica'),
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    }
    // role: {
    //   type: DataTypes.ENUM('cliente'),
    //   defaultValue: 'cliente'
    // }
});
exports.Cliente = Cliente;
