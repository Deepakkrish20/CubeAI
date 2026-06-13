import Application from '../models/Application.js';

export const createApplication = async (data) => {
  const application = await Application.create(data);
  return application;
};
