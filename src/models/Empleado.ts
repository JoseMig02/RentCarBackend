import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

const Empleado = sequelize.define('Empleado', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tandaLabor: {
    type: DataTypes.ENUM('Matutina', 'Vespertina', 'Nocturna'),
    allowNull: false
  },
  porcentajeComision: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  fechaIngreso: { 
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo'
  },
  role: {
    type: DataTypes.ENUM('empleado', 'admin','pendiente'),
    defaultValue: 'pendiente' 
  }
});

export { Empleado };
