import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('/api/recipes');
      setRecipes(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const recipeOperations = {
    addRecipe: async (newRecipe) => {
      try {
        const response = await axios.post('/api/recipes', newRecipe);
        setRecipes(prev => [...prev, response.data]);
        return response.data;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },

    updateRecipe: async (id, updatedRecipe) => {
      try {
        const response = await axios.put(`/api/recipes/${id}`, updatedRecipe);
        setRecipes(prev => 
          prev.map(recipe => recipe.recipeID === id ? response.data : recipe)
        );
        return response.data;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },

    deleteRecipe: async (id) => {
      try {
        await axios.delete(`/api/recipes/${id}`);
        setRecipes(prev => 
          prev.filter(recipe => recipe.recipeID !== id)
        );
      } catch (err) {
        setError(err.message);
        throw err;
      }
    }
  };

  const value = useMemo(() => ({
    recipes,
    loading,
    error,
    ...recipeOperations
  }), [recipes, loading, error]);

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeContext.Provider;