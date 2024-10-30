import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Group, Text, Title, List, Image, Badge, Loader } from '@mantine/core';
const IconStar = React.lazy(() => import('@tabler/icons-react').then(module => ({ default: module.IconStar })));
const IconStarFilled = React.lazy(() => import('@tabler/icons-react').then(module => ({ default: module.IconStarFilled })));
import { useFetch } from '../hooks/useFetch';
import SocialShare from '../components/SocialShare';
import Footer from '../components/Footer';

function RecipeDetails() {
  const { id } = useParams();
  const { data: recipe, loading } = useFetch(`/recipes/${id}`);
  const { isFavorited, toggleFavorite } = useToggleFavorite(id);

  if (loading || !recipe) {
    return <Loader size="xl" className={styles.loader} />;
  }

  const ingredients = recipe.ingredients.split(',').map(i => i.trim());
  const instructions = recipe.instructions.split('.').filter(i => i.trim());

  return (
    <div className={styles.container}>
      <Image src={recipe.image} alt={recipe.title} fit="contain" mb="md" />
      <Group position="apart" mb="md">
        <Title order={2}>{recipe.title}</Title>
        <Button
          onClick={toggleFavorite}
          variant="subtle"
          size="lg"
          leftIcon={
            <Suspense fallback={<div style={{ width: 24, height: 24 }} />}>
              {isFavorited ? <IconStarFilled /> : <IconStar />}
            </Suspense>
          }
        >
          {isFavorited ? 'Favorited' : 'Add to Favorites'}
        </Button>
      </Group>
      <section className={styles.section}>
        <Title order={4}>Ingredients</Title>
        <List>
          {ingredients.map((ingredient, index) => (
            <List.Item key={index}>{ingredient}</List.Item>
          ))}
        </List>
      </section>
      <section className={styles.section}>
        <Title order={4}>Instructions</Title>
        <List type="ordered">
          {instructions.map((instruction, index) => (
            <List.Item key={index}>{instruction}</List.Item>
          ))}
        </List>
      </section>
      <Group mt="md" className={styles.badges}>
        <Badge size="lg" color="gray">Time: {recipe.time} mins</Badge>
        <Badge size="lg" color="gray">Difficulty: {recipe.difficulty}</Badge>
        <Badge size="lg" color="gray">Servings: {recipe.servings}</Badge>
      </Group>
      <SocialShare recipe={recipe} />
      <Footer />
    </div>
  );
}

export default RecipeDetails;


