import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';
import { Vehiculo } from './Vehiculo';
import { Cliente } from './Cliente';
import { Empleado } from './Empleado';

const Inspeccion = sequelize.define('Inspeccion', {
  tieneRalladuras: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  cantidadCombustible: {
    type: DataTypes.ENUM('1/4', '1/2', '3/4', 'lleno'),
    allowNull: false
  },
  tieneGomaRespuesta: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  tieneGato: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  tieneRoturasCristal: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  estadoGomas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lucesFuncionando: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  liquidoFrenos: {
    type: DataTypes.ENUM('bajo', 'medio', 'alto'),
    allowNull: false
  },
  presionNeumaticos: {
    type: DataTypes.ENUM('baja', 'normal', 'alta'),
    allowNull: false
  },
  nivelAceite: {
    type: DataTypes.ENUM('bajo', 'medio', 'alto'),
    allowNull: false
  },
  observaciones: {
    type: DataTypes.TEXT
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  }
}, {
  tableName: 'inspecciones'
});

// Definición de relaciones
Inspeccion.belongsTo(Vehiculo, { foreignKey: 'idVehiculo' });
Inspeccion.belongsTo(Cliente, { foreignKey: 'idCliente' });
Inspeccion.belongsTo(Empleado, { foreignKey: 'idEmpleadoInspeccion' });

export {Inspeccion} ;
