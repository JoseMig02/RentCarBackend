import express from 'express';
import { InspeccionController } from '../controllers/InspeccionController';
import { isAdmin,  isEmployeeOrAdmin, validateToken } from '../middleware/authMiddleware';


const router = express.Router();

// Rutas para inspecciones
router.post('/inspecciones', validateToken,isEmployeeOrAdmin, InspeccionController.createInspeccion);
router.get('/inspecciones', validateToken,isEmployeeOrAdmin, InspeccionController.getInspecciones);
router.get('/inspecciones/:id', validateToken,isEmployeeOrAdmin, InspeccionController.getInspeccionById);
router.put('/inspecciones/:id', validateToken,isEmployeeOrAdmin, InspeccionController.updateInspeccion);
router.delete('/inspecciones/:id', validateToken,isEmployeeOrAdmin, InspeccionController.deleteInspeccion);

export default router;
