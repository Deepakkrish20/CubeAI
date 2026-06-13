import { Router } from 'express';
import { submitContact } from '../controllers/contactController.js';
import { contactValidation } from '../validations/contactValidation.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/', contactValidation, validate, submitContact);

export default router;
