import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Group, Text, Title, List, Image, Badge } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import SocialShare from '../components/SocialShare';
import Footer from '../components/Footer';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRecipe(data);
        const favoriteResponse = await fetch(`/api/favorites/${id}`);
        if (!favoriteResponse.ok) throw new Error('Network response was not ok');
        const favoriteData = await favoriteResponse.json();
        setIsFavorited(favoriteData.isFavorited);
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleFavoriteToggle = async () => {
    const url = `/api/favorites/${id}`;
    const method = isFavorited ? 'DELETE' : 'POST';
    try {
      const response = await fetch(url, { method });
      if (response.ok) {
        setIsFavorited(!isFavorited);
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  if (loading || !recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Image src={recipe.image} alt={recipe.title} fit="contain" mb="md" />
      <Group position="apart" mb="md">
        <Title order={2}>{recipe.title}</Title>
        <Button onClick={handleFavoriteToggle} variant="subtle" size="lg">
          {isFavorited ? <IconStarFilled /> : <IconStar />}
        </Button>
      </Group>
      <Title order={4}>Ingredients</Title>
      <List>
        {recipe.ingredients.split(',').map((ingredient, index) => (
          <List.Item key={index}>{ingredient.trim()}</List.Item>
        ))}
      </List>
      <Title order={4} mt="lg">Instructions</Title>
      <List type="ordered">
        {recipe.instructions.split('.').map((instruction, index) => (
          <List.Item key={index}>{instruction.trim()}</List.Item>
        ))}
      </List>
      <Group mt="md">
        <Badge size="lg" color="gray">Time: {recipe.time} mins</Badge>
        <Badge size="lg" color="gray">Difficulty: {recipe.difficulty}</Badge>
        <Badge size="lg" color="gray">Servings: {recipe.servings}</Badge>
      </Group>
      <SocialShare recipe={recipe} />
      <Footer />
    </div>
  );
}

export default RecipeDetails