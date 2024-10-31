import React, { Suspense } from 'react';
const IconHeart = React.lazy(() => import('@tabler/icons-react').then(module => ({ default: module.IconHeart })));
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import PropTypes from 'prop-types';
import placeholderImage from '../assets/placeholder.jpg';

const HeartIcon = () => (
  <Suspense fallback={<div style={{ width: 24, height: 24 }} />}>
    <IconHeart className={classes.like} stroke={1.5} />
  </Suspense>
);

const RecipeCard = ({ recipe }) => {
  const { image, title, description, badges, country } = recipe;
  const features = badges.map((badge) => (
    <Badge 
      variant="light" 
      key={badge.label} 
      leftSection={badge.emoji}
    >
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image || placeholderImage} alt={title} height={180} />
      </Card.Section>
      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>{title}</Text>
          <Badge size="sm" variant="light">{country}</Badge>
        </Group>
        <Text fz="sm" mt="xs">{description}</Text>
      </Card.Section>
      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group gap={7} mt={5}>
          {features}
        </Group>
      </Card.Section>
      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>Show details</Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <HeartIcon />
        </ActionIcon>
      </Group>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    badges: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        emoji: PropTypes.node.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default RecipeCard;


