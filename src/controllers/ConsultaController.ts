import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { RentaDevolucion } from '../models/RentaDevolucion';

interface RentaDevolucionAttributes {
  id: number;
  idCliente: number;
  idVehiculo: number;
  fechaRenta: string; // Aquí se define la propiedad fechaRenta como string
  fechaDevolucion: string;
  // Agrega otras propiedades según sea necesario
}

class ConsultaController {
  static async consultarTodasLasRentas(req: Request, res: Response) {
    try {
      const rentas = await RentaDevolucion.findAll();
      const rentasModificadas = rentas.map(renta => {
        const rentaData = renta.get() as RentaDevolucionAttributes;
        const fechaRenta = new Date(rentaData.fechaRenta);
        fechaRenta.setDate(fechaRenta.getDate() + 1);
        return {
          ...rentaData,
          fechaRenta: fechaRenta.toISOString().slice(0, 10)
        };
      });
      return res.status(200).json(rentasModificadas);
    } catch (error) {
      console.error('Error al consultar todas las rentas:', error);
      return res.status(500).json({ message: 'Error al consultar todas las rentas' });
    }
  }
  

  static async consultarRentasPorCliente(req: Request, res: Response) {
    try {
      const clienteId = req.params.clienteId;
      const rentas = await RentaDevolucion.findAll({ where: { idCliente: clienteId } });
      return res.status(200).json(rentas);
    } catch (error) {
      console.error('Error al consultar rentas por cliente:', error);
      return res.status(500).json({ message: 'Error al consultar rentas por cliente' });
    }
  }

  static async consultarRentasEntreFechas(req: Request, res: Response) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      const rentas = await RentaDevolucion.findAll({
        where: { fechaRenta: { [Op.between]: [fechaInicio, fechaFin] } }
      });
      const rentasModificadas = rentas.map(renta => {
        const rentaData = renta.get() as RentaDevolucionAttributes;
        const fechaRenta = new Date(rentaData.fechaRenta);
        fechaRenta.setDate(fechaRenta.getDate() + 1);
        return {
          ...rentaData,
          fechaRenta: fechaRenta.toISOString().slice(0, 10)
        };
      });
      return res.status(200).json(rentasModificadas);
    } catch (error) {
      console.error('Error al consultar rentas entre fechas:', error);
      return res.status(500).json({ message: 'Error al consultar rentas entre fechas' });
    }
  }

  static async consultarRentasEnFecha(req: Request, res: Response) {
    try {
      const fechaString: string = req.query.fecha as string;
      let fechar: string | undefined;

      // Obtener la fecha de la URL
      if (fechaString !== undefined) {
        const fecha = new Date(fechaString);
        const fechaCortada: string = fecha.toISOString().slice(0, 10); // Formatear la fecha a yyyy-MM-dd
        fechar = fechaCortada;
        console.log(fechaCortada); // Aquí tienes la fecha como cadena formateada
      } else {
        console.error('La cadena de fecha está indefinida.');
      }

      console.log(fechar);

      const rentas = await RentaDevolucion.findAll({
        where: {
          fechaRenta: fechar // Comparar con la fecha recibida en la URL
        }
      });

      // Sumar un día a la fecha de cada renta
      const rentasModificadas = rentas.map(renta => {
        const rentaData = renta.get() as RentaDevolucionAttributes;
        const fechaRenta = new Date(rentaData.fechaRenta);
        fechaRenta.setDate(fechaRenta.getDate() + 1);
        return {
          ...rentaData,
          fechaRenta: fechaRenta.toISOString().slice(0, 10)
        };
      });

      console.log(rentasModificadas);
      return res.status(200).json(rentasModificadas);
    } catch (error) {
      console.error('Error al consultar rentas en fecha:', error);
      return res.status(500).json({ message: 'Error al consultar rentas en fecha' });
    }
  }

  static async consultarRentasPorVehiculo(req: Request, res: Response) {
    try {
      const vehiculoId = req.params.vehiculoId;
      const rentas = await RentaDevolucion.findAll({ where: { idVehiculo: vehiculoId } });
      return res.status(200).json(rentas);
    } catch (error) {
      console.error('Error al consultar rentas por vehículo:', error);
      return res.status(500).json({ message: 'Error al consultar rentas por vehículo' });
    }
  }
}

export { ConsultaController };
