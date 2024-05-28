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
exports.InspeccionController = void 0;
const Inspeccion_1 = require("../models/Inspeccion");
class InspeccionController {
    static createInspeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tieneRalladuras, cantidadCombustible, tieneGomaRespuesta, tieneGato, tieneRoturasCristal, estadoGomas, lucesFuncionando, liquidoFrenos, presionNeumaticos, nivelAceite, observaciones, estado, fecha, idVehiculo, idCliente, idEmpleadoInspeccion } = req.body;
                // Crear la inspección
                const nuevaInspeccion = yield Inspeccion_1.Inspeccion.create({
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
            }
            catch (error) {
                console.error('Error al crear inspección:', error);
                return res.status(500).json({ message: 'Error al crear inspección' });
            }
        });
    }
    static getInspecciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inspecciones = yield Inspeccion_1.Inspeccion.findAll();
                return res.status(200).json(inspecciones);
            }
            catch (error) {
                console.error('Error al obtener inspecciones:', error);
                return res.status(500).json({ message: 'Error al obtener inspecciones' });
            }
        });
    }
    static getInspeccionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inspeccionId = req.params.id;
                const inspeccion = yield Inspeccion_1.Inspeccion.findByPk(inspeccionId);
                if (!inspeccion) {
                    return res.status(404).json({ message: 'Inspección no encontrada' });
                }
                return res.status(200).json(inspeccion);
            }
            catch (error) {
                console.error('Error al obtener inspección por ID:', error);
                return res.status(500).json({ message: 'Error al obtener inspección por ID' });
            }
        });
    }
    static updateInspeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inspeccionId = req.params.id;
                const { tieneRalladuras, cantidadCombustible, tieneGomaRespuesta, tieneGato, tieneRoturasCristal, estadoGomas, lucesFuncionando, liquidoFrenos, presionNeumaticos, nivelAceite, observaciones, estado, fecha, idVehiculo, idCliente, idEmpleadoInspeccion } = req.body;
                const inspeccion = yield Inspeccion_1.Inspeccion.findByPk(inspeccionId);
                if (!inspeccion) {
                    return res.status(404).json({ message: 'Inspección no encontrada' });
                }
                yield inspeccion.update({
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
            }
            catch (error) {
                console.error('Error al actualizar inspección:', error);
                return res.status(500).json({ message: 'Error al actualizar inspección' });
            }
        });
    }
    static deleteInspeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inspeccionId = req.params.id;
                const inspeccion = yield Inspeccion_1.Inspeccion.findByPk(inspeccionId);
                if (!inspeccion) {
                    return res.status(404).json({ message: 'Inspección no encontrada' });
                }
                yield inspeccion.destroy();
                return res.status(200).json({ message: 'Inspección eliminada correctamente' });
            }
            catch (error) {
                console.error('Error al eliminar inspección:', error);
                return res.status(500).json({ message: 'Error al eliminar inspección' });
            }
        });
    }
}
exports.InspeccionController = InspeccionController;
