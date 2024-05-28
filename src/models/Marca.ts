
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

const Marca = sequelize.define('Marca', {
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
    },
    imagen: {
      type: DataTypes.STRING
    }
 
  });

  export {Marca};