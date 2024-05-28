import { Router } from 'express';
import { ReporteController } from '../controllers/ReporteController'; // Ajusta la importación según tu estructura de archivos
import { isAdmin, isEmployee, isEmployeeOrAdmin, validateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/reporte/fechas',validateToken,isEmployeeOrAdmin, ReporteController.generarReporteEntreFechas);
router.get('/reporte/tipo-vehiculo/:id',validateToken,isEmployeeOrAdmin, ReporteController.generarReportePorTipoVehiculo);

export default router;
