import React, { useState, useContext } from 'react';
import { Modal, Button, TextInput, Avatar, Carousel } from '@mantine/core';
import { AuthContext } from '../context/AuthContext';
import { useMediaQuery } from '@mantine/hooks';
import { CardsCarousel } from './CardsCarousel';

const UserProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);
  const [editData, setEditData] = useState({
    avatar: user.avatar,
    username: user.username,
    name: user.name,
    email: user.email,
  });

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation for email here, then update the user
    if (validateEmail(editData.email)) {
      updateUser(editData);
      setOpened(false);
    } else {
      alert('Please enter a valid email.');
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isOwnProfile = true; // Check if logged-in user matches profile

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Avatar src={user.avatar} size="xl" radius="xl" />
      <h2>{user.username}</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>

      {isOwnProfile && (
        <Button onClick={() => setOpened(true)} mt="md">
          Edit Profile
        </Button>
      )}

      {/* Modal for editing profile */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Profile"
        centered
      >
        <form onSubmit={handleSubmit}>
          <Avatar src={editData.avatar} size="xl" radius="xl" />
          <TextInput
            label="Username"
            name="username"
            value={editData.username}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Name"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Email"
            name="email"
            value={editData.email}
            onChange={handleInputChange}
            required
            error={!validateEmail(editData.email)}
          />
          <Button type="submit" mt="md">
            Save
          </Button>
        </form>
      </Modal>

      {/* Carousel for favorited recipes */}
      <h3>Favorited Recipes</h3>
      <CardsCarousel data={user.favoritedRecipes} />

      {/* Carousel for posted recipes */}
      <h3>Your Posted Recipes</h3>
      <CardsCarousel data={user.postedRecipes} />
    </div>
  );
};

export default UserProfile;