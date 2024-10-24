import { useState } from 'react';
import axios from 'axios';

const useRecipeSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);

  const searchRecipes = async (query) => {
    try {
      const response = await axios.get(`/api/recipes?search=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      setSearchError(error.message);
    }
  };

  return { searchResults, searchRecipes, searchError };
};

export default useRecipeSearch;