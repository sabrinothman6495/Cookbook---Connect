import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';

const Home = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    // Fetch random recipes from the API
    const fetchRandomRecipes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/random?limit=3`);
        setRandomRecipes(response.data);
      } catch (error) {
        console.error('Error fetching random recipes:', error);
      }
    };

    fetchRandomRecipes();
  }, []);

  return (
    <div>
      <header>
        <h1>Welcome to Cookbook Connect</h1>
      </header>
      <main>
        <section>
          <h2>Discover New Recipes</h2>
          <p>Explore a variety of recipes from different cuisines and cultures.</p>
          <div className="recipe-cards">
            {randomRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
        <section>
          <h2>Save your favorites</h2>
          <p>Save your favorite recipes to come back to later.</p>
        </section>
        <section>
          <h2>Track your ingredients</h2>
          <p>Keep track of the ingredients you have in your pantry and find recipes that use them.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;