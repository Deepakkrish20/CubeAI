import * as applicationService from '../services/applicationService.js';

export const submitApplication = async (req, res, next) => {
  try {
    const application = await applicationService.createApplication(req.body);

    res.status(201).json({
      success: true,
      message: 'Loan application submitted successfully',
      data: {
        id: application._id,
        fullName: application.fullName,
        loanType: application.loanType,
        status: application.status,
      },
    });
  } catch (error) {
    next(error);
  }
};
