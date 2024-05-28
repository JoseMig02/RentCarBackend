"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ModeloController_1 = require("../controllers/ModeloController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.get('/', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ModeloController_1.ModeloController.getAll);
router.get('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ModeloController_1.ModeloController.getById);
router.post('/', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ModeloController_1.ModeloController.create);
router.put('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ModeloController_1.ModeloController.update);
router.delete('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, ModeloController_1.ModeloController.delete);
router.post('/:id/image', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, upload.single('image'), ModeloController_1.ModeloController.uploadImage);
exports.default = router;
