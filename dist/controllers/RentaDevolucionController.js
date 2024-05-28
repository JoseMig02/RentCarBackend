"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentController = void 0;
const RentaDevolucion_1 = require("../models/RentaDevolucion");
const Vehiculo_1 = require("../models/Vehiculo");
class RentController {
    static createRent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { noRenta, fechaRenta, fechaDevolucion, montoXDia, cantidadDias, comentario, estado, totalPago, estadoPago, idEmpleado, idVehiculo, idCliente, } = req.body;
                const vehiculo = yield Vehiculo_1.Vehiculo.findByPk(idVehiculo);
                if (!vehiculo || vehiculo.estado !== 'disponible') {
                    return res.status(400).json({ message: 'El vehículo seleccionado no está disponible' });
                }
                // Verificar si el estado es 'devolucion' al intentar crear una renta
                if (estado === 'devolucion') {
                    return res.status(400).json({ message: 'No se puede devolver un vehículo sin haberlo rentado primero' });
                }
                // Crear la renta en la base de datos
                const nuevaRenta = yield RentaDevolucion_1.RentaDevolucion.create({
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
                yield vehiculo.update({ estado: 'alquilado' });
                return res.status(201).json({ message: 'Renta creada correctamente', renta: nuevaRenta });
            }
            catch (error) {
                console.error('Error al crear la renta:', error);
                return res.status(500).json({ message: 'Error al crear la renta' });
            }
        });
    }
    static updateRent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rentId = parseInt(req.params.id);
                const { noRenta, fechaRenta, montoXDia, cantidadDias, comentario, estado, totalPago, estadoPago, idEmpleado, idVehiculo, idCliente, fechaDevolucion, } = req.body;
                const renta = yield RentaDevolucion_1.RentaDevolucion.findByPk(rentId);
                if (!renta) {
                    return res.status(404).json({ message: 'Renta no encontrada' });
                }
                // Actualizar la renta con los nuevos detalles
                yield renta.update({
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
                const vehiculo = yield Vehiculo_1.Vehiculo.findByPk(renta.idVehiculo);
                if (!vehiculo) {
                    return res.status(404).json({ message: 'Vehículo no encontrado' });
                }
                // Actualizar el estado del vehículo en base al nuevo estado de la renta
                if (estado === 'devolucion') {
                    yield vehiculo.update({ estado: 'disponible' });
                }
                else if (estado === 'renta' && vehiculo.estado === 'disponible') {
                    yield vehiculo.update({ estado: 'alquilado' });
                }
                return res.status(200).json({ message: 'Renta actualizada correctamente', renta });
            }
            catch (error) {
                console.error('Error al actualizar la renta:', error);
                return res.status(500).json({ message: 'Error al actualizar la renta' });
            }
        });
    }
    static deleteRent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rentId = parseInt(req.params.id);
                const renta = yield RentaDevolucion_1.RentaDevolucion.findByPk(rentId);
                if (!renta) {
                    return res.status(404).json({ message: 'Renta no encontrada' });
                }
                const vehiculo = yield Vehiculo_1.Vehiculo.findByPk(renta.idVehiculo);
                if (vehiculo && renta.estado === 'renta') {
                    yield vehiculo.update({ estado: 'disponible' });
                }
                yield renta.destroy();
                return res.status(200).json({ message: 'Renta eliminada correctamente' });
            }
            catch (error) {
                console.error('Error al eliminar la renta:', error);
                return res.status(500).json({ message: 'Error al eliminar la renta' });
            }
        });
    }
}
exports.RentController = RentController;
