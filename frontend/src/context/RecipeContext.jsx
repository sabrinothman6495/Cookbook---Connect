import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch recipes from the API
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

    fetchRecipes();
  }, []);

  const addRecipe = async (newRecipe) => {
    try {
      const response = await axios.post('/api/recipes', newRecipe);
      setRecipes([...recipes, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      const response = await axios.put(`/api/recipes/${id}`, updatedRecipe);
      setRecipes(recipes.map((recipe) => (recipe.recipeID === id ? response.data : recipe)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`/api/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.recipeID !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <RecipeContext.Provider value={{ recipes, loading, error, addRecipe, updateRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;