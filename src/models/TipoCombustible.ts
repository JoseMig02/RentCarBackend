

import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

const TipoCombustible = sequelize.define('TipoCombustible', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  esElectrico: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    }
  });

  export {TipoCombustible}