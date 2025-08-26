import apiClient from './apiClient';

// Register user
export const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.json();
};

// Login user
export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  const data = await response.json();
  
  if (response.ok && data.access_token) {
    // Store tokens
    apiClient.setTokens(data.access_token, data.refresh_token);
    
    // Store user data if provided
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  }
  
  return data;
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    
    // Clear tokens regardless of response
    apiClient.clearTokens();
    
    return response.json();
  } catch (error) {
    // Clear tokens even if logout fails
    apiClient.clearTokens();
    throw error;
  }
};

// Refresh token (used internally by apiClient)
export const refreshToken = async () => {
  const response = await apiClient.post('/auth/refresh', {
    refresh_token: apiClient.getRefreshToken()
  });
  
  if (response.ok) {
    const data = await response.json();
    apiClient.setTokens(data.access_token, data.refresh_token);
    return data.access_token;
  }
  
  throw new Error('Token refresh failed');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!apiClient.getAccessToken();
};

// Get current user data
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};
