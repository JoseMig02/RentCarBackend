"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehiculo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const TipoVehiculo_1 = require("./TipoVehiculo");
const Marca_1 = require("./Marca");
const Modelo_1 = require("./Modelo");
const TipoCombustible_1 = require("./TipoCombustible");
const Vehiculo = connection_1.sequelize.define('Vehiculo', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    noChasis: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    noMotor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    noPlaca: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('disponible', 'alquilado', 'mantenimiento'),
        defaultValue: 'disponible'
    },
    color: {
        type: sequelize_1.DataTypes.STRING
    },
    anoFabricacion: {
        type: sequelize_1.DataTypes.INTEGER
    },
    kilometraje: {
        type: sequelize_1.DataTypes.FLOAT
    },
    imagenes: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'vehiculos'
});
exports.Vehiculo = Vehiculo;
// Definición de relaciones
Vehiculo.belongsTo(TipoVehiculo_1.TipoVehiculo, { foreignKey: 'idTipoVehiculo' });
Vehiculo.belongsTo(Marca_1.Marca, { foreignKey: 'idMarca' });
Vehiculo.belongsTo(Modelo_1.Modelo, { foreignKey: 'idModelo' });
Vehiculo.belongsTo(TipoCombustible_1.TipoCombustible, { foreignKey: 'idTipoCombustible' });
