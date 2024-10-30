import { useState } from 'react';
import axios from 'axios';

export const useProfileUpdate = (userId) => {
  const [editedProfile, setEditedProfile] = useState({
    avatar: '',
    username: '',
    name: '',
    email: ''
  });

  const updateUserProfile = async () => {
    try {
      const response = await axios.put(`/api/users/${userId}/profile`, editedProfile);
      return response.data;
    } catch (err) {
      console.error('Failed to update profile', err);
      throw err;
    }
  };

  return { updateUserProfile, editedProfile, setEditedProfile };
};

