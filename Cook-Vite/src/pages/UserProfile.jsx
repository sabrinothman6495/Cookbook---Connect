import React, { useState, useEffect } from 'react';
import { Avatar, Button, Modal, TextInput, Grid, Title, Group, Text } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { CardsCarousel } from '../components/RecipeCarousel';
import RecipeCard from '../components/RecipeCard';
import { fetchUserProfile, fetchFavoritedRecipes, fetchCreatedRecipes, updateProfile } from '../../../server/api/userAPI'; 
import PropTypes from 'prop-types';

const UserProfile = ({ userId, currentUserId }) => {
  const [profile, setProfile] = useState(null);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ avatar: '', username: '', name: '', email: '' });
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await fetchUserProfile(userId);
      setProfile(profileData);
      const favoritesData = await fetchFavoritedRecipes(userId);
      setFavoritedRecipes(favoritesData);
      const createdData = await fetchCreatedRecipes(userId);
      setCreatedRecipes(createdData);
    };
    fetchData();
  }, [userId]);

  const handleEditProfile = async () => {
    await updateProfile(userId, editedProfile);
    setProfile(prevProfile => ({ ...prevProfile, ...editedProfile }));
    setEditProfileModalOpen(false);
  };

  if (!profile) return <div>Loading...</div>;

  const isCurrentUser = userId === currentUserId;

  return (
    <div>
      <Group position="center" direction="column" spacing="md">
        <Avatar src={profile.avatar} size={120} radius={60} />
        <Title order={2}>{profile.username}</Title>
        <Text>{profile.name}</Text>
        <Text>{profile.email}</Text>
        {isCurrentUser && (
          <Button onClick={() => setEditProfileModalOpen(true)}>Edit Profile</Button>
        )}
      </Group>
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
      <div style={{ margin: '40px 0' }}>
        <Title order={3} align="center">Favorited Recipes</Title>
        <CardsCarousel recipes={favoritedRecipes} />
      </div>
      <div style={{ margin: '40px 0' }}>
        <Title order={3} align="center">Created Recipes</Title>
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
