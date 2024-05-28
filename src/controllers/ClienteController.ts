import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Cliente } from '../models/Cliente';

interface RequestWithBody extends Request {
  body: {
    nombre: string;
    cedula: string;
    correo: string;
    contrasena: string;
    noTarjetaCR: string;
    limiteCredito: number;
    tipoPersona: 'Física' | 'Jurídica';
    estado: 'activo' | 'inactivo';
  };
}

class ClienteController {
  static async signUp(req: RequestWithBody, res: Response) {
    try {
      const { nombre, cedula, noTarjetaCR, limiteCredito, tipoPersona,estado } = req.body;

      // Verificar si el cliente ya existe
      const clienteExistente = await Cliente.findOne({ where: { cedula } });
      if (clienteExistente) {
        return res.status(400).json({ message: 'El cliente ya está registrado' });
      }

      // Cifrar la contraseña antes de almacenarla en la base de datos
      // const hashedPassword = await bcrypt.hash(contrasena, 10);

      // Crear un nuevo cliente
      const nuevoCliente = await Cliente.create({
        nombre,
        cedula,
        estado,
        noTarjetaCR,
        limiteCredito,
        tipoPersona
      });

      return res.status(201).json({ message: 'Cliente registrado correctamente', cliente: nuevoCliente });
    } catch (error) {
      console.error('Error al registrar cliente:', error);
      return res.status(500).json({ message: 'Error al registrar cliente' });
    }
  }

  // static async signIn(req: RequestWithBody, res: Response) {
  //   try {
  //     const { correo, contrasena } = req.body;

  //     // Buscar el cliente por su correo electrónico
  //     const cliente:any = await Cliente.findOne({where:{correo}})
  //     if (!cliente) {
  //       return res.status(404).json({ message: 'Cliente no encontrado' });
  //     }

  //     // Verificar si la contraseña es correcta
  //     const contrasenaValida = await bcrypt.compare(contrasena, cliente.contrasena);
  //     if (!contrasenaValida) {
  //       return res.status(401).json({ message: 'Credenciales inválidas' });
  //     }

  //     // Generar token de autenticación
  //     const token = jwt.sign({ clienteId: cliente.id }, 'clave_secreta' );

  //     return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  //   } catch (error) {
  //     console.error('Error al iniciar sesión:', error);
  //     return res.status(500).json({ message: 'Error al iniciar sesión' });
  //   }
  // }

  static async getAll(req: Request, res: Response) {
    try {
      const clientes = await Cliente.findAll();
      return res.status(200).json(clientes);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      return res.status(500).json({ message: 'Error al obtener clientes' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const clienteId = req.params.id;
      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      return res.status(200).json(cliente);
    } catch (error) {
      console.error('Error al obtener cliente por ID:', error);
      return res.status(500).json({ message: 'Error al obtener cliente por ID' });
    }
  }

  static async update(req: RequestWithBody, res: Response) {
    try {
      const clienteId = req.params.id;
      const { nombre, cedula, noTarjetaCR, limiteCredito, tipoPersona ,estado} = req.body;
      
      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }

      await cliente.update({ nombre, cedula, noTarjetaCR, limiteCredito, tipoPersona,estado });
      return res.status(200).json({ message: 'Cliente actualizado correctamente', cliente });
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      return res.status(500).json({ message: 'Error al actualizar cliente' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const clienteId = req.params.id;
      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      await cliente.destroy();
      return res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      return res.status(500).json({ message: 'Error al eliminar cliente' });
    }
  }
  
}

export { ClienteController };
