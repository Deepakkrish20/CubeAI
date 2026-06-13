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
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian phone number'),
  body('loanType')
    .notEmpty()
    .withMessage('Loan type is required')
    .isIn(LOAN_TYPES)
    .withMessage('Invalid loan type'),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isInt({ min: 10000 })
    .withMessage('Minimum loan amount is INR 10,000'),
];
