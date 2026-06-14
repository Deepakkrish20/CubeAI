import { Router } from 'express';
import contactRoutes from './contactRoutes.js';
import applicationRoutes from './applicationRoutes.js';
import newsletterRoutes from './newsletterRoutes.js';
import healthRoutes from './healthRoutes.js';
import dealershipRoutes from './dealershipRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/contact', contactRoutes);
router.use('/applications', applicationRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/dealership', dealershipRoutes);

export default router;

