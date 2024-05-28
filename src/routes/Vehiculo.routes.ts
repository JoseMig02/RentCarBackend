import express from 'express';
import { VehiculoController } from '../controllers/VehiculoController';
import multer from 'multer';
import { validateToken, isAdmin, isEmployee, isEmployeeOrAdmin } from '../middleware/authMiddleware';


const router = express.Router();
const upload = multer();


router.get('/', VehiculoController.getAll);
router.get('/:id', VehiculoController.getById);
router.post('/',validateToken,isEmployeeOrAdmin, VehiculoController.create);
router.put('/:id',validateToken,isEmployeeOrAdmin, VehiculoController.update);
router.delete('/:id',validateToken,isEmployeeOrAdmin, VehiculoController.delete);
router.post('/:id/images',validateToken,isEmployeeOrAdmin, upload.single('images'), VehiculoController.uploadImages);
router.get('/:id/images', VehiculoController.getImages);

export default router;
