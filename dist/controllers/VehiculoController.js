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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiculoController = void 0;
const Vehiculo_1 = require("../models/Vehiculo");
const azure_storage_1 = __importDefault(require("azure-storage"));
// Cadena de conexión al servicio de almacenamiento de blobs de Azure
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=rentcarrr;AccountKey=PRzdmKwdApe6cijTpSHUh8CJoRMCOeaHEdoVPCQoHLpI1dj/5+8JnIrM3/YQgQO/Kb3EQpEc5W3H+AStoVWaYA==;EndpointSuffix=core.windows.net';
// Cliente del servicio de blobs de Azure
const blobService = azure_storage_1.default.createBlobService(connectionString);
class VehiculoController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiculos = yield Vehiculo_1.Vehiculo.findAll();
                res.status(200).json(vehiculos);
            }
            catch (error) {
                console.error('Error al obtener los vehículos:', error);
                res.status(500).json({ message: 'Error al obtener los vehículos' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiculoId = req.params.id;
                if (!vehiculoId) {
                    return res.status(400).json({ message: 'ID de vehículo no proporcionado' });
                }
                const vehiculo = yield Vehiculo_1.Vehiculo.findByPk(vehiculoId);
                if (!vehiculo) {
                    return res.status(404).json({ message: 'Vehículo no encontrado' });
                }
                res.status(200).json(vehiculo);
            }
            catch (error) {
                console.error('Error al obtener el vehículo por ID:', error);
                res.status(500).json({ message: 'Error al obtener el vehículo por ID' });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, descripcion, noChasis, noMotor, noPlaca, estado, color, anoFabricacion, kilometraje, idTipoVehiculo, idMarca, idModelo, idTipoCombustible } = req.body;
                if (!nombre || !descripcion || !noChasis || !noMotor || !noPlaca || !estado || !idTipoVehiculo || !idMarca || !idModelo || !idTipoCombustible) {
                    return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
                }
                const nuevoVehiculo = yield Vehiculo_1.Vehiculo.create({ nombre, descripcion, noChasis, noMotor, noPlaca, estado, color, anoFabricacion, kilometraje, idTipoVehiculo, idMarca, idModelo, idTipoCombustible });
                res.status(201).json(nuevoVehiculo);
            }
            catch (error) {
                console.error('Error al crear el vehículo:', error);
                res.status(500).json({ message: 'Error al crear el vehículo' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiculoId = req.params.id;
                if (!vehiculoId) {
                    return res.status(400).json({ message: 'ID de vehículo no proporcionado' });
                }
                const { nombre, descripcion, noChasis, noMotor, noPlaca, estado, color, anoFabricacion, kilometraje, idTipoVehiculo, idMarca, idModelo, idTipoCombustible } = req.body;
                if (!nombre || !descripcion || !noChasis || !noMotor || !noPlaca || !estado || !idTipoVehiculo || !idMarca || !idModelo || !idTipoCombustible) {
                    return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
                }
                const vehiculo = yield Vehiculo_1.Vehiculo.findByPk(vehiculoId);
                if (!vehiculo) {
                    return res.status(404).json({ message: 'Vehículo no encontrado' });
                }
                yield vehiculo.update({ nombre, descripcion, noChasis, noMotor, noPlaca, estado, color, anoFabricacion, kilometraje, idTipoVehiculo, idMarca, idModelo, idTipoCombustible });
                res.status(200).json(vehiculo);
            }
            catch (error) {
                console.error('Error al actualizar el vehículo:', error);
                res.status(500).json({ message: 'Error al actualizar el vehículo' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiculoId = req.params.id;
                if (!vehiculoId) {
                    return res.status(400).json({ message: 'ID de vehículo no proporcionado' });
                }
                const vehiculo = yield Vehiculo_1.Vehiculo.findByPk(vehiculoId);
                if (!vehiculo) {
                    return res.status(404).json({ message: 'Vehículo no encontrado' });
                }
                yield vehiculo.destroy();
                res.json({ message: 'Vehículo eliminado exitosamente' });
                res.status(204).end();
            }
            catch (error) {
                console.error('Error al eliminar el vehículo:', error);
                res.status(500).json({ message: 'Error al eliminar el vehículo' });
            }
        });
    }
    static uploadImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiculoId = req.params.id;
                const vehiculo = yield Vehiculo_1.Vehiculo.findByPk(vehiculoId);
                if (!vehiculo) {
                    return res.status(404).json({ error: 'Vehiculo no encontrado' });
                }
                // Verificar si se proporcionó el ID de vehículo en la solicitud
                if (!vehiculoId) {
                    return res.status(400).json({ message: 'ID de vehículo no proporcionado' });
                }
                if (!req.file) {
                    return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
                }
                const image = req.file;
                const imageName = `${vehiculoId}-${Date.now()}-${image.originalname}`;
                // Subir la imagen al contenedor 'marcas' en Azure Blob Storage
                yield new Promise((resolve, reject) => {
                    blobService.createBlockBlobFromText('vehiculos', imageName, image.buffer, { contentSettings: { contentType: image.mimetype } }, (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            // URL de la imagen después de subirla
                            const imageUrl = `https://rentcarrr.blob.core.windows.net/vehiculos/${imageName}`;
                            vehiculo.imagenes = imageUrl;
                            vehiculo.save();
                            resolve();
                        }
                    });
                });
                res.status(200).json({ imageUrl: vehiculo.imagenes });
            }
            catch (error) {
                console.error('Error al subir imágenes:', error);
                res.status(500).json({ message: 'Error al subir imágenes' });
            }
        });
    }
    static getImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiculoId = req.params.id;
                // Verificar si se proporcionó el ID de vehículo en la solicitud
                if (!vehiculoId) {
                    return res.status(400).json({ message: 'ID de vehículo no proporcionado' });
                }
                // Buscar el vehículo por su ID
                const vehiculo = yield Vehiculo_1.Vehiculo.findByPk(vehiculoId);
                if (!vehiculo) {
                    return res.status(404).json({ message: 'Vehículo no encontrado' });
                }
                if (!vehiculo.imagenes) {
                    return res.status(404).json({ message: 'El vehiculo no tiene imagenes asociadas' });
                }
                // Separar las URL de las imágenes
                const imageUrls = vehiculo.imagenes.split(';');
                res.status(200).json({ imageUrls });
            }
            catch (error) {
                console.error('Error al obtener imágenes del vehículo:', error);
                res.status(500).json({ message: 'Error al obtener imágenes del vehículo' });
            }
        });
    }
}
exports.VehiculoController = VehiculoController;
