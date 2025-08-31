import apiClient from './apiClient';

// Get current user profile from API
export const fetchCurrentUser = async () => {
  const response = await apiClient.get('/users/me');
  return response.json();
};

// Update current user profile
export const updateCurrentUser = async (userData) => {
  // First get the current user to get their ID
  const currentUserResponse = await apiClient.get('/users/me');
  const currentUser = await currentUserResponse.json();
  
  if (!currentUser.user || !currentUser.user.id) {
    throw new Error('Could not get current user ID');
  }
  
  // Then update using the user ID
  const response = await apiClient.put(`/users/${currentUser.user.id}`, userData);
  return response.json();
};

// Get user by ID (admin only)
export const getUserById = async (userId) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.json();
};

// Get all users (admin only)
export const getAllUsers = async () => {
  const response = await apiClient.get('/users');
  return response.json();
};
