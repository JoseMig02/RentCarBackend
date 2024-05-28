"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReporteController_1 = require("../controllers/ReporteController"); // Ajusta la importación según tu estructura de archivos
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/reporte/fechas', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ReporteController_1.ReporteController.generarReporteEntreFechas);
router.get('/reporte/tipo-vehiculo/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ReporteController_1.ReporteController.generarReportePorTipoVehiculo);
exports.default = router;
