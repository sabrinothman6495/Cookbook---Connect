import React, { useState, useEffect } from 'react';
import { Avatar, Button, Modal, TextInput, Grid, Title, Group, Text } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { CardsCarousel } from '../components/RecipeCarousel'; // For favorited recipes carousel
import RecipeCard from '../components/RecipeCard'; // RecipeCard component for created recipes
import { fetchUserProfile, fetchFavoritedRecipes, fetchCreatedRecipes, updateProfile } from '../api/user'; // Example API functions
import PropTypes from 'prop-types';

const UserProfile = ({ userId, currentUserId }) => {  // currentUserId should be passed from parent or context
  const [profile, setProfile] = useState(null);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ avatar: '', username: '', name: '', email: '' });

  const theme = useMantineTheme();

  useEffect(() => {
    // Fetch user profile, favorited recipes, and created recipes
    fetchUserProfile(userId).then((data) => setProfile(data));
    fetchFavoritedRecipes(userId).then((data) => setFavoritedRecipes(data));
    fetchCreatedRecipes(userId).then((data) => setCreatedRecipes(data));
  }, [userId]);

  const handleEditProfile = () => {
    // Update profile logic here
    updateProfile(userId, editedProfile).then(() => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...editedProfile,
      }));
      setEditProfileModalOpen(false);
    });
  };

  if (!profile) return <div>Loading...</div>;

  // Check if the profile being viewed is the current user's profile
  const isCurrentUser = userId === currentUserId;

  return (
    <div>
      {/* Profile Section */}
      <Group position="center" direction="column" spacing="md">
        <Avatar src={profile.avatar} size={120} radius={60} />
        <Title order={2}>{profile.username}</Title>
        <Text>{profile.name}</Text>
        <Text>{profile.email}</Text>
        {isCurrentUser && (
          <Button onClick={() => setEditProfileModalOpen(true)}>Edit Profile</Button>
        )}
      </Group>

      {/* Edit Profile Modal */}
      <Modal
        opened={editProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
        title="Edit Profile"
      >
        <TextInput
          label="Avatar URL"
          value={editedProfile.avatar}
          onChange={(e) => setEditedProfile({ ...editedProfile, avatar: e.target.value })}
        />
        <TextInput
          label="Username"
          value={editedProfile.username}
          onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
        />
        <TextInput
          label="Name"
          value={editedProfile.name}
          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
        />
        <TextInput
          label="Email"
          value={editedProfile.email}
          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
        />
        <Button onClick={handleEditProfile}>Save Changes</Button>
      </Modal>

      {/* Favorited Recipes Carousel */}
      <div style={{ margin: '40px 0' }}>
        <Title order={3} align="center">
          Favorited Recipes
        </Title>
        <CardsCarousel recipes={favoritedRecipes} />
      </div>

      {/* Created Recipes Grid */}
      <div style={{ margin: '40px 0' }}>
        <Title order={3} align="center">
          Created Recipes
        </Title>
        <Grid gutter="lg">
          {createdRecipes.map((recipe) => (
            <Grid.Col key={recipe.id} span={4}>
              <RecipeCard recipe={recipe} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </div>
  );
};
UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
};

export default UserProfile;