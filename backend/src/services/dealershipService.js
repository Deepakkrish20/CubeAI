import Dealership from '../models/Dealership.js';
import { saveJsonSubmission } from '../utils/jsonStorage.js';

/**
 * Creates a dealership application in MongoDB and saves it to a JSON file.
 * 
 * @param {object} data - Dealership form data
 * @returns {object} Created dealership document
 */
export const createDealership = async (data) => {
  // Save as JSON file
  await saveJsonSubmission('dealerships', data);
  
  // Save to MongoDB
  const dealership = await Dealership.create(data);
  return dealership;
};
