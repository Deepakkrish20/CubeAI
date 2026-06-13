/**
 * Validate Indian phone number (10 digits).
 */
export const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''));

/**
 * Validate email format.
 */
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
