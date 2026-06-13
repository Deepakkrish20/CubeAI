import * as contactService from '../services/contactService.js';

export const submitContact = async (req, res, next) => {
  try {
    const contact = await contactService.createContact(req.body);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
