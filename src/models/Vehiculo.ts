
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';
import {TipoVehiculo} from './TipoVehiculo';
import {Marca} from './Marca';
import {Modelo }from './Modelo';
import { TipoCombustible } from './TipoCombustible';

const Vehiculo = sequelize.define('Vehiculo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  noChasis: {
    type: DataTypes.STRING,
    allowNull: false
  },
  noMotor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  noPlaca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('disponible', 'alquilado', 'mantenimiento'),
    defaultValue: 'disponible'
  },
  color: {
    type: DataTypes.STRING
  },
  anoFabricacion: {
    type: DataTypes.INTEGER
  },
  kilometraje: {
    type: DataTypes.FLOAT
  },
  imagenes: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'vehiculos'
});

// Definición de relaciones
Vehiculo.belongsTo(TipoVehiculo, { foreignKey: 'idTipoVehiculo' });
Vehiculo.belongsTo(Marca, { foreignKey: 'idMarca' });
Vehiculo.belongsTo(Modelo, { foreignKey: 'idModelo' });
Vehiculo.belongsTo(TipoCombustible, { foreignKey: 'idTipoCombustible' });


export {Vehiculo};
