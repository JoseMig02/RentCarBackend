import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

const Cliente = sequelize.define('Cliente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // correo: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   unique: true
  // },
  // contrasena: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  noTarjetaCR: {
    type: DataTypes.STRING,
    allowNull: false
  },
  limiteCredito: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipoPersona: {
    type: DataTypes.ENUM('Física', 'Jurídica'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  }
    // role: {
    //   type: DataTypes.ENUM('cliente'),
    //   defaultValue: 'cliente'
    // }
});

export { Cliente };
