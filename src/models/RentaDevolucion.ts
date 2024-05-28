import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

import { Empleado } from './Empleado';
import { Vehiculo } from './Vehiculo';
import { Cliente } from './Cliente';

const RentaDevolucion = sequelize.define('RentaDevolucion', {
  noRenta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  fechaRenta: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fechaDevolucion: {
    type: DataTypes.DATE
  },
  montoXDia: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cantidadDias: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.ENUM('renta', 'devolucion'),
    allowNull: false
  },
  totalPago: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  estadoPago: {
    type: DataTypes.ENUM('pendiente', 'pagado'),
    allowNull: false,
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'rentas_devoluciones'
});

// Definición de relaciones
RentaDevolucion.belongsTo(Empleado, { foreignKey: 'idEmpleado' });
RentaDevolucion.belongsTo(Vehiculo, { foreignKey: 'idVehiculo' });
RentaDevolucion.belongsTo(Cliente, { foreignKey: 'idCliente' });

export { RentaDevolucion };
