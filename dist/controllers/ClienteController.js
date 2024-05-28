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
exports.ClienteController = void 0;
const Cliente_1 = require("../models/Cliente");
class ClienteController {
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, cedula, noTarjetaCR, limiteCredito, tipoPersona, estado } = req.body;
                // Verificar si el cliente ya existe
                const clienteExistente = yield Cliente_1.Cliente.findOne({ where: { cedula } });
                if (clienteExistente) {
                    return res.status(400).json({ message: 'El cliente ya está registrado' });
                }
                // Cifrar la contraseña antes de almacenarla en la base de datos
                // const hashedPassword = await bcrypt.hash(contrasena, 10);
                // Crear un nuevo cliente
                const nuevoCliente = yield Cliente_1.Cliente.create({
                    nombre,
                    cedula,
                    estado,
                    noTarjetaCR,
                    limiteCredito,
                    tipoPersona
                });
                return res.status(201).json({ message: 'Cliente registrado correctamente', cliente: nuevoCliente });
            }
            catch (error) {
                console.error('Error al registrar cliente:', error);
                return res.status(500).json({ message: 'Error al registrar cliente' });
            }
        });
    }
    // static async signIn(req: RequestWithBody, res: Response) {
    //   try {
    //     const { correo, contrasena } = req.body;
    //     // Buscar el cliente por su correo electrónico
    //     const cliente:any = await Cliente.findOne({where:{correo}})
    //     if (!cliente) {
    //       return res.status(404).json({ message: 'Cliente no encontrado' });
    //     }
    //     // Verificar si la contraseña es correcta
    //     const contrasenaValida = await bcrypt.compare(contrasena, cliente.contrasena);
    //     if (!contrasenaValida) {
    //       return res.status(401).json({ message: 'Credenciales inválidas' });
    //     }
    //     // Generar token de autenticación
    //     const token = jwt.sign({ clienteId: cliente.id }, 'clave_secreta' );
    //     return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    //   } catch (error) {
    //     console.error('Error al iniciar sesión:', error);
    //     return res.status(500).json({ message: 'Error al iniciar sesión' });
    //   }
    // }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientes = yield Cliente_1.Cliente.findAll();
                return res.status(200).json(clientes);
            }
            catch (error) {
                console.error('Error al obtener clientes:', error);
                return res.status(500).json({ message: 'Error al obtener clientes' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clienteId = req.params.id;
                const cliente = yield Cliente_1.Cliente.findByPk(clienteId);
                if (!cliente) {
                    return res.status(404).json({ message: 'Cliente no encontrado' });
                }
                return res.status(200).json(cliente);
            }
            catch (error) {
                console.error('Error al obtener cliente por ID:', error);
                return res.status(500).json({ message: 'Error al obtener cliente por ID' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clienteId = req.params.id;
                const { nombre, cedula, noTarjetaCR, limiteCredito, tipoPersona, estado } = req.body;
                const cliente = yield Cliente_1.Cliente.findByPk(clienteId);
                if (!cliente) {
                    return res.status(404).json({ message: 'Cliente no encontrado' });
                }
                yield cliente.update({ nombre, cedula, noTarjetaCR, limiteCredito, tipoPersona, estado });
                return res.status(200).json({ message: 'Cliente actualizado correctamente', cliente });
            }
            catch (error) {
                console.error('Error al actualizar cliente:', error);
                return res.status(500).json({ message: 'Error al actualizar cliente' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clienteId = req.params.id;
                const cliente = yield Cliente_1.Cliente.findByPk(clienteId);
                if (!cliente) {
                    return res.status(404).json({ message: 'Cliente no encontrado' });
                }
                yield cliente.destroy();
                return res.status(200).json({ message: 'Cliente eliminado correctamente' });
            }
            catch (error) {
                console.error('Error al eliminar cliente:', error);
                return res.status(500).json({ message: 'Error al eliminar cliente' });
            }
        });
    }
}
exports.ClienteController = ClienteController;
