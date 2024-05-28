"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TipoVehiculoController_1 = require("../controllers/TipoVehiculoController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoVehiculoController_1.TipoVehiculoController.getAll);
router.get('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoVehiculoController_1.TipoVehiculoController.getById);
router.post('/', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoVehiculoController_1.TipoVehiculoController.create);
router.put('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoVehiculoController_1.TipoVehiculoController.update);
router.delete('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoVehiculoController_1.TipoVehiculoController.delete);
exports.default = router;
