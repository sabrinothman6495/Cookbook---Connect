import React from 'react';
import RecipeCard from '../components/RecipeCard';
import { Loader } from '@mantine/core';
import { useFetch } from '../hooks/useFetch';
import styles from '../styles/Home.module.css';

const Home = () => {
  const { data: randomRecipes, loading } = useFetch('/recipes/random?limit=3');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to Cookbook Connect</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Discover New Recipes</h2>
          <p>Explore a variety of recipes from different cuisines and cultures.</p>
          {loading ? (
            <Loader size="xl" className={styles.loader} />
          ) : (
            <div className={styles.recipeGrid}>
              {randomRecipes?.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h2>Save your favorites</h2>
          <p>Save your favorite recipes to come back to later.</p>
        </section>

        <section className={styles.section}>
          <h2>Track your ingredients</h2>
          <p>Keep track of the ingredients you have in your pantry and find recipes that use them.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;





