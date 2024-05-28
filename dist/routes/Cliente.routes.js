"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClienteController_1 = require("../controllers/ClienteController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Rutas para clientes
router.post('/signup', ClienteController_1.ClienteController.signUp);
// router.post('/signin', ClienteController.signIn);
router.get('/', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ClienteController_1.ClienteController.getAll);
router.get('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ClienteController_1.ClienteController.getById);
router.put('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ClienteController_1.ClienteController.update);
router.delete('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ClienteController_1.ClienteController.delete);
exports.default = router;
