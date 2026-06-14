import { body } from 'express-validator';

export const dealershipValidation = [
  body('OrganisationName')
    .trim()
    .notEmpty()
    .withMessage('Organisation name is required'),
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  body('mobile')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit mobile number'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('dealerType')
    .trim()
    .notEmpty()
    .withMessage('Dealer type is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('financing')
    .trim()
    .notEmpty()
    .withMessage('Financing is required'),
  body('agreement')
    .trim()
    .notEmpty()
    .withMessage('Agreement status is required'),
  body('bank_name')
    .trim()
    .notEmpty()
    .withMessage('Bank name is required'),
  body('account_number')
    .trim()
    .notEmpty()
    .withMessage('Account number is required'),
  body('ifsc_code')
    .trim()
    .notEmpty()
    .withMessage('IFSC code is required')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage('Please enter a valid 11-digit IFSC code'),
  body('holder_name')
    .trim()
    .notEmpty()
    .withMessage('Account holder name is required'),
];
