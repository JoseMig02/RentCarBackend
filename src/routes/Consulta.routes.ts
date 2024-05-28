import express from 'express';
import { ConsultaController } from '../controllers/ConsultaController';
import { isEmployee, validateToken,isAdmin, isEmployeeOrAdmin } from '../middleware/authMiddleware';

const router = express.Router();


router.get('/rentas/cliente/:clienteId',validateToken,isEmployeeOrAdmin, ConsultaController.consultarRentasPorCliente);
router.get('/rentas/fechas',validateToken,isEmployeeOrAdmin,  ConsultaController.consultarRentasEntreFechas);
router.get('/rentas/fecha',validateToken,isEmployeeOrAdmin,  ConsultaController.consultarRentasEnFecha);
router.get('/rentas',validateToken,isEmployeeOrAdmin,  ConsultaController.consultarTodasLasRentas)
router.get('/rentas/vehiculo/:vehiculoId',validateToken,isEmployeeOrAdmin,  ConsultaController.consultarRentasPorVehiculo );

export default router;
    