"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modelo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Marca_1 = require("./Marca");
const Modelo = connection_1.sequelize.define('Modelo', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ano: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.Modelo = Modelo;
// Definimos la relación con Marca
Modelo.belongsTo(Marca_1.Marca, { foreignKey: 'idMarca' });
