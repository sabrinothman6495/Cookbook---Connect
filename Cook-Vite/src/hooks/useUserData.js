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
      if (!userId) {
        console.warn('No user ID provided'); // Log if userId is not available
        setLoading(false);
        return;
      }

      try {
        const token = auth.getToken();
        console.log('Token for request:', token);

        // Fetch user data and recipes in parallel
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

        console.log('Profile Response:', profileResponse.data);
        console.log('Favorites Response:', favoritesResponse.data);
        console.log('Created Response:', createdResponse.data);

        // Update state only if data is received
        if (profileResponse.data) {
          setProfile(profileResponse.data);
        } else {
          setError('Profile not found'); // Optional: set an error message if profile is missing
        }

        // Handle empty responses gracefully
        setFavoritedRecipes(favoritesResponse.data || []); // Default to empty array
        setCreatedRecipes(createdResponse.data || []); // Default to empty array

      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { profile, favoritedRecipes, createdRecipes, loading, error };
};







