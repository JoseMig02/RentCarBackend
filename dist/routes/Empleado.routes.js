"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Empleadocontroller_1 = require("../controllers/Empleadocontroller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/signup', Empleadocontroller_1.EmpleadoController.signUp);
router.post('/signin', Empleadocontroller_1.EmpleadoController.signIn);
router.get('/', authMiddleware_1.validateToken, authMiddleware_1.isAdmin, Empleadocontroller_1.EmpleadoController.getAll);
router.get('/:id', authMiddleware_1.validateToken, authMiddleware_1.isAdmin, Empleadocontroller_1.EmpleadoController.getById);
router.put('/:id', authMiddleware_1.validateToken, authMiddleware_1.isAdmin, Empleadocontroller_1.EmpleadoController.update);
router.delete('/:id', authMiddleware_1.validateToken, authMiddleware_1.isAdmin, Empleadocontroller_1.EmpleadoController.delete);
exports.default = router;
