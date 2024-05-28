import express from 'express';
import { TipoCombustibleController } from '../controllers/TipoCombustibleController';
import { isAdmin, isEmployee, isEmployeeOrAdmin, validateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/',validateToken,isEmployeeOrAdmin, TipoCombustibleController.getAll);
router.get('/:id',validateToken,isEmployeeOrAdmin, TipoCombustibleController.getById);
router.post('/',validateToken,isEmployeeOrAdmin, TipoCombustibleController.create);
router.put('/:id',validateToken,isEmployeeOrAdmin, TipoCombustibleController.update);
router.delete('/:id',validateToken,isEmployeeOrAdmin, TipoCombustibleController.delete);

export default router
