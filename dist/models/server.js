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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//models
const Marca_1 = require("./Marca");
const TipoVehiculo_1 = require("./TipoVehiculo");
const Modelo_1 = require("./Modelo");
const TipoCombustible_1 = require("./TipoCombustible");
const Vehiculo_1 = require("./Vehiculo");
const Empleado_1 = require("./Empleado");
const Cliente_1 = require("./Cliente");
const Inspeccion_1 = require("./Inspeccion");
const RentaDevolucion_1 = require("./RentaDevolucion");
//Routes
const TipoVehiculo_routes_1 = __importDefault(require("../routes/TipoVehiculo.routes"));
const Marca_routes_1 = __importDefault(require("../routes/Marca.routes"));
const Modelo_routes_1 = __importDefault(require("../routes/Modelo.routes"));
const TipoCombustible_routes_1 = __importDefault(require("../routes/TipoCombustible.routes"));
const Vehiculo_routes_1 = __importDefault(require("../routes/Vehiculo.routes"));
const Cliente_routes_1 = __importDefault(require("../routes/Cliente.routes"));
const Empleado_routes_1 = __importDefault(require("../routes/Empleado.routes"));
const Inspeccion_routes_1 = __importDefault(require("../routes/Inspeccion.routes"));
const RentaDevolucion_routes_1 = __importDefault(require("../routes/RentaDevolucion.routes"));
const Consulta_routes_1 = __importDefault(require("../routes/Consulta.routes"));
const Reporte_routes_1 = __importDefault(require("../routes/Reporte.routes"));
class server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 3500;
        this.listen();
        this.midlewares();
        this.routes();
        this.dbconnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }
    midlewares() {
        // Parseo body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Configurar cabeceras y cors
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/tipoVehiculos', TipoVehiculo_routes_1.default);
        this.app.use('/api/marca', Marca_routes_1.default);
        this.app.use('/api/modelo', Modelo_routes_1.default);
        this.app.use('/api/tipoCombustible', TipoCombustible_routes_1.default);
        this.app.use('/api/vehiculo', Vehiculo_routes_1.default);
        this.app.use('/api/clientes', Cliente_routes_1.default);
        this.app.use('/api/empleados', Empleado_routes_1.default);
        this.app.use('/api/inspeccion', Inspeccion_routes_1.default);
        this.app.use('/api/renta', RentaDevolucion_routes_1.default);
        this.app.use('/api/consulta', Consulta_routes_1.default);
        this.app.use('/api/reportes', Reporte_routes_1.default);
    }
    dbconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Marca_1.Marca.sync();
                yield TipoVehiculo_1.TipoVehiculo.sync();
                yield Modelo_1.Modelo.sync();
                yield TipoCombustible_1.TipoCombustible.sync();
                yield Vehiculo_1.Vehiculo.sync();
                yield Empleado_1.Empleado.sync();
                yield Cliente_1.Cliente.sync();
                yield Inspeccion_1.Inspeccion.sync();
                yield RentaDevolucion_1.RentaDevolucion.sync();
                console.log('Conexión exitosa a la base de datos y sincronización de modelos completa');
            }
            catch (err) {
                console.error('Error al conectar y sincronizar modelos:', err);
            }
        });
    }
}
exports.default = server;
