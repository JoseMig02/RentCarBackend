import { Request, Response } from 'express';
import { TipoCombustible } from '../models/TipoCombustible';

interface RequestWithBody extends Request {
  body: {
    nombre: string;
    descripcion: string;
    esElectrico: boolean;
    estado: 'activo' | 'inactivo';
  };
}

class TipoCombustibleController {
    
  static async getAll(req: Request, res: Response) {
    try {
      const tiposCombustible = await TipoCombustible.findAll();
      res.status(200).json(tiposCombustible);
    } catch (error) {
      console.error('Error al obtener los tipos de combustible:', error);
      res.status(500).json({ message: 'Error al obtener los tipos de combustible' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const tipoCombustibleId = req.params.id;
      if (!tipoCombustibleId) {
        return res.status(400).json({ message: 'ID de tipo de combustible no proporcionado' });
      }
      const tipoCombustible = await TipoCombustible.findByPk(tipoCombustibleId);
      if (!tipoCombustible) {
        return res.status(404).json({ message: 'Tipo de combustible no encontrado' });
      }
      res.status(200).json(tipoCombustible);
    } catch (error) {
      console.error('Error al obtener el tipo de combustible por ID:', error);
      res.status(500).json({ message: 'Error al obtener el tipo de combustible por ID' });
    }
  }

  static async create(req: RequestWithBody, res: Response) {
    try {
      const { nombre, descripcion, esElectrico, estado } = req.body;
      if (!nombre || !descripcion || esElectrico === undefined || !estado) {
        return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
      }
      const nuevoTipoCombustible = await TipoCombustible.create({ nombre, descripcion, esElectrico, estado });
      res.status(201).json(nuevoTipoCombustible);
    } catch (error) {
      console.error('Error al crear el tipo de combustible:', error);
      res.status(500).json({ message: 'Error al crear el tipo de combustible' });
    }
  }

  static async update(req: RequestWithBody, res: Response) {
    try {
      const tipoCombustibleId = req.params.id;
      if (!tipoCombustibleId) {
        return res.status(400).json({ message: 'ID de tipo de combustible no proporcionado' });
      }
      const { nombre, descripcion, esElectrico, estado } = req.body;
      if (!nombre || !descripcion || esElectrico === undefined || !estado) {
        return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
      }
      const tipoCombustible = await TipoCombustible.findByPk(tipoCombustibleId);
      if (!tipoCombustible) {
        return res.status(404).json({ message: 'Tipo de combustible no encontrado' });
      }
      await tipoCombustible.update({ nombre, descripcion, esElectrico, estado });
      res.status(200).json(tipoCombustible);
    } catch (error) {
      console.error('Error al actualizar el tipo de combustible:', error);
      res.status(500).json({ message: 'Error al actualizar el tipo de combustible' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const tipoCombustibleId = req.params.id;
      if (!tipoCombustibleId) {
        return res.status(400).json({ message: 'ID de tipo de combustible no proporcionado' });
      }
      const tipoCombustible = await TipoCombustible.findByPk(tipoCombustibleId);
      if (!tipoCombustible) {
        return res.status(404).json({ message: 'Tipo de combustible no encontrado' });
      }
      await tipoCombustible.destroy();
      res.json({ message: 'Tipo de combustible eliminado exitosamente' });
      res.status(204).end();
    } catch (error) {
      console.error('Error al eliminar el tipo de combustible:', error);
      res.status(500).json({ message: 'Error al eliminar el tipo de combustible' });
    }
  }
}

export { TipoCombustibleController };
