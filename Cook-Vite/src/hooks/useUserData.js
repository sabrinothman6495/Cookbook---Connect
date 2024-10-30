import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../utils/auth';

export const useUserData = (userId) => {
  const [profile, setProfile] = useState(null);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = auth.getToken();
        console.log('Token for request:', token);

        const [profileResponse, favoritesResponse, createdResponse] = await Promise.all([
          axios.get(`http://localhost:3002/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }),
          axios.get(`http://localhost:3002/api/users/${userId}/favorites`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }),
          axios.get(`http://localhost:3002/api/users/${userId}/created`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        ]);

        setProfile(profileResponse.data);
        setFavoritedRecipes(favoritesResponse.data);
        setCreatedRecipes(createdResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { profile, favoritedRecipes, createdRecipes, loading, error };
};



