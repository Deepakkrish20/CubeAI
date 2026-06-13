import Contact from '../models/Contact.js';

export const createContact = async (data) => {
  const contact = await Contact.create(data);
  return contact;
};
