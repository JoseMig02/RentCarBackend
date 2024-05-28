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
exports.EmpleadoController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Empleado_1 = require("../models/Empleado");
class EmpleadoController {
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, cedula, correo, contrasena, tandaLabor, porcentajeComision, fechaIngreso } = req.body;
                // Verificar si el empleado ya existe
                const empleadoExistente = yield Empleado_1.Empleado.findOne({ where: { correo } });
                if (empleadoExistente) {
                    return res.status(400).json({ message: 'El empleado ya está registrado' });
                }
                // Cifrar la contraseña antes de almacenarla en la base de datos
                const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
                // Crear un nuevo empleado
                const nuevoEmpleado = yield Empleado_1.Empleado.create({
                    nombre,
                    cedula,
                    correo,
                    contrasena: hashedPassword,
                    tandaLabor,
                    porcentajeComision,
                    fechaIngreso,
                });
                return res.status(201).json({ message: 'Empleado registrado correctamente', empleado: nuevoEmpleado });
            }
            catch (error) {
                console.error('Error al registrar empleado:', error);
                return res.status(500).json({ message: 'Error al registrar empleado' });
            }
        });
    }
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { correo, contrasena } = req.body;
                // Buscar el empleado por su correo electrónico
                const empleado = yield Empleado_1.Empleado.findOne({ where: { correo } });
                if (!empleado) {
                    return res.status(404).json({ message: 'Empleado no encontrado' });
                }
                // Verificar si la contraseña es correcta
                const contrasenaValida = yield bcrypt_1.default.compare(contrasena, empleado.contrasena);
                if (!contrasenaValida) {
                    return res.status(401).json({ message: 'Credenciales inválidas' });
                }
                // Generar token de autenticación
                const token = jsonwebtoken_1.default.sign({ empleadoId: empleado.id, role: empleado.role }, 'clave_secreta');
                return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
            }
            catch (error) {
                console.error('Error al iniciar sesión:', error);
                return res.status(500).json({ message: 'Error al iniciar sesión' });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleados = yield Empleado_1.Empleado.findAll();
                return res.status(200).json(empleados);
            }
            catch (error) {
                console.error('Error al obtener empleados:', error);
                return res.status(500).json({ message: 'Error al obtener empleados' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleadoId = req.params.id;
                const empleado = yield Empleado_1.Empleado.findByPk(empleadoId);
                if (!empleado) {
                    return res.status(404).json({ message: 'Empleado no encontrado' });
                }
                return res.status(200).json(empleado);
            }
            catch (error) {
                console.error('Error al obtener empleado por ID:', error);
                return res.status(500).json({ message: 'Error al obtener empleado por ID' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleadoId = req.params.id;
                const { nombre, cedula, correo, tandaLabor, porcentajeComision, fechaIngreso, role, estado } = req.body;
                const empleado = yield Empleado_1.Empleado.findByPk(empleadoId);
                if (!empleado) {
                    return res.status(404).json({ message: 'Empleado no encontrado' });
                }
                yield empleado.update({ nombre, cedula, correo, tandaLabor, porcentajeComision, fechaIngreso, role, estado });
                return res.status(200).json({ message: 'Empleado actualizado correctamente', empleado });
            }
            catch (error) {
                console.error('Error al actualizar empleado:', error);
                return res.status(500).json({ message: 'Error al actualizar empleado' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleadoId = req.params.id;
                const empleado = yield Empleado_1.Empleado.findByPk(empleadoId);
                if (!empleado) {
                    return res.status(404).json({ message: 'Empleado no encontrado' });
                }
                yield empleado.destroy();
                return res.status(200).json({ message: 'Empleado eliminado correctamente' });
            }
            catch (error) {
                console.error('Error al eliminar empleado:', error);
                return res.status(500).json({ message: 'Error al eliminar empleado' });
            }
        });
    }
}
exports.EmpleadoController = EmpleadoController;
