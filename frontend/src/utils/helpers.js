/**
 * Format a date string to a readable format
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format a date with time
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate text to a specified length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 80) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Get CSS class for message status
 * @param {string} status
 * @returns {string}
 */
export const getStatusBadgeClass = (status) => {
  const classes = {
    new: 'badge-new',
    read: 'badge-read',
    replied: 'badge-replied',
    active: 'badge-active',
    inactive: 'badge-inactive',
    superadmin: 'badge-superadmin',
    admin: 'badge-admin',
  };
  return classes[status] || 'badge-read';
};

/**
 * Get human-readable status label
 * @param {string} status
 * @returns {string}
 */
export const getStatusLabel = (status) => {
  const labels = {
    new: 'New',
    read: 'Read',
    replied: 'Replied',
    active: 'Active',
    inactive: 'Inactive',
    superadmin: 'Superadmin',
    admin: 'Admin',
  };
  return labels[status] || status;
};

/**
 * Validate email address
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

/**
 * Validate phone number (basic)
 * @param {string} phone
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
  if (!phone) return true; // phone is optional
  return /^[+]?[\d\s\-().]{7,20}$/.test(phone);
};

/**
 * Debounce a function call
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Capitalize first letter of each word
 * @param {string} str
 * @returns {string}
 */
export const titleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
};

/**
 * Get user initials from username
 * @param {string} username
 * @returns {string}
 */
export const getInitials = (username) => {
  if (!username) return 'A';
  return username.substring(0, 2).toUpperCase();
};
