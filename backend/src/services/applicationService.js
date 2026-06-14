import Application from '../models/Application.js';
import { saveJsonSubmission } from '../utils/jsonStorage.js';

export const createApplication = async (data) => {
  await saveJsonSubmission('applications', data);
  const application = await Application.create(data);
  return application;
};

