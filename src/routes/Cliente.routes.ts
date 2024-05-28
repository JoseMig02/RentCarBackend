import express, { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { validateToken,isEmployee, isAdmin, isEmployeeOrAdmin } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Rutas para clientes
router.post('/signup', ClienteController.signUp);
// router.post('/signin', ClienteController.signIn);
router.get('/',validateToken,isEmployeeOrAdmin, ClienteController.getAll);
router.get('/:id',validateToken,isEmployeeOrAdmin, ClienteController.getById);
router.put('/:id',validateToken,isEmployeeOrAdmin, ClienteController.update);
router.delete('/:id',validateToken,isEmployeeOrAdmin, ClienteController.delete);

export default router;
