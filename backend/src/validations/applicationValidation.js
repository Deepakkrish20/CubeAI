import { body } from 'express-validator';

const LOAN_TYPES = [
  'e-auto',
  'battery',
  'solar',
  'fleet',
  'e-rickshaw',
  'e-scooter',
  'used-car',
  'lap',
  'lcv',
];

export const applicationValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ max: 100 })
    .withMessage('Name must not exceed 100 characters'),
  body('mobile')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian mobile number'),
  body('service')
    .notEmpty()
    .withMessage('Service (loan type) is required')
    .isIn(LOAN_TYPES)
    .withMessage('Invalid service selected'),
  body('dob')
    .notEmpty()
    .withMessage('Date of birth is required'),
  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
];

