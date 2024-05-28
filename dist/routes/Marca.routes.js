"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MarcaController_1 = require("../controllers/MarcaController");
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.get('/', MarcaController_1.MarcaController.getAll);
router.get('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, MarcaController_1.MarcaController.getById);
router.post('/', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, MarcaController_1.MarcaController.create);
router.put('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, MarcaController_1.MarcaController.update);
router.delete('/:id', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, MarcaController_1.MarcaController.delete);
router.post('/:id/image', authMiddleware_1.validateToken, authMiddleware_1.isEmployeeOrAdmin, upload.single('image'), MarcaController_1.MarcaController.uploadImage);
router.get('/:id/image', MarcaController_1.MarcaController.getImage);
exports.default = router;
