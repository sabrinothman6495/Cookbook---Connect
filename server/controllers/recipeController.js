import React, { useState, useEffect } from 'react';

function RecipeManagement() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ 
    title: '', 
    ingredients: '',
    instructions: '',
    time: 1,
    difficulty: '',
    servings: 1,
    image: ''
  });

  // Fetch all users when component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
        const response = await fetch('');
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const recipes = await response.json();
        setRecipes(recipes);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateRecipe  = async () => {
    try {
        const response = await fetch('', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe),
          });
    
          if (!response.ok) throw new Error('Failed to create recipe');
          const createdRecipe = await response.json();
          setRecipes([...recipes, createdRecipe]);
          setNewRecipe({ title: '', ingredients: '', instructions: '', userId: 1 });
        } catch (error) {
          console.error('Error creating recipe:', error);
        }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      const response = await fetch('', {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete recipe');
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div>
    <h1>Recipe Manager</h1>

    <h2>Create New Recipe</h2>
    <input
      type="text"
      value={newRecipe.title}
      onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
      placeholder="Title"
    />
    <textarea
      value={newRecipe.ingredients}
      onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
      placeholder="Ingredients"
    ></textarea>
    <textarea
      value={newRecipe.time}
      onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
      placeholder="Time"
    ></textarea>
    <textarea
      value={newRecipe.difficulty}
      onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
      placeholder="Difficulty"
    ></textarea>
    <textarea
      value={newRecipe.servings}
      onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
      placeholder="Servings"
    ></textarea>
    <textarea
      value={newRecipe.image}
      onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
      placeholder="Image"
    ></textarea>
    <button onClick={handleCreateRecipe}>Create Recipe</button>

    <h2>All Recipes</h2>
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
          <p>{recipe.time}</p>
          <p>{recipe.difficulty}</p>
          <p>{recipe.servings}</p>
          <p>{recipe.image}</p>
          <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default RecipeManagement;