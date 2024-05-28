"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RentaDevolucionController_1 = require("../controllers/RentaDevolucionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Ruta para crear una nueva renta
router.post('/rents', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, RentaDevolucionController_1.RentController.createRent);
// Ruta para actualizar una renta (proceso de devolución)
router.put('/rents/:id', authMiddleware_1.validateToken, authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, RentaDevolucionController_1.RentController.updateRent);
router.delete('/rents/:id', authMiddleware_1.validateToken, authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, RentaDevolucionController_1.RentController.deleteRent);
exports.default = router;
