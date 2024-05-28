

  import { DataTypes } from 'sequelize';
  import { sequelize } from '../db/connection';
  import { Marca } from './Marca';

  const Modelo = sequelize.define('Modelo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ano: {
      type: DataTypes.INTEGER
    },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo'),
      defaultValue: 'activo'
    },
    imagen: {
      type: DataTypes.STRING
    }
  });

  // Definimos la relación con Marca
  Modelo.belongsTo(Marca, { foreignKey: 'idMarca' });

  export{Modelo} ;
