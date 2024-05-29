import { Request, Response } from 'express';
import { Vehiculo } from '../models/Vehiculo';
import multer from 'multer';
import azure from 'azure-storage';

// Cadena de conexión al servicio de almacenamiento de blobs de Azure
const connectionString:any = 'DefaultEndpointsProtocol=https;AccountName=rentcarrr;AccountKey=PRzdmKwdApe6cijTpSHUh8CJoRMCOeaHEdoVPCQoHLpI1dj/5+8JnIrM3/YQgQO/Kb3EQpEc5W3H+AStoVWaYA==;EndpointSuffix=core.windows.net';
// Cliente del servicio de blobs de Azure
const blobService = azure.createBlobService(connectionString);




interface RequestWithBody extends Request {
  body: {
    nombre: string;
    descripcion: string; 
    noChasis: string;
    noMotor: string;
    noPlaca: string;
    estado: 'disponible' | 'alquilado' | 'mantenimiento';
    color?: string; 
    anoFabricacion?: number;
    kilometraje?: number;
    idTipoVehiculo: number;
    idMarca: number;
    idModelo: number;
    idTipoCombustible: number;
  };
}



class VehiculoController {

  static async getAll(req: Request, res: Response) {
    try {
      const vehiculos = await Vehiculo.findAll();
      res.status(200).json(vehiculos);
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
      res.status(500).json({ message: 'Error al obtener los vehículos' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const vehiculoId = req.params.id;
      if (!vehiculoId) {
        return res.status(400).json({ message: 'ID de vehículo no proporcionado' });
      }
      const vehiculo = await Vehiculo.findByPk(vehiculoId);
      if (!vehiculo) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      res.status(200).json(vehiculo);
    } catch (error) {
      console.error('Error al obtener el vehículo por ID:', error);
      res.status(500).json({ message: 'Error al obtener el vehículo por ID' });
    }
  }

  static async create(req: RequestWithBody, res: Response) {
    try {
      const { nombre, descripcion, noChasis, noMotor, noPlaca, estado, color, anoFabricacion, kilometraje, idTipoVehiculo, idMarca, idModelo, idTipoCombustible } = req.body;
      if (!nombre || !descripcion || !noChasis || !noMotor || !noPlaca || !estado || !idTipoVehiculo || !idMarca || !idModelo || !idTipoCombustible) {
        return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
      }
      const nuevoVehiculo = await Vehiculo.create({ nombre, descripcion, noChasis, noMotor, noPlaca, estado, color, anoFabricacion, kilometraje, idTipoVehiculo, idMarca, idModelo, idTipoCombustible });
   
      res.status(201).json(nuevoVehiculo);
    } catch (error) {
      console.error('Error al crear el vehículo:', error);
      res.status(500).json({ message: 'Error al crear el vehículo' });
    }
  }

  static async update(req: RequestWithBody, res: Response) {
    try {
      const vehiculoId = req.params.id;
      if (!vehiculoId) {
        return res.status(400).json({ message: 'ID de vehículo no proporcionado' });
      }
      const { nombre, descripcion, noChasis, noMotor, noPlaca, estado, color, anoFabricacion, kilometraje, idTipoVehiculo, idMarca, idModelo, idTipoCombustible } = req.body;
      if (!nombre || !descripcion || !noChasis || !noMotor || !noPlaca || !estado || !idTipoVehiculo || !idMarca || !idModelo || !idTipoCombustible) {
        return res.status(400).json({ message: 'Faltan campos obligatorios en la solicitud' });
      }
      const vehiculo = await Vehiculo.findByPk(vehiculoId);
      if (!vehiculo) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      await vehiculo.update({ nombre, descripcion, noChasis, noMotor, noPlaca, estado, color, anoFabricacion, kilometraje, idTipoVehiculo, idMarca, idModelo, idTipoCombustible });
      res.status(200).json(vehiculo);
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
      res.status(500).json({ message: 'Error al actualizar el vehículo' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const vehiculoId = req.params.id;
      if (!vehiculoId) {
        return res.status(400).json({ message: 'ID de vehículo no proporcionado' });
      }
      const vehiculo = await Vehiculo.findByPk(vehiculoId);
      if (!vehiculo) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      await vehiculo.destroy();
      res.json({ message: 'Vehículo eliminado exitosamente' });
      res.status(204).end();
    } catch (error) {
      console.error('Error al eliminar el vehículo:', error);
      res.status(500).json({ message: 'Error al eliminar el vehículo' });
    }
  }

  static async uploadImages(req: Request, res: Response) {
    try {
      const vehiculoId = req.params.id;
      const vehiculo:any = await Vehiculo.findByPk(vehiculoId);

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
      await new Promise<void>((resolve, reject) => {
        blobService.createBlockBlobFromText('vehiculos', imageName, image.buffer, { contentSettings: { contentType: image.mimetype } }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            // URL de la imagen después de subirla
            const imageUrl = `https://rentcarrr.blob.core.windows.net/vehiculos/${imageName}`;
            vehiculo.imagenes = imageUrl;
            vehiculo.save();
            resolve();
          }
        });
      });


    
      res.status(200).json({ imageUrl: vehiculo.imagenes });
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      res.status(500).json({ message: 'Error al subir imágenes' });
    }
  }

  static async getImages(req: Request, res: Response) {
    try {
      const vehiculoId = req.params.id;

      // Verificar si se proporcionó el ID de vehículo en la solicitud
      if (!vehiculoId) {
        return res.status(400).json({ message: 'ID de vehículo no proporcionado' });
      }

      // Buscar el vehículo por su ID
      const vehiculo:any = await Vehiculo.findByPk(vehiculoId);
      if (!vehiculo) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      if(!vehiculo.imagenes){
        return res.status(404).json({ message: 'El vehiculo no tiene imagenes asociadas' });
      }

      // Separar las URL de las imágenes
      const imageUrls: string[] = vehiculo.imagenes.split(';');

      res.status(200).json({ imageUrls });
    } catch (error) {
      console.error('Error al obtener imágenes del vehículo:', error);
      res.status(500).json({ message: 'Error al obtener imágenes del vehículo' });
    }
  }
  

}

export { VehiculoController };
