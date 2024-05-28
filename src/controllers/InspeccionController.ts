import { Request, Response } from 'express';
import { Inspeccion } from '../models/Inspeccion';

class InspeccionController {
  static async createInspeccion(req: Request, res: Response) {
    try {
      const {
        tieneRalladuras,
        cantidadCombustible,
        tieneGomaRespuesta,
        tieneGato,
        tieneRoturasCristal,
        estadoGomas,
        lucesFuncionando,
        liquidoFrenos,
        presionNeumaticos,
        nivelAceite,
        observaciones,
        estado,
        fecha,
        idVehiculo,
        idCliente,
        idEmpleadoInspeccion
      } = req.body;

      // Crear la inspección
      const nuevaInspeccion = await Inspeccion.create({
        tieneRalladuras,
        cantidadCombustible,
        tieneGomaRespuesta,
        tieneGato,
        tieneRoturasCristal,
        estadoGomas,
        lucesFuncionando,
        liquidoFrenos,
        presionNeumaticos,
        nivelAceite,
        observaciones,
        fecha,
        estado,
        idVehiculo,
        idCliente,
        idEmpleadoInspeccion
      });

      return res.status(201).json({ message: 'Inspección creada correctamente', inspeccion: nuevaInspeccion });
    } catch (error) {
      console.error('Error al crear inspección:', error);
      return res.status(500).json({ message: 'Error al crear inspección' });
    }
  }

  static async getInspecciones(req: Request, res: Response) {
    try {
      const inspecciones = await Inspeccion.findAll();
      return res.status(200).json(inspecciones);
    } catch (error) {
      console.error('Error al obtener inspecciones:', error);
      return res.status(500).json({ message: 'Error al obtener inspecciones' });
    }
  }

  static async getInspeccionById(req: Request, res: Response) {
    try {
      const inspeccionId = req.params.id;
      const inspeccion = await Inspeccion.findByPk(inspeccionId);
      if (!inspeccion) {
        return res.status(404).json({ message: 'Inspección no encontrada' });
      }
      return res.status(200).json(inspeccion);
    } catch (error) {
      console.error('Error al obtener inspección por ID:', error);
      return res.status(500).json({ message: 'Error al obtener inspección por ID' });
    }
  }

  static async updateInspeccion(req: Request, res: Response) {
    try {
      const inspeccionId = req.params.id;
      const {
        tieneRalladuras,
        cantidadCombustible,
        tieneGomaRespuesta,
        tieneGato,
        tieneRoturasCristal,
        estadoGomas,
        lucesFuncionando,
        liquidoFrenos,
        presionNeumaticos,
        nivelAceite,
        observaciones,
        estado,
        fecha,
        idVehiculo,
        idCliente,
        idEmpleadoInspeccion
      } = req.body;

      const inspeccion = await Inspeccion.findByPk(inspeccionId);
      if (!inspeccion) {
        return res.status(404).json({ message: 'Inspección no encontrada' });
      }

      await inspeccion.update({
        tieneRalladuras,
        cantidadCombustible,
        tieneGomaRespuesta,
        tieneGato,
        tieneRoturasCristal,
        estadoGomas,
        lucesFuncionando,
        liquidoFrenos,
        presionNeumaticos,
        nivelAceite,
        observaciones,
        fecha,
        estado,
        idVehiculo,
        idCliente,
        idEmpleadoInspeccion
      });

      return res.status(200).json({ message: 'Inspección actualizada correctamente', inspeccion });
    } catch (error) {
      console.error('Error al actualizar inspección:', error);
      return res.status(500).json({ message: 'Error al actualizar inspección' });
    }
  }

  static async deleteInspeccion(req: Request, res: Response) {
    try {
      const inspeccionId = req.params.id;
      const inspeccion = await Inspeccion.findByPk(inspeccionId);
      if (!inspeccion) {
        return res.status(404).json({ message: 'Inspección no encontrada' });
      }
      await inspeccion.destroy();
      return res.status(200).json({ message: 'Inspección eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar inspección:', error);
      return res.status(500).json({ message: 'Error al eliminar inspección' });
    }
  }
}

export { InspeccionController };
