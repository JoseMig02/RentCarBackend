"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TipoCombustibleController_1 = require("../controllers/TipoCombustibleController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoCombustibleController_1.TipoCombustibleController.getAll);
router.get('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoCombustibleController_1.TipoCombustibleController.getById);
router.post('/', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoCombustibleController_1.TipoCombustibleController.create);
router.put('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoCombustibleController_1.TipoCombustibleController.update);
router.delete('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, TipoCombustibleController_1.TipoCombustibleController.delete);
exports.default = router;
