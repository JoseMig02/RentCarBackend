import { Request, Response } from 'express';
import { Marca } from '../models/Marca';
import azure from 'azure-storage';

const connectionString = 'DefaultEndpointsProtocol=https;AccountName=rentcarrr;AccountKey=PRzdmKwdApe6cijTpSHUh8CJoRMCOeaHEdoVPCQoHLpI1dj/5+8JnIrM3/YQgQO/Kb3EQpEc5W3H+AStoVWaYA==;EndpointSuffix=core.windows.net';

// Cliente del servicio de blobs de Azure
const blobService = azure.createBlobService(connectionString);


interface RequestWithBody extends Request {
  body: {
    nombre: string;
    descripcion: string;
    estado: 'activo' | 'inactivo';
  };
}

class MarcaController {

  static async getAll(req: Request, res: Response) {
    try {
      const marcas = await Marca.findAll();
      res.status(200).json(marcas);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
      res.status(500).json({ message: 'Error al obtener las marcas' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const marcaId = req.params.id;
      const marca = await Marca.findByPk(marcaId);
      if (!marca) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
      res.status(200).json(marca);
    } catch (error) {
      console.error('Error al obtener la marca por ID:', error);
      res.status(500).json({ message: 'Error al obtener la marca por ID' });
    }
  }

  static async create(req: RequestWithBody, res: Response) {
    try {
      const { nombre, descripcion, estado } = req.body;
      const nuevaMarca = await Marca.create({ nombre, descripcion, estado });
      res.status(201).json(nuevaMarca);
    } catch (error) {
      console.error('Error al crear la marca:', error);
      res.status(500).json({ message: 'Error al crear la marca' });
    }
  }

  static async update(req: RequestWithBody, res: Response) {
    try {
      const marcaId = req.params.id;
      const { nombre, descripcion, estado } = req.body;
      const marca = await Marca.findByPk(marcaId);
      if (!marca) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
      await marca.update({ nombre, descripcion, estado });
      res.status(200).json(marca);
    } catch (error) {
      console.error('Error al actualizar la marca:', error);
      res.status(500).json({ message: 'Error al actualizar la marca' });
    }
  }

static  async delete(req: Request, res: Response) {
    try {
      const marcaId = req.params.id;
      const marca = await Marca.findByPk(marcaId);
      if (!marca) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
      await marca.destroy();
      res.json({ mensaje: 'Marca eliminada exitosamente' });
      res.status(204).end();
    } catch (error) {
      console.error('Error al eliminar la marca:', error);
      res.status(500).json({ message: 'Error al eliminar la marca' });
    }
  }
  static async uploadImage(req: Request, res: Response) {
    try {
      const marcaId = req.params.id;
      const marca: any = await Marca.findByPk(marcaId);

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
      await new Promise<void>((resolve, reject) => {
        blobService.createBlockBlobFromText('marca', imageName, image.buffer, { contentSettings: { contentType: image.mimetype } }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            // URL de la imagen después de subirla
            const imageUrl = `https://rentcarrr.blob.core.windows.net/marca/${imageName}`;
            marca.imagen = imageUrl;
            marca.save();
            resolve();
          }
        });
      });

      res.status(200).json({ imageUrl: marca.imagen });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      res.status(500).json({ message: 'Error al subir la imagen' });
    }
  }

  static async getImage(req: Request, res: Response) {
    try {
      const marcaId = req.params.id;

      // Verificar si se proporcionó el ID de marca en la solicitud
      if (!marcaId) {
        return res.status(400).json({ message: 'ID de marca no proporcionado' });
      }

      // Buscar la marca por su ID
      const marca: any = await Marca.findByPk(marcaId);
      if (!marca) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
      if (!marca.imagen) {
        return res.status(404).json({ message: 'La marca no tiene una imagen asociada' });
      }

      res.status(200).json({ imageUrl: marca.imagen });
    } catch (error) {
      console.error('Error al obtener la imagen de la marca:', error);
      res.status(500).json({ message: 'Error al obtener la imagen de la marca' });
    }
  }
 
}

export { MarcaController };
