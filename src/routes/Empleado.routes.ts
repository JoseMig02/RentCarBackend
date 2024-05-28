import express from 'express';
import { EmpleadoController } from '../controllers/Empleadocontroller';
import { isEmployee, validateToken,isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', EmpleadoController.signUp);
router.post('/signin', EmpleadoController.signIn);
router.get('/',validateToken, isAdmin, EmpleadoController.getAll);
router.get('/:id',validateToken, isAdmin, EmpleadoController.getById);
router.put('/:id',validateToken, isAdmin, EmpleadoController.update);
router.delete('/:id',validateToken, isAdmin, EmpleadoController.delete);

export default router;
