"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentaDevolucion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Empleado_1 = require("./Empleado");
const Vehiculo_1 = require("./Vehiculo");
const Cliente_1 = require("./Cliente");
const RentaDevolucion = connection_1.sequelize.define('RentaDevolucion', {
    noRenta: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    fechaRenta: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    fechaDevolucion: {
        type: sequelize_1.DataTypes.DATE
    },
    montoXDia: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    cantidadDias: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: sequelize_1.DataTypes.TEXT
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('renta', 'devolucion'),
        allowNull: false
    },
    totalPago: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    estadoPago: {
        type: sequelize_1.DataTypes.ENUM('pendiente', 'pagado'),
        allowNull: false,
        defaultValue: 'pendiente'
    }
}, {
    tableName: 'rentas_devoluciones'
});
exports.RentaDevolucion = RentaDevolucion;
// Definición de relaciones
RentaDevolucion.belongsTo(Empleado_1.Empleado, { foreignKey: 'idEmpleado' });
RentaDevolucion.belongsTo(Vehiculo_1.Vehiculo, { foreignKey: 'idVehiculo' });
RentaDevolucion.belongsTo(Cliente_1.Cliente, { foreignKey: 'idCliente' });
