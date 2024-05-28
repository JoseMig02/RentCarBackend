import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { RentaDevolucion } from '../models/RentaDevolucion'; // Ajusta la importación según tu estructura de archivos
import PDFDocument from 'pdfkit'; // Importa la biblioteca pdfkit
import { Vehiculo } from '../models/Vehiculo';

export class ReporteController {
  // Método para generar un reporte de rentas entre fechas
  static async generarReporteEntreFechas(req: Request, res: Response): Promise<void> {
    try {
      // Obtener las fechas de inicio y fin del query string
      const { fechaInicio, fechaFin } = req.query;
      
      // Realizar la consulta para obtener las rentas entre las fechas especificadas
      const rentas:any = await RentaDevolucion.findAll({
        where: { 
          fechaRenta: { 
            [Op.between]: [fechaInicio, fechaFin] 
          } 
        }
      });

      // Generar el PDF con los datos obtenidos
      const doc = new PDFDocument(); // Crea un nuevo documento PDF
      const fileName = 'reporte_rentas_entre_fechas.pdf'; // Nombre del archivo PDF
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`); // Establece el nombre del archivo para la descarga

      doc.pipe(res); // Envía el PDF como respuesta

      // Encabezado
      doc.fontSize(20).text('Reporte de Rentas', { align: 'center' });
      doc.moveDown();

      // Contenido del reporte
      doc.fontSize(14).text(`Rentas entre ${fechaInicio} y ${fechaFin}:`, { underline: true });
      doc.moveDown();

      rentas.forEach((renta: any, index: any) => {
        doc.fontSize(12).text(`Renta ${index + 1}:`, { underline: true });
        doc.moveDown();

        // Muestra cada campo de la renta
        doc.fontSize(12).text(`ID: ${renta.dataValues.id}`);
        doc.fontSize(12).text(`No. de Renta: ${renta.dataValues.noRenta}`);
        doc.fontSize(12).text(`Fecha de Renta: ${renta.dataValues.fechaRenta}`);
        doc.fontSize(12).text(`Fecha de Devolución: ${renta.dataValues.fechaDevolucion}`);
        doc.fontSize(12).text(`Monto por Día: ${renta.dataValues.montoXDia}`);
        doc.fontSize(12).text(`Cantidad de Días: ${renta.dataValues.cantidadDias}`);
        doc.fontSize(12).text(`Comentario: ${renta.dataValues.comentario}`);
        doc.fontSize(12).text(`Estado: ${renta.dataValues.estado}`);
        doc.fontSize(12).text(`Total a Pagar: ${renta.dataValues.totalPago}`);
        doc.fontSize(12).text(`Estado de Pago: ${renta.dataValues.estadoPago}`);
        doc.fontSize(12).text(`ID del Empleado: ${renta.dataValues.idEmpleado}`);
        doc.fontSize(12).text(`ID del Vehículo: ${renta.dataValues.idVehiculo}`);
        doc.fontSize(12).text(`ID del Cliente: ${renta.dataValues.idCliente}`);
    
        doc.moveDown(); // Añade un espacio entre cada renta
        doc.moveDown(); // Añade otro espacio para mayor separación
      });

      // Finaliza el PDF
      doc.end();
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      res.status(500).json({ message: 'Error al generar el reporte' });
    }
  }

  // Método para generar un reporte de rentas por tipo de vehículo
  static async generarReportePorTipoVehiculo(req: Request, res: Response): Promise<void> {
    try {
      // Obtener el tipo de vehículo del query string
      const idVehiculo = parseInt(req.params.id);

      console.log('---------------------------' + idVehiculo)

      // Realizar la consulta para obtener las rentas asociadas a vehículos del tipo especificado
      const rentas: any = await RentaDevolucion.findAll({
        include: [{
          model: Vehiculo,
          where: {
            idTipoVehiculo: idVehiculo
          }
        }]
      });
      // Generar el PDF con los datos obtenidos
      const doc = new PDFDocument(); // Crea un nuevo documento PDF
      const fileName = 'reporte_rentas_por_tipo_vehiculo.pdf'; // Nombre del archivo PDF
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`); // Establece el nombre del archivo para la descarga

      doc.pipe(res); // Envía el PDF como respuesta

      // Encabezado
      doc.fontSize(20).text('Reporte de Rentas por Tipo de Vehículo', { align: 'center' });
      doc.moveDown();

      // Contenido del reporte
      
      doc.moveDown();

      // Itera sobre las rentas y las agrega al PDF
      rentas.forEach((renta: any, index: any) => {
        const datosRenta = renta.dataValues;
        const datosVehiculo = renta.Vehiculo.dataValues;
    
        doc.fontSize(14).text(`Renta ${index + 1}:`, { underline: true });
        doc.moveDown();
    
        // Datos de la renta
        doc.fontSize(12).text(`ID de Renta: ${datosRenta.id}`);
        doc.fontSize(12).text(`Número de Renta: ${datosRenta.noRenta}`);
        doc.fontSize(12).text(`Fecha de Renta: ${datosRenta.fechaRenta}`);
        doc.fontSize(12).text(`Fecha de Devolución: ${datosRenta.fechaDevolucion}`);
        doc.fontSize(12).text(`Monto por Día: ${datosRenta.montoXDia}`);
        doc.fontSize(12).text(`Cantidad de Días: ${datosRenta.cantidadDias}`);
        doc.fontSize(12).text(`Comentario: ${datosRenta.comentario}`);
        doc.fontSize(12).text(`Estado: ${datosRenta.estado}`);
        doc.fontSize(12).text(`Total a Pagar: ${datosRenta.totalPago}`);
        doc.fontSize(12).text(`Estado de Pago: ${datosRenta.estadoPago}`);
  
        // Datos del vehículo asociado a la renta
        doc.fontSize(12).text(`ID del Vehículo: ${datosVehiculo.id}`);
        doc.fontSize(12).text(`Nombre del Vehículo: ${datosVehiculo.nombre}`);
        doc.fontSize(12).text(`Descripción del Vehículo: ${datosVehiculo.descripcion}`);
        doc.fontSize(12).text(`Número de Chasis: ${datosVehiculo.noChasis}`);
        doc.fontSize(12).text(`Número de Motor: ${datosVehiculo.noMotor}`);
        doc.fontSize(12).text(`Número de Placa: ${datosVehiculo.noPlaca}`);
        doc.fontSize(12).text(`Estado del Vehículo: ${datosVehiculo.estado}`);
        doc.fontSize(12).text(`Color del Vehículo: ${datosVehiculo.color}`);
        doc.fontSize(12).text(`Año de Fabricación: ${datosVehiculo.anoFabricacion}`);
        doc.fontSize(12).text(`Kilometraje: ${datosVehiculo.kilometraje}`);

        doc.moveDown(); // Añade un espacio entre cada renta
        doc.moveDown(); // Añade otro espacio para mayor separación
      });

      // Finaliza el PDF
      doc.end();
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      res.status(500).json({ message: 'Error al generar el reporte' });
    }
  }
}
