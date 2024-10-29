import axios from 'axios';

const API_BASE_URL = '/api/users';

const handleApiError = (error) => {
  const message = error.response?.data?.message || error.message;
  throw new Error(message);
};

export const userAPI = {
  async fetchUserProfile(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}/profile`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async fetchFavoritedRecipes(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}/favorites`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async fetchCreatedRecipes(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}/created`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async updateProfile(userId, profile) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${userId}/profile`, profile);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};

export default userAPI;

