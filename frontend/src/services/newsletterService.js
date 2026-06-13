import api from './api';

/**
 * Subscribe an email to the newsletter.
 */
export const subscribeNewsletter = (data) => api.post('/newsletter', data);
