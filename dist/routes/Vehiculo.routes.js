"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const VehiculoController_1 = require("../controllers/VehiculoController");
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.get('/', VehiculoController_1.VehiculoController.getAll);
router.get('/:id', VehiculoController_1.VehiculoController.getById);
router.post('/', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, VehiculoController_1.VehiculoController.create);
router.put('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, VehiculoController_1.VehiculoController.update);
router.delete('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, VehiculoController_1.VehiculoController.delete);
router.post('/:id/images', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, upload.single('images'), VehiculoController_1.VehiculoController.uploadImages);
router.get('/:id/images', VehiculoController_1.VehiculoController.getImages);
exports.default = router;
