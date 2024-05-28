import { Request, Response } from 'express';
import { TipoVehiculo } from '../models/TipoVehiculo';

interface TipoVehiculoRequest extends Request {
  body: {
    nombre: string;
    descripcion: string;
    estado: 'activo' | 'inactivo';
  };
  params: {
    id: string;
  };
}

const TipoVehiculoController = {
  async getAll(req: Request, res: Response) {
    try {
      const tiposVehiculo = await TipoVehiculo.findAll();
      return res.status(200).json(tiposVehiculo);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los tipos de vehículos' });
    }
  },

  async getById(req: TipoVehiculoRequest, res: Response) {
    const { id } = req.params;
    try {
      const tipoVehiculo = await TipoVehiculo.findByPk(id);
      if (!tipoVehiculo) {
        return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
      }
      return res.status(200).json(tipoVehiculo);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el tipo de vehículo' });
    }
  },

  async create(req: TipoVehiculoRequest, res: Response) {
    const { nombre, descripcion, estado } = req.body;
        if(!nombre || !descripcion){
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
    try {
      const nuevoTipoVehiculo = await TipoVehiculo.create({ nombre, descripcion, estado });
      return res.status(201).json(nuevoTipoVehiculo);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear el tipo de vehículo' });
    }
  },

  async update(req: TipoVehiculoRequest, res: Response) {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;
    try {
      const tipoVehiculo = await TipoVehiculo.findByPk(id);
      if (!tipoVehiculo) {
        return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
      }
      await tipoVehiculo.update({ nombre, descripcion, estado });
      return res.status(200).json(tipoVehiculo);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el tipo de vehículo' });
    }
  },
 
  async delete(req: TipoVehiculoRequest, res: Response) {
    const { id } = req.params;
    try {
      const tipoVehiculo = await TipoVehiculo.findByPk(id);
      if (!tipoVehiculo) {
        return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
      }
      await tipoVehiculo.destroy();
      res.json({ mensaje: 'Tipo de vehiculo eliminado exitosamente' });
      return res.status(204).end();
      
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar el tipo de vehículo' });
    }
  },
};

export { TipoVehiculoController };
