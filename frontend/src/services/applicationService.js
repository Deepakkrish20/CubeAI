import api from './api';

/**
 * Submit loan application data to the backend API.
 */
export const submitLoanApplication = (data) => api.post('/applications', data);
