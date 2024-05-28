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
exports.isEmployee = exports.isAdmin = exports.authenticate = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Cliente_1 = require("../models/Cliente");
const Empleado_1 = require("../models/Empleado");
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headertoken = req.headers['authorization'];
    if (headertoken != undefined && headertoken.startsWith('Bearer')) {
        try {
            const bearerToken = headertoken.slice(7);
            const decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            // Guardar la información del usuario en req según el tipo de usuario (cliente o empleado)
            if (decodedToken.clienteId) {
                const cliente = yield Cliente_1.Cliente.findByPk(decodedToken.clienteId);
                req.cliente = cliente;
            }
            else if (decodedToken.empleadoId) {
                const empleado = yield Empleado_1.Empleado.findByPk(decodedToken.empleadoId);
                req.empleado = empleado;
            }
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token no valido'
            });
        }
    }
    else {
        res.status(401).json('Acceso denegado');
    }
});
exports.validateToken = validateToken;
const authenticate = (req, res, next) => {
    if (req.cliente || req.empleado) {
        next();
    }
    else {
        res.status(403).json({
            msg: 'Acceso prohibido'
        });
    }
};
exports.authenticate = authenticate;
const isAdmin = (req, res, next) => {
    const empleado = req.empleado;
    if (empleado && empleado.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({
            msg: 'Acceso prohibido. Se requiere permisos de administrador.'
        });
    }
};
exports.isAdmin = isAdmin;
const isEmployee = (req, res, next) => {
    const empleado = req.empleado;
    if (empleado) {
        next();
    }
    else {
        res.status(403).json({
            msg: 'Acceso prohibido. Se requiere ser empleado.'
        });
    }
};
exports.isEmployee = isEmployee;
