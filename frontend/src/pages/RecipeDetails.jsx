import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Assuming you're using React Router
import { Button, Group, Text, Title, List, Image, Badge } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import SocialShare from './SocialShare';  // Placeholder for sharing component
import Footer from './Footer'; // Footer component

function RecipeDetails() {
  const { id } = useParams(); // Fetch recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch the recipe data from the backend using the recipe id
    fetch(`/api/recipes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
    fetch(`/api/favorites/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setIsFavorited(data.isFavorited);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
        setLoading(false);
      });

    // Fetch whether this recipe is favorited by the user
    fetch(`/api/favorites/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setIsFavorited(data.isFavorited);
      });
  }, [id]);

  const handleFavoriteToggle = () => {
    const url = `/api/favorites/${id}`;
      <Image src={recipe.image || ''} alt={recipe.title || 'Recipe Image'} fit="contain" mb="md" />

    fetch(url, { method })
      .then((response) => {
        if (response.ok) {
          setIsFavorited(!isFavorited);
        }
      });
  };

  if (loading || !recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Recipe Image */}
      <Image src={recipe.image} alt={recipe.title} fit="contain" mb="md" />

      {/* Title and Favorite Button */}
      <Group position="apart" mb="md">
        <Title order={2}>{recipe.title}</Title>
        <Button onClick={handleFavoriteToggle} variant="subtle" size="lg">
          {isFavorited ? <IconStarFilled /> : <IconStar />}
        </Button>
      </Group>

      {/* Ingredients Section */}
      <Title order={4}>Ingredients</Title>
      <List>
        {recipe.ingredients.split(',').map((ingredient, index) => (
          <List.Item key={index}>{ingredient.trim()}</List.Item>
        ))}
      </List>

      {/* Instructions Section */}
      <Title order={4} mt="lg">Instructions</Title>
      <List type="ordered">
        {recipe.instructions.split('.').map((instruction, index) => (
          <List.Item key={index}>{instruction.trim()}</List.Item>
        ))}
      </List>

      {/* Additional Info */}
      <Group mt="md">
        <Badge size="lg" color="gray">Time: {recipe.time} mins</Badge>
        <Badge size="lg" color="gray">Difficulty: {recipe.difficulty}</Badge>
        <Badge size="lg" color="gray">Servings: {recipe.servings}</Badge>
      </Group>

      {/* Social Sharing Component */}
      <SocialShare recipe={recipe} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RecipeDetails;