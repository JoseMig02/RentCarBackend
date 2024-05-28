import express from 'express';
import { RentController } from '../controllers/RentaDevolucionController';
import { isAdmin, isEmployee, isEmployeeOrAdmin, validateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Ruta para crear una nueva renta
router.post('/rents' ,validateToken,isEmployeeOrAdmin, RentController.createRent);

// Ruta para actualizar una renta (proceso de devolución)
router.put('/rents/:id', validateToken,validateToken,isEmployeeOrAdmin, RentController.updateRent);
router.delete('/rents/:id', validateToken,validateToken,isEmployeeOrAdmin, RentController.deleteRent);

export default router;
