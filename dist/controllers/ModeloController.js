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
exports.ModeloController = void 0;
const Modelo_1 = require("../models/Modelo");
const azure_storage_1 = __importDefault(require("azure-storage"));
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=rentcarrr;AccountKey=PRzdmKwdApe6cijTpSHUh8CJoRMCOeaHEdoVPCQoHLpI1dj/5+8JnIrM3/YQgQO/Kb3EQpEc5W3H+AStoVWaYA==;EndpointSuffix=core.windows.net';
// Cliente del servicio de blobs de Azure
const blobService = azure_storage_1.default.createBlobService(connectionString);
class ModeloController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelos = yield Modelo_1.Modelo.findAll();
                res.status(200).json(modelos);
            }
            catch (error) {
                console.error('Error al obtener los modelos:', error);
                res.status(500).json({ message: 'Error al obtener los modelos' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modeloId = req.params.id;
                if (!modeloId) {
                    return res.status(400).json({ message: 'ID de modelo no proporcionado' });
                }
                const modelo = yield Modelo_1.Modelo.findByPk(modeloId);
                if (!modelo) {
                    return res.status(404).json({ message: 'Modelo no encontrado' });
                }
                res.status(200).json(modelo);
            }
            catch (error) {
                console.error('Error al obtener el modelo por ID:', error);
                res.status(500).json({ message: 'Error al obtener el modelo por ID' });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, descripcion, ano, estado, idMarca } = req.body;
                if (!nombre || !descripcion || !ano || !estado || !idMarca) {
                    return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
                }
                const nuevoModelo = yield Modelo_1.Modelo.create({ nombre, descripcion, ano, estado, idMarca });
                res.status(201).json(nuevoModelo);
            }
            catch (error) {
                console.error('Error al crear el modelo:', error);
                res.status(500).json({ message: 'Error al crear el modelo' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modeloId = req.params.id;
                if (!modeloId) {
                    return res.status(400).json({ message: 'ID de modelo no proporcionado' });
                }
                const { nombre, descripcion, ano, estado, idMarca } = req.body;
                if (!nombre || !descripcion || !ano || !estado || !idMarca) {
                    return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
                }
                const modelo = yield Modelo_1.Modelo.findByPk(modeloId);
                if (!modelo) {
                    return res.status(404).json({ message: 'Modelo no encontrado' });
                }
                yield modelo.update({ nombre, descripcion, ano, estado, idMarca });
                res.status(200).json(modelo);
            }
            catch (error) {
                console.error('Error al actualizar el modelo:', error);
                res.status(500).json({ message: 'Error al actualizar el modelo' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modeloId = req.params.id;
                if (!modeloId) {
                    return res.status(400).json({ message: 'ID de modelo no proporcionado' });
                }
                const modelo = yield Modelo_1.Modelo.findByPk(modeloId);
                if (!modelo) {
                    return res.status(404).json({ message: 'Modelo no encontrado' });
                }
                yield modelo.destroy();
                res.json({ message: 'Modelo eliminado exitosamente' });
                res.status(204).end();
            }
            catch (error) {
                console.error('Error al eliminar el modelo:', error);
                res.status(500).json({ message: 'Error al eliminar el modelo' });
            }
        });
    }
    static uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modeloId = req.params.id;
                const modelo = yield Modelo_1.Modelo.findByPk(modeloId);
                if (!modelo) {
                    return res.status(404).json({ error: 'modelo no encontrada' });
                }
                // Verificar si se proporcionó el ID de modelo en la solicitud
                if (!modeloId) {
                    return res.status(400).json({ message: 'ID de marca no proporcionado' });
                }
                // Verificar si se proporcionó una imagen en la solicitud
                if (!req.file) {
                    return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
                }
                const image = req.file;
                const imageName = `${modeloId}-${Date.now()}-${image.originalname}`;
                // Subir la imagen al contenedor 'marcas' en Azure Blob Storage
                yield new Promise((resolve, reject) => {
                    blobService.createBlockBlobFromText('modelos', imageName, image.buffer, { contentSettings: { contentType: image.mimetype } }, (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            // URL de la imagen después de subirla
                            const imageUrl = `https://rentcarrr.blob.core.windows.net/modelos/${imageName}`;
                            modelo.imagen = imageUrl;
                            modelo.save();
                            resolve();
                        }
                    });
                });
                res.status(200).json({ imageUrl: modelo.imagen });
            }
            catch (error) {
                console.error('Error al subir la imagen:', error);
                res.status(500).json({ message: 'Error al subir la imagen' });
            }
        });
    }
}
exports.ModeloController = ModeloController;
