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
exports.TipoCombustibleController = void 0;
const TipoCombustible_1 = require("../models/TipoCombustible");
class TipoCombustibleController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tiposCombustible = yield TipoCombustible_1.TipoCombustible.findAll();
                res.status(200).json(tiposCombustible);
            }
            catch (error) {
                console.error('Error al obtener los tipos de combustible:', error);
                res.status(500).json({ message: 'Error al obtener los tipos de combustible' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipoCombustibleId = req.params.id;
                if (!tipoCombustibleId) {
                    return res.status(400).json({ message: 'ID de tipo de combustible no proporcionado' });
                }
                const tipoCombustible = yield TipoCombustible_1.TipoCombustible.findByPk(tipoCombustibleId);
                if (!tipoCombustible) {
                    return res.status(404).json({ message: 'Tipo de combustible no encontrado' });
                }
                res.status(200).json(tipoCombustible);
            }
            catch (error) {
                console.error('Error al obtener el tipo de combustible por ID:', error);
                res.status(500).json({ message: 'Error al obtener el tipo de combustible por ID' });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, descripcion, esElectrico, estado } = req.body;
                if (!nombre || !descripcion || esElectrico === undefined || !estado) {
                    return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
                }
                const nuevoTipoCombustible = yield TipoCombustible_1.TipoCombustible.create({ nombre, descripcion, esElectrico, estado });
                res.status(201).json(nuevoTipoCombustible);
            }
            catch (error) {
                console.error('Error al crear el tipo de combustible:', error);
                res.status(500).json({ message: 'Error al crear el tipo de combustible' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipoCombustibleId = req.params.id;
                if (!tipoCombustibleId) {
                    return res.status(400).json({ message: 'ID de tipo de combustible no proporcionado' });
                }
                const { nombre, descripcion, esElectrico, estado } = req.body;
                if (!nombre || !descripcion || esElectrico === undefined || !estado) {
                    return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
                }
                const tipoCombustible = yield TipoCombustible_1.TipoCombustible.findByPk(tipoCombustibleId);
                if (!tipoCombustible) {
                    return res.status(404).json({ message: 'Tipo de combustible no encontrado' });
                }
                yield tipoCombustible.update({ nombre, descripcion, esElectrico, estado });
                res.status(200).json(tipoCombustible);
            }
            catch (error) {
                console.error('Error al actualizar el tipo de combustible:', error);
                res.status(500).json({ message: 'Error al actualizar el tipo de combustible' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipoCombustibleId = req.params.id;
                if (!tipoCombustibleId) {
                    return res.status(400).json({ message: 'ID de tipo de combustible no proporcionado' });
                }
                const tipoCombustible = yield TipoCombustible_1.TipoCombustible.findByPk(tipoCombustibleId);
                if (!tipoCombustible) {
                    return res.status(404).json({ message: 'Tipo de combustible no encontrado' });
                }
                yield tipoCombustible.destroy();
                res.json({ message: 'Tipo de combustible eliminado exitosamente' });
                res.status(204).end();
            }
            catch (error) {
                console.error('Error al eliminar el tipo de combustible:', error);
                res.status(500).json({ message: 'Error al eliminar el tipo de combustible' });
            }
        });
    }
}
exports.TipoCombustibleController = TipoCombustibleController;
