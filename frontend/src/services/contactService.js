import api from './api';

/**
 * Submit contact form data to the backend API.
 */
export const submitContactForm = (data) => api.post('/contact', data);
