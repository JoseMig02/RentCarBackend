import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Empleado } from '../models/Empleado';

interface RequestWithBody extends Request {
  body: {
    nombre: string;
    cedula: string;
    correo: string;
    contrasena: string;
    tandaLabor: 'Matutina' | 'Vespertina' | 'Nocturna';
    porcentajeComision: number;
    fechaIngreso: Date;
    role:string;
    estado: 'activo' | 'inactivo';
  };
}

class EmpleadoController {
  static async signUp(req: RequestWithBody, res: Response) {
    try {
      const { nombre, cedula, correo, contrasena, tandaLabor, porcentajeComision, fechaIngreso } = req.body;

      // Verificar si el empleado ya existe
      const empleadoExistente = await Empleado.findOne({ where: { correo } });
      if (empleadoExistente) {
        return res.status(400).json({ message: 'El empleado ya está registrado' });
      }

      // Cifrar la contraseña antes de almacenarla en la base de datos
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      // Crear un nuevo empleado
      const nuevoEmpleado = await Empleado.create({
        nombre,
        cedula,
        correo,
        contrasena: hashedPassword,
        tandaLabor,
        porcentajeComision,
        fechaIngreso,
      });

      return res.status(201).json({ message: 'Empleado registrado correctamente', empleado: nuevoEmpleado });
    } catch (error) {
      console.error('Error al registrar empleado:', error);
      return res.status(500).json({ message: 'Error al registrar empleado' });
    }
  }

  static async signIn(req: RequestWithBody, res: Response) {
    try {
      const { correo, contrasena } = req.body;

      // Buscar el empleado por su correo electrónico
      const empleado:any = await Empleado.findOne({ where: { correo } });
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }

      // Verificar si la contraseña es correcta
      const contrasenaValida = await bcrypt.compare(contrasena, empleado.contrasena);
      if (!contrasenaValida) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar token de autenticación
      const token = jwt.sign({ empleadoId: empleado.id, role:empleado.role }, 'clave_secreta');

      return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const empleados = await Empleado.findAll();
      return res.status(200).json(empleados);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      return res.status(500).json({ message: 'Error al obtener empleados' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const empleadoId = req.params.id;
      const empleado = await Empleado.findByPk(empleadoId);
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      return res.status(200).json(empleado);
    } catch (error) {
      console.error('Error al obtener empleado por ID:', error);
      return res.status(500).json({ message: 'Error al obtener empleado por ID' });
    }
  }

  static async update(req: RequestWithBody, res: Response) {
    try {
      const empleadoId = req.params.id;
      const { nombre, cedula, correo, tandaLabor, porcentajeComision, fechaIngreso, role ,estado } = req.body;
      
      const empleado = await Empleado.findByPk(empleadoId);
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }

      await empleado.update({ nombre, cedula, correo, tandaLabor, porcentajeComision, fechaIngreso,role,estado });
      return res.status(200).json({ message: 'Empleado actualizado correctamente', empleado });
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      return res.status(500).json({ message: 'Error al actualizar empleado' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const empleadoId = req.params.id;
      const empleado = await Empleado.findByPk(empleadoId);
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      await empleado.destroy();
      return res.status(200).json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      return res.status(500).json({ message: 'Error al eliminar empleado' });
    }
  }
}

export { EmpleadoController };
