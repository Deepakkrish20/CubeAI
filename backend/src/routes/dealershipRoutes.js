import { Router } from 'express';
import { submitDealership } from '../controllers/dealershipController.js';
import { dealershipValidation } from '../validations/dealershipValidation.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/', dealershipValidation, validate, submitDealership);

export default router;
