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
exports.ConsultaController = void 0;
const sequelize_1 = require("sequelize");
const RentaDevolucion_1 = require("../models/RentaDevolucion");
class ConsultaController {
    static consultarTodasLasRentas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rentas = yield RentaDevolucion_1.RentaDevolucion.findAll();
                const rentasModificadas = rentas.map(renta => {
                    const rentaData = renta.get();
                    const fechaRenta = new Date(rentaData.fechaRenta);
                    fechaRenta.setDate(fechaRenta.getDate() + 1);
                    return Object.assign(Object.assign({}, rentaData), { fechaRenta: fechaRenta.toISOString().slice(0, 10) });
                });
                return res.status(200).json(rentasModificadas);
            }
            catch (error) {
                console.error('Error al consultar todas las rentas:', error);
                return res.status(500).json({ message: 'Error al consultar todas las rentas' });
            }
        });
    }
    static consultarRentasPorCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clienteId = req.params.clienteId;
                const rentas = yield RentaDevolucion_1.RentaDevolucion.findAll({ where: { idCliente: clienteId } });
                return res.status(200).json(rentas);
            }
            catch (error) {
                console.error('Error al consultar rentas por cliente:', error);
                return res.status(500).json({ message: 'Error al consultar rentas por cliente' });
            }
        });
    }
    static consultarRentasEntreFechas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fechaInicio, fechaFin } = req.query;
                const rentas = yield RentaDevolucion_1.RentaDevolucion.findAll({
                    where: { fechaRenta: { [sequelize_1.Op.between]: [fechaInicio, fechaFin] } }
                });
                const rentasModificadas = rentas.map(renta => {
                    const rentaData = renta.get();
                    const fechaRenta = new Date(rentaData.fechaRenta);
                    fechaRenta.setDate(fechaRenta.getDate() + 1);
                    return Object.assign(Object.assign({}, rentaData), { fechaRenta: fechaRenta.toISOString().slice(0, 10) });
                });
                return res.status(200).json(rentasModificadas);
            }
            catch (error) {
                console.error('Error al consultar rentas entre fechas:', error);
                return res.status(500).json({ message: 'Error al consultar rentas entre fechas' });
            }
        });
    }
    static consultarRentasEnFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaString = req.query.fecha;
                let fechar;
                // Obtener la fecha de la URL
                if (fechaString !== undefined) {
                    const fecha = new Date(fechaString);
                    const fechaCortada = fecha.toISOString().slice(0, 10); // Formatear la fecha a yyyy-MM-dd
                    fechar = fechaCortada;
                    console.log(fechaCortada); // Aquí tienes la fecha como cadena formateada
                }
                else {
                    console.error('La cadena de fecha está indefinida.');
                }
                console.log(fechar);
                const rentas = yield RentaDevolucion_1.RentaDevolucion.findAll({
                    where: {
                        fechaRenta: fechar // Comparar con la fecha recibida en la URL
                    }
                });
                // Sumar un día a la fecha de cada renta
                const rentasModificadas = rentas.map(renta => {
                    const rentaData = renta.get();
                    const fechaRenta = new Date(rentaData.fechaRenta);
                    fechaRenta.setDate(fechaRenta.getDate() + 1);
                    return Object.assign(Object.assign({}, rentaData), { fechaRenta: fechaRenta.toISOString().slice(0, 10) });
                });
                console.log(rentasModificadas);
                return res.status(200).json(rentasModificadas);
            }
            catch (error) {
                console.error('Error al consultar rentas en fecha:', error);
                return res.status(500).json({ message: 'Error al consultar rentas en fecha' });
            }
        });
    }
    static consultarRentasPorVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiculoId = req.params.vehiculoId;
                const rentas = yield RentaDevolucion_1.RentaDevolucion.findAll({ where: { idVehiculo: vehiculoId } });
                return res.status(200).json(rentas);
            }
            catch (error) {
                console.error('Error al consultar rentas por vehículo:', error);
                return res.status(500).json({ message: 'Error al consultar rentas por vehículo' });
            }
        });
    }
}
exports.ConsultaController = ConsultaController;
