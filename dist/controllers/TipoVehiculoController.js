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
exports.TipoVehiculoController = void 0;
const TipoVehiculo_1 = require("../models/TipoVehiculo");
const TipoVehiculoController = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tiposVehiculo = yield TipoVehiculo_1.TipoVehiculo.findAll();
                return res.status(200).json(tiposVehiculo);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error al obtener los tipos de vehículos' });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const tipoVehiculo = yield TipoVehiculo_1.TipoVehiculo.findByPk(id);
                if (!tipoVehiculo) {
                    return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
                }
                return res.status(200).json(tipoVehiculo);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error al obtener el tipo de vehículo' });
            }
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion, estado } = req.body;
            if (!nombre || !descripcion) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }
            try {
                const nuevoTipoVehiculo = yield TipoVehiculo_1.TipoVehiculo.create({ nombre, descripcion, estado });
                return res.status(201).json(nuevoTipoVehiculo);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error al crear el tipo de vehículo' });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, descripcion, estado } = req.body;
            try {
                const tipoVehiculo = yield TipoVehiculo_1.TipoVehiculo.findByPk(id);
                if (!tipoVehiculo) {
                    return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
                }
                yield tipoVehiculo.update({ nombre, descripcion, estado });
                return res.status(200).json(tipoVehiculo);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error al actualizar el tipo de vehículo' });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const tipoVehiculo = yield TipoVehiculo_1.TipoVehiculo.findByPk(id);
                if (!tipoVehiculo) {
                    return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
                }
                yield tipoVehiculo.destroy();
                res.json({ mensaje: 'Tipo de vehiculo eliminado exitosamente' });
                return res.status(204).end();
            }
            catch (error) {
                return res.status(500).json({ error: 'Error al eliminar el tipo de vehículo' });
            }
        });
    },
};
exports.TipoVehiculoController = TipoVehiculoController;
