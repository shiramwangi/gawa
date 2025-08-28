import apiClient from './apiClient';

// Get all meals
export const getMeals = async () => {
  const response = await apiClient.get('/meals');
  return response.json();
};

// Get meal by ID
export const getMealById = async (mealId) => {
  const response = await apiClient.get(`/meals/${mealId}`);
  return response.json();
};

// Create new meal
export const createMeal = async (mealData) => {
  const response = await apiClient.post('/meals', mealData);
  return response.json();
};

// Update meal
export const updateMeal = async (mealId, mealData) => {
  const response = await apiClient.put(`/meals/${mealId}`, mealData);
  return response.json();
};

// Delete meal
export const deleteMeal = async (mealId) => {
  const response = await apiClient.delete(`/meals/${mealId}`);
  return response.json();
};
