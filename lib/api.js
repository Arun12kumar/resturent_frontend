const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Helper function to handle API requests
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} - Resolves with JSON response
 */
const fetchApi = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Include credentials (cookies) for all requests
  const config = {
    ...options,
    headers,
    credentials: 'include',
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || 'Request failed');
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  return response.json();
};

// Auth API functions
export const loginUser = async (credentials) => {
  return fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const registerUser = async (userData) => {
  return fetchApi('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const logoutUser = async () => {
  return fetchApi('/auth/logout', {
    method: 'POST',
  });
};

export const checkAuth = async () => {
  return fetchApi('/auth/check');
};

// Additional API functions can be added here
// For example:
export const getUserProfile = async () => {
  return fetchApi('/auth/me');
};

// Menu API functions
export const getMenuItems = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return fetchApi(`/menu?${queryString}`);
};

export const getMenuItemById = async (id) => {
  return fetchApi(`/menu/${id}`);
};

// Utility function to handle errors in components
export const handleApiError = (error, setError) => {
  console.error('API Error:', error);
  if (setError) {
    setError(error.message || 'Something went wrong');
  }
  return null;
};