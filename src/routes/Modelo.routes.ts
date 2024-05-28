import express from 'express';
import { ModeloController } from '../controllers/ModeloController';
import { isAdmin, isEmployee, isEmployeeOrAdmin, validateToken } from '../middleware/authMiddleware';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router.get('/', validateToken,isEmployeeOrAdmin, ModeloController.getAll);
router.get('/:id', validateToken,isEmployeeOrAdmin, ModeloController.getById);
router.post('/', validateToken,isEmployeeOrAdmin, ModeloController.create);
router.put('/:id', validateToken,isEmployeeOrAdmin, ModeloController.update);
router.delete('/:id', validateToken,isEmployeeOrAdmin, ModeloController.delete);
router.post('/:id/image', validateToken,isEmployeeOrAdmin, upload.single('image'), ModeloController.uploadImage);

export default router;
