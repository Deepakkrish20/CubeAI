import { Router } from 'express';
import { submitApplication } from '../controllers/applicationController.js';
import { applicationValidation } from '../validations/applicationValidation.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/', applicationValidation, validate, submitApplication);

export default router;
