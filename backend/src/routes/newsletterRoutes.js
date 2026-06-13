import { Router } from 'express';
import { subscribe } from '../controllers/newsletterController.js';
import { newsletterValidation } from '../validations/newsletterValidation.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/', newsletterValidation, validate, subscribe);

export default router;
