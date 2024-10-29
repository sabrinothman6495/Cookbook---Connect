import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

const useRecipeSearch = (delay = 300) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const searchRecipes = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        // Cancel previous request if exists
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();
        setLoading(true);
        setSearchError(null);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/recipes`,
          {
            params: { search: query },
            signal: abortControllerRef.current.signal,
          }
        );

        setSearchResults(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setSearchError(error.message);
          setSearchResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, delay),
    []
  );

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchError(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    searchResults,
    searchError,
    loading,
    searchRecipes,
    clearSearch,
  };
};

export default useRecipeSearch;
