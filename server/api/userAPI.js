import axios from 'axios';

export const fetchUserProfile = async (userId) => {
  const response = await axios.get(`/api/users/${userId}/profile`);
  return response.data;
};

export const fetchFavoritedRecipes = async (userId) => {
  const response = await axios.get(`/api/users/${userId}/favorites`);
  return response.data;
};

export const fetchCreatedRecipes = async (userId) => {
  const response = await axios.get(`/api/users/${userId}/created`);
  return response.data;
};

export const updateProfile = async (userId, profile) => {
  const response = await axios.put(`/api/users/${userId}/profile`, profile);
  return response.data;
};
