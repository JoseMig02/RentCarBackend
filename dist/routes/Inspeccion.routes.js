"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InspeccionController_1 = require("../controllers/InspeccionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Rutas para inspecciones
router.post('/inspecciones', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, InspeccionController_1.InspeccionController.createInspeccion);
router.get('/inspecciones', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, InspeccionController_1.InspeccionController.getInspecciones);
router.get('/inspecciones/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, InspeccionController_1.InspeccionController.getInspeccionById);
router.put('/inspecciones/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, InspeccionController_1.InspeccionController.updateInspeccion);
router.delete('/inspecciones/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, InspeccionController_1.InspeccionController.deleteInspeccion);
exports.default = router;
