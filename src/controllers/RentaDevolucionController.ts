import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { RentaDevolucion } from '../models/RentaDevolucion';
import { Vehiculo } from '../models/Vehiculo';
import { Cliente } from '../models/Cliente';
import { Empleado } from '../models/Empleado';

interface RequestWithBody extends Request {
  body: {
    noRenta: number;
    fechaRenta: Date;
    fechaDevolucion: Date;
    montoXDia: number;
    cantidadDias: number;
    comentario: string;
    estado: 'renta' | 'devolucion';
    totalPago: number;
    estadoPago: 'pendiente' | 'pagado';
    idEmpleado: number;
    idVehiculo: number;
    idCliente: number;
  };
}

class RentController {
  static async createRent(req: RequestWithBody, res: Response) {
    try {
      const {
        noRenta,
        fechaRenta,
        fechaDevolucion,
        montoXDia,
        cantidadDias,
        comentario,
        estado,
        totalPago,
        estadoPago,
        idEmpleado,
        idVehiculo,
        idCliente,
      } = req.body;

      const vehiculo:any = await Vehiculo.findByPk(idVehiculo);
      if (!vehiculo || vehiculo.estado !== 'disponible') {
        return res.status(400).json({ message: 'El vehículo seleccionado no está disponible' });
      }

      // Verificar si el estado es 'devolucion' al intentar crear una renta
      if (estado === 'devolucion') {
        return res.status(400).json({ message: 'No se puede devolver un vehículo sin haberlo rentado primero' });
      }

      // Crear la renta en la base de datos
      const nuevaRenta = await RentaDevolucion.create({
        noRenta,
        fechaRenta,
        montoXDia,
        cantidadDias,
        comentario,
        estado,
        totalPago,
        estadoPago,
        idEmpleado,
        idVehiculo,
        idCliente,
        fechaDevolucion,
      });

     
      // Actualizar el estado del vehículo a alquilado si la renta es de alquiler
      await vehiculo.update({ estado: 'alquilado' });

      return res.status(201).json({ message: 'Renta creada correctamente', renta: nuevaRenta });
    } catch (error) {
      console.error('Error al crear la renta:', error);
      return res.status(500).json({ message: 'Error al crear la renta' });
    }
  }

  static async updateRent(req: RequestWithBody, res: Response) {
    try {
      const rentId = parseInt(req.params.id);
      const {
        noRenta,
        fechaRenta,
        montoXDia,
        cantidadDias,
        comentario,
        estado,
        totalPago,
        estadoPago,
        idEmpleado,
        idVehiculo,
        idCliente,
        fechaDevolucion,
      } = req.body;

      const renta:any = await RentaDevolucion.findByPk(rentId);
      if (!renta) {
        return res.status(404).json({ message: 'Renta no encontrada' });
      }

      // Actualizar la renta con los nuevos detalles
      await renta.update({
        noRenta,
        fechaRenta,
        montoXDia,
        cantidadDias,
        comentario,
        estado,
        totalPago,
        estadoPago,
        idEmpleado,
        idVehiculo,
        idCliente,
        fechaDevolucion,
      });

      const vehiculo:any= await Vehiculo.findByPk(renta.idVehiculo);
      if (!vehiculo) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }

      // Actualizar el estado del vehículo en base al nuevo estado de la renta
      if (estado === 'devolucion') {
        await vehiculo.update({ estado: 'disponible' });
      } else if (estado === 'renta' && vehiculo.estado === 'disponible') {
        await vehiculo.update({ estado: 'alquilado' });
      }

      return res.status(200).json({ message: 'Renta actualizada correctamente', renta });
    } catch (error) {
      console.error('Error al actualizar la renta:', error);
      return res.status(500).json({ message: 'Error al actualizar la renta' });
    }
  }

  static async deleteRent(req: Request, res: Response) {
    try {
      const rentId = parseInt(req.params.id);

      const renta:any = await RentaDevolucion.findByPk(rentId);
      if (!renta) {
        return res.status(404).json({ message: 'Renta no encontrada' });
      }

      const vehiculo:any = await Vehiculo.findByPk(renta.idVehiculo);
      if (vehiculo && renta.estado === 'renta') {
        await vehiculo.update({ estado: 'disponible' });
      }

      await renta.destroy();

      return res.status(200).json({ message: 'Renta eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar la renta:', error);
      return res.status(500).json({ message: 'Error al eliminar la renta' });
    }
  }
}

// Función para enviar correo electrónico de confirmación al cliente
// function sendConfirmationEmail(clientEmail: string, rentDetails: any) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'martinezmanuel0011@gmail.com',
//       pass: 'vufk qetn jitb ejpt',
//     },
//   });

//   const mailOptions = {
//     from: 'martinezmanuel0011@gmail.com',
//     to: clientEmail,
//     subject: 'Confirmación de renta de vehículo',
//     text: `Estimado cliente,\n\nSe ha registrado una nueva renta de vehículo.\n\nDetalles de la renta:\n${JSON.stringify(
//       rentDetails
//     )}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error al enviar el correo electrónico:', error);
//     } else {
//       console.log('Correo electrónico enviado:', info.response);
//     }
//   });
// }

export { RentController };
