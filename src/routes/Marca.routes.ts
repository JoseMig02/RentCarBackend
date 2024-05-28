import express from 'express';
import { MarcaController } from '../controllers/MarcaController';
import multer from 'multer';
import { isEmployee, validateToken, isAdmin, isEmployeeOrAdmin } from '../middleware/authMiddleware';


const upload = multer();

const router = express.Router();

router.get('/', MarcaController.getAll);
router.get('/:id',validateToken,isEmployeeOrAdmin, MarcaController.getById);
router.post('/', validateToken,isEmployeeOrAdmin, MarcaController.create);
router.put('/:id', validateToken,isEmployeeOrAdmin, MarcaController.update);
router.delete('/:id', validateToken,isEmployeeOrAdmin, MarcaController.delete);
router.post('/:id/image', validateToken,isEmployeeOrAdmin, upload.single('image'), MarcaController.uploadImage);
router.get('/:id/image',  MarcaController.getImage);

export default router
