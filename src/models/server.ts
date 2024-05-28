import express, {Application} from "express"
import cors from 'cors'

//models
import { Marca } from "./Marca";
import { TipoVehiculo } from "./TipoVehiculo";
import { Modelo } from "./Modelo";
import { TipoCombustible } from "./TipoCombustible";
import { Vehiculo } from "./Vehiculo";
import { Empleado } from "./Empleado";
import { Cliente } from "./Cliente";
import {Inspeccion} from "./Inspeccion";
import { RentaDevolucion } from "./RentaDevolucion";
//Routes
import tipoVehiculoRoutes from '../routes/TipoVehiculo.routes'; 
import marcaRoutes from '../routes/Marca.routes';
import modeloRoutes from '../routes/Modelo.routes';
import TipoCombustibleRoutes from '../routes/TipoCombustible.routes'
import VehiculoRoutes from '../routes/Vehiculo.routes'
import clienteRoutes from '../routes/Cliente.routes';
import EmpleadosRoutes from  '../routes/Empleado.routes'
import inspeccionRoutes from '../routes/Inspeccion.routes'
import RentaDevolucionRoutes from "../routes/RentaDevolucion.routes";
import Consultas from '../routes/Consulta.routes'
import Reportes from '../routes/Reporte.routes'

class server {

    private app:Application;
    private port: number; 
 
    constructor(){
        this.app= express();
        this.port=3500;
        this.listen();
        this.midlewares();
        this.routes();
        this.dbconnect();

    }

listen(){
        this.app.listen(this.port, ()=>{
            console.log('Aplicacion corriendo en el puerto '+this.port)

        })
    }
 midlewares() {
        // Parseo body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Configurar cabeceras y cors
    this.app.use(cors());
           
    } 

    routes(){

        this.app.use('/api/tipoVehiculos', tipoVehiculoRoutes);
        this.app.use('/api/marca',marcaRoutes);
        this.app.use('/api/modelo',modeloRoutes);
        this.app.use('/api/tipoCombustible',TipoCombustibleRoutes);
        this.app.use('/api/vehiculo',VehiculoRoutes);
        this.app.use('/api/clientes', clienteRoutes);
        this.app.use('/api/empleados', EmpleadosRoutes);
        this.app.use('/api/inspeccion', inspeccionRoutes);
        this.app.use('/api/renta', RentaDevolucionRoutes);
        this.app.use('/api/consulta', Consultas);
        this.app.use('/api/reportes', Reportes);
   
   
   
   }

 
async dbconnect() { 
    try {
        await Marca.sync();
        await TipoVehiculo.sync();
        await Modelo.sync();
        await TipoCombustible.sync(); 
        await Vehiculo.sync();
        await Empleado.sync(); 
        await Cliente.sync();
        await Inspeccion.sync();  
        await RentaDevolucion.sync();
    
        console.log('Conexión exitosa a la base de datos y sincronización de modelos completa');
    } catch (err) {
        console.error('Error al conectar y sincronizar modelos:', err);
    }
}
}

export default server
  