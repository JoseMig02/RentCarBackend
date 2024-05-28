import express from 'express';
import { TipoVehiculoController } from '../controllers/TipoVehiculoController';
import { validateToken, isAdmin, isEmployee, isEmployeeOrAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/',validateToken,isEmployeeOrAdmin, TipoVehiculoController.getAll);
router.get('/:id',validateToken,isEmployeeOrAdmin, TipoVehiculoController.getById);
router.post('/', validateToken,isEmployeeOrAdmin, TipoVehiculoController.create);
router.put('/:id',validateToken,isEmployeeOrAdmin, TipoVehiculoController.update);
router.delete('/:id',validateToken,isEmployeeOrAdmin, TipoVehiculoController.delete);

export default router ;
