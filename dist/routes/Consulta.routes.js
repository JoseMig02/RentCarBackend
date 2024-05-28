"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConsultaController_1 = require("../controllers/ConsultaController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/rentas/cliente/:clienteId', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ConsultaController_1.ConsultaController.consultarRentasPorCliente);
router.get('/rentas/fechas', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ConsultaController_1.ConsultaController.consultarRentasEntreFechas);
router.get('/rentas/fecha', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ConsultaController_1.ConsultaController.consultarRentasEnFecha);
router.get('/rentas', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ConsultaController_1.ConsultaController.consultarTodasLasRentas);
router.get('/rentas/vehiculo/:vehiculoId', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ConsultaController_1.ConsultaController.consultarRentasPorVehiculo);
exports.default = router;
