import * as newsletterService from '../services/newsletterService.js';

export const subscribe = async (req, res, next) => {
  try {
    const subscription = await newsletterService.subscribeEmail(req.body.email);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: {
        id: subscription._id,
        email: subscription.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
