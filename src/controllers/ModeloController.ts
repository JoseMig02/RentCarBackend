import { Request, Response } from 'express';
import { Modelo } from '../models/Modelo';
import azure from 'azure-storage';

const connectionString = 'DefaultEndpointsProtocol=https;AccountName=rentcarrr;AccountKey=PRzdmKwdApe6cijTpSHUh8CJoRMCOeaHEdoVPCQoHLpI1dj/5+8JnIrM3/YQgQO/Kb3EQpEc5W3H+AStoVWaYA==;EndpointSuffix=core.windows.net';

// Cliente del servicio de blobs de Azure
const blobService = azure.createBlobService(connectionString);

interface RequestWithBody extends Request {
  body: {
    nombre: string;
    descripcion: string;
    ano: number;
    estado: 'activo' | 'inactivo';
    idMarca: number;
  };
}

class ModeloController {

  static async getAll(req: Request, res: Response) {
    try {
      const modelos = await Modelo.findAll();
      res.status(200).json(modelos);
    } catch (error) {
      console.error('Error al obtener los modelos:', error);
      res.status(500).json({ message: 'Error al obtener los modelos' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const modeloId = req.params.id;
      if (!modeloId) {
        return res.status(400).json({ message: 'ID de modelo no proporcionado' });
      }
      const modelo = await Modelo.findByPk(modeloId);
      if (!modelo) {
        return res.status(404).json({ message: 'Modelo no encontrado' });
      }
      res.status(200).json(modelo);
    } catch (error) {
      console.error('Error al obtener el modelo por ID:', error);
      res.status(500).json({ message: 'Error al obtener el modelo por ID' });
    }
  }

  static async create(req: RequestWithBody, res: Response) {
    try {
      const { nombre, descripcion, ano, estado, idMarca } = req.body;
      if (!nombre || !descripcion || !ano || !estado || !idMarca) {
        return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
      }
      const nuevoModelo = await Modelo.create({ nombre, descripcion, ano, estado, idMarca });
      res.status(201).json(nuevoModelo);
    } catch (error) {
      console.error('Error al crear el modelo:', error);
      res.status(500).json({ message: 'Error al crear el modelo' });
    }
  }

  static async update(req: RequestWithBody, res: Response) {
    try {
      const modeloId = req.params.id;
      if (!modeloId) {
        return res.status(400).json({ message: 'ID de modelo no proporcionado' });
      }
      const { nombre, descripcion, ano, estado, idMarca } = req.body;
      if (!nombre || !descripcion || !ano || !estado || !idMarca) {
        return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
      }
      const modelo = await Modelo.findByPk(modeloId);
      if (!modelo) {
        return res.status(404).json({ message: 'Modelo no encontrado' });
      }
      await modelo.update({ nombre, descripcion, ano, estado, idMarca });
      res.status(200).json(modelo);
    } catch (error) {
      console.error('Error al actualizar el modelo:', error);
      res.status(500).json({ message: 'Error al actualizar el modelo' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const modeloId = req.params.id;
      if (!modeloId) {
        return res.status(400).json({ message: 'ID de modelo no proporcionado' });
      }
      const modelo = await Modelo.findByPk(modeloId);
      if (!modelo) {
        return res.status(404).json({ message: 'Modelo no encontrado' });
      }
      await modelo.destroy();
      res.json({ message: 'Modelo eliminado exitosamente' });
      res.status(204).end();
    } catch (error) {
      console.error('Error al eliminar el modelo:', error);
      res.status(500).json({ message: 'Error al eliminar el modelo' });
    }
  }

  static async uploadImage(req: Request, res: Response) {
    try {
      const modeloId = req.params.id;
      const modelo: any = await Modelo.findByPk(modeloId);

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
      await new Promise<void>((resolve, reject) => {
        blobService.createBlockBlobFromText('modelos', imageName, image.buffer, { contentSettings: { contentType: image.mimetype } }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            // URL de la imagen después de subirla
            const imageUrl = `https://rentcarrr.blob.core.windows.net/modelos/${imageName}`;
            modelo.imagen = imageUrl;
            modelo.save();
            resolve();
          }
        });
      });

      res.status(200).json({ imageUrl: modelo.imagen });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      res.status(500).json({ message: 'Error al subir la imagen' });
    }
  }
 
}

export { ModeloController };
