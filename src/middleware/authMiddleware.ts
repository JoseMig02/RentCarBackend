import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Cliente } from '../models/Cliente';
import { Empleado } from '../models/Empleado';

declare global {
    namespace Express {
        interface Request {
            cliente?: any; // Definimos la propiedad cliente opcional en el objeto Request
            empleado?: any; // Definimos la propiedad empleado opcional en el objeto Request
        }
    }
}

const  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const headertoken = req.headers['authorization'];

    if (headertoken != undefined && headertoken.startsWith('Bearer')) {
        try {
            const bearerToken = headertoken.slice(7);
            const decodedToken = jwt.verify(bearerToken, 'clave_secreta'|| 'pepito123') as any;
            
            // Guardar la información del usuario en req según el tipo de usuario (cliente o empleado)
            if (decodedToken.clienteId) {
                const cliente = await Cliente.findByPk(decodedToken.clienteId);
                req.cliente = cliente;
            } else if (decodedToken.empleadoId) {
                const empleado = await Empleado.findByPk(decodedToken.empleadoId);
                req.empleado = empleado;
            }
            
            next();
            
        } catch (error) {
            res.status(401).json({
                msg: 'Token no valido'
            });            
        }
    } else {
        res.status(401).json(
            {  msg: 'Acceso denegado'}
        );
    }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (req.cliente || req.empleado) {
        next();
    } else {
        res.status(403).json({
            msg: 'Acceso prohibido'
        });
    }
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const empleado = req.empleado;
    if (empleado && empleado.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            msg: 'Acceso prohibido. Se requiere permisos de administrador.'
        });
    }
}

const isEmployee = (req: Request, res: Response, next: NextFunction) => {
    const empleado = req.empleado;
    console.log(empleado)
    if (empleado && empleado.role === 'empleado') {
        next();
    } else {
        res.status(403).json({
            msg: 'Acceso prohibido. Se requiere ser empleado. Contacte al administrador'
        });
    }
}

const isEmployeeOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const empleado = req.empleado;
    if (empleado && (empleado.role === 'empleado' || empleado.role === 'admin')) {
        next();
    } else {
        res.status(403).json({
            msg: 'Acceso prohibido. Se requiere ser empleado o administrador. Contacte al administrador'
        });
    }
}

export { validateToken, authenticate, isAdmin, isEmployee, isEmployeeOrAdmin };
