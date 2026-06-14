import * as dealershipService from '../services/dealershipService.js';

/**
 * Handle dealership form submission.
 */
export const submitDealership = async (req, res, next) => {
  try {
    const dealership = await dealershipService.createDealership(req.body);

    res.status(201).json({
      success: true,
      message: 'Dealership application submitted successfully',
      data: {
        id: dealership._id,
        fullName: dealership.fullName,
        OrganisationName: dealership.OrganisationName,
        status: dealership.status,
      },
    });
  } catch (error) {
    next(error);
  }
};
