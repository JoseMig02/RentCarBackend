"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inspeccion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Vehiculo_1 = require("./Vehiculo");
const Cliente_1 = require("./Cliente");
const Empleado_1 = require("./Empleado");
const Inspeccion = connection_1.sequelize.define('Inspeccion', {
    tieneRalladuras: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    cantidadCombustible: {
        type: sequelize_1.DataTypes.ENUM('1/4', '1/2', '3/4', 'lleno'),
        allowNull: false
    },
    tieneGomaRespuesta: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    tieneGato: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    tieneRoturasCristal: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    estadoGomas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lucesFuncionando: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    liquidoFrenos: {
        type: sequelize_1.DataTypes.ENUM('bajo', 'medio', 'alto'),
        allowNull: false
    },
    presionNeumaticos: {
        type: sequelize_1.DataTypes.ENUM('baja', 'normal', 'alta'),
        allowNull: false
    },
    nivelAceite: {
        type: sequelize_1.DataTypes.ENUM('bajo', 'medio', 'alto'),
        allowNull: false
    },
    observaciones: {
        type: sequelize_1.DataTypes.TEXT
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    }
}, {
    tableName: 'inspecciones'
});
exports.Inspeccion = Inspeccion;
// Definición de relaciones
Inspeccion.belongsTo(Vehiculo_1.Vehiculo, { foreignKey: 'idVehiculo' });
Inspeccion.belongsTo(Cliente_1.Cliente, { foreignKey: 'idCliente' });
Inspeccion.belongsTo(Empleado_1.Empleado, { foreignKey: 'idEmpleadoInspeccion' });
