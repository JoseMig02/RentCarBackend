
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';


const TipoVehiculo = sequelize.define('TipoVehiculo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  }
});
  
export {TipoVehiculo};