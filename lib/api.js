const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchApi = async (endpoint, options = {}) => {
  // Validate API base URL
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    credentials: 'include',
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Handle non-2xx responses
    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        errorData.message = await response.text() || 'Request failed';
      }
      
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    return response.json();
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError) {
      throw new Error(`Network error: ${error.message}`);
    }
    throw error;
  }
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