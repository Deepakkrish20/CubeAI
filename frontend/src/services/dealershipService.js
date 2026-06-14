import api from './api';

/**
 * Submit dealership application data to the backend API.
 */
export const submitDealershipForm = (data) => api.post('/dealership', data);
