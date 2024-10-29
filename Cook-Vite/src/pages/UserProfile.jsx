import React, { useState } from 'react';
import { 
  Avatar, 
  Button, 
  Modal, 
  TextInput, 
  Grid, 
  Title, 
  Group, 
  Text, 
  Loader 
} from '@mantine/core';
import { CardsCarousel } from '../components/RecipeCarousel';
import RecipeCard from '../components/RecipeCard';

const UserProfile = ({ userId, currentUserId }) => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const { profile, favoritedRecipes, createdRecipes, loading, error } = useUserData(userId);
  const { updateUserProfile, editedProfile, setEditedProfile } = useProfileUpdate(userId);

  const handleEditProfile = async () => {
    await updateUserProfile();
    setEditProfileModalOpen(false);
  };

  if (loading) return <Loader size="xl" className={styles.loader} />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const isCurrentUser = userId === currentUserId;

  return (
    <div className={styles.container}>
      <ProfileHeader 
        profile={profile}
        isCurrentUser={isCurrentUser}
        onEditClick={() => setEditProfileModalOpen(true)}
      />

      <EditProfileModal
        opened={editProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
        editedProfile={editedProfile}
        setEditedProfile={setEditedProfile}
        onSave={handleEditProfile}
      />

      <RecipeCollections 
        favoritedRecipes={favoritedRecipes}
        createdRecipes={createdRecipes}
      />
    </div>
  );
};

const ProfileHeader = ({ profile, isCurrentUser, onEditClick }) => (
  <Group position="center" direction="column" spacing="md">
    <Avatar src={profile.avatar} size={120} radius={60} />
    <Title order={2}>{profile.username}</Title>
    <Text>{profile.name}</Text>
    <Text>{profile.email}</Text>
    {isCurrentUser && <Button onClick={onEditClick}>Edit Profile</Button>}
  </Group>
);

const EditProfileModal = ({ opened, onClose, editedProfile, setEditedProfile, onSave }) => (
  <Modal opened={opened} onClose={onClose} title="Edit Profile">
    {['avatar', 'username', 'name', 'email'].map((field) => (
      <TextInput
        key={field}
        label={field.charAt(0).toUpperCase() + field.slice(1)}
        value={editedProfile[field]}
        onChange={(e) => setEditedProfile({ ...editedProfile, [field]: e.target.value })}
      />
    ))}
    <Button onClick={onSave}>Save Changes</Button>
  </Modal>
);

const RecipeCollections = ({ favoritedRecipes, createdRecipes }) => (
  <>
    <section className={styles.section}>
      <Title order={3} align="center">Favorited Recipes</Title>
      <CardsCarousel recipes={favoritedRecipes} />
    </section>

    <section className={styles.section}>
      <Title order={3} align="center">Created Recipes</Title>
      <Grid gutter="lg">
        {createdRecipes.map((recipe) => (
          <Grid.Col key={recipe.id} span={4}>
            <RecipeCard recipe={recipe} />
          </Grid.Col>
        ))}
      </Grid>
    </section>
  </>
);

export default UserProfile;
