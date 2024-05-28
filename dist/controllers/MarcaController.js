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
exports.MarcaController = void 0;
const Marca_1 = require("../models/Marca");
const azure_storage_1 = __importDefault(require("azure-storage"));
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=rentcarrr;AccountKey=PRzdmKwdApe6cijTpSHUh8CJoRMCOeaHEdoVPCQoHLpI1dj/5+8JnIrM3/YQgQO/Kb3EQpEc5W3H+AStoVWaYA==;EndpointSuffix=core.windows.net';
// Cliente del servicio de blobs de Azure
const blobService = azure_storage_1.default.createBlobService(connectionString);
class MarcaController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const marcas = yield Marca_1.Marca.findAll();
                res.status(200).json(marcas);
            }
            catch (error) {
                console.error('Error al obtener las marcas:', error);
                res.status(500).json({ message: 'Error al obtener las marcas' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const marcaId = req.params.id;
                const marca = yield Marca_1.Marca.findByPk(marcaId);
                if (!marca) {
                    return res.status(404).json({ message: 'Marca no encontrada' });
                }
                res.status(200).json(marca);
            }
            catch (error) {
                console.error('Error al obtener la marca por ID:', error);
                res.status(500).json({ message: 'Error al obtener la marca por ID' });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, descripcion, estado } = req.body;
                const nuevaMarca = yield Marca_1.Marca.create({ nombre, descripcion, estado });
                res.status(201).json(nuevaMarca);
            }
            catch (error) {
                console.error('Error al crear la marca:', error);
                res.status(500).json({ message: 'Error al crear la marca' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const marcaId = req.params.id;
                const { nombre, descripcion, estado } = req.body;
                const marca = yield Marca_1.Marca.findByPk(marcaId);
                if (!marca) {
                    return res.status(404).json({ message: 'Marca no encontrada' });
                }
                yield marca.update({ nombre, descripcion, estado });
                res.status(200).json(marca);
            }
            catch (error) {
                console.error('Error al actualizar la marca:', error);
                res.status(500).json({ message: 'Error al actualizar la marca' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const marcaId = req.params.id;
                const marca = yield Marca_1.Marca.findByPk(marcaId);
                if (!marca) {
                    return res.status(404).json({ message: 'Marca no encontrada' });
                }
                yield marca.destroy();
                res.json({ mensaje: 'Marca eliminada exitosamente' });
                res.status(204).end();
            }
            catch (error) {
                console.error('Error al eliminar la marca:', error);
                res.status(500).json({ message: 'Error al eliminar la marca' });
            }
        });
    }
    static uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const marcaId = req.params.id;
                const marca = yield Marca_1.Marca.findByPk(marcaId);
                if (!marca) {
                    return res.status(404).json({ error: 'Marca no encontrada' });
                }
                // Verificar si se proporcionó el ID de marca en la solicitud
                if (!marcaId) {
                    return res.status(400).json({ message: 'ID de marca no proporcionado' });
                }
                // Verificar si se proporcionó una imagen en la solicitud
                if (!req.file) {
                    return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
                }
                const image = req.file;
                const imageName = `${marcaId}-${Date.now()}-${image.originalname}`;
                // Subir la imagen al contenedor 'marcas' en Azure Blob Storage
                yield new Promise((resolve, reject) => {
                    blobService.createBlockBlobFromText('marca', imageName, image.buffer, { contentSettings: { contentType: image.mimetype } }, (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            // URL de la imagen después de subirla
                            const imageUrl = `https://rentcarrr.blob.core.windows.net/marca/${imageName}`;
                            marca.imagen = imageUrl;
                            marca.save();
                            resolve();
                        }
                    });
                });
                res.status(200).json({ imageUrl: marca.imagen });
            }
            catch (error) {
                console.error('Error al subir la imagen:', error);
                res.status(500).json({ message: 'Error al subir la imagen' });
            }
        });
    }
    static getImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const marcaId = req.params.id;
                // Verificar si se proporcionó el ID de marca en la solicitud
                if (!marcaId) {
                    return res.status(400).json({ message: 'ID de marca no proporcionado' });
                }
                // Buscar la marca por su ID
                const marca = yield Marca_1.Marca.findByPk(marcaId);
                if (!marca) {
                    return res.status(404).json({ message: 'Marca no encontrada' });
                }
                if (!marca.imagen) {
                    return res.status(404).json({ message: 'La marca no tiene una imagen asociada' });
                }
                res.status(200).json({ imageUrl: marca.imagen });
            }
            catch (error) {
                console.error('Error al obtener la imagen de la marca:', error);
                res.status(500).json({ message: 'Error al obtener la imagen de la marca' });
            }
        });
    }
}
exports.MarcaController = MarcaController;
