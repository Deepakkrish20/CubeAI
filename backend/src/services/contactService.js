import Contact from '../models/Contact.js';
import { saveJsonSubmission } from '../utils/jsonStorage.js';

export const createContact = async (data) => {
  await saveJsonSubmission('contacts', data);
  const contact = await Contact.create(data);
  return contact;
};

