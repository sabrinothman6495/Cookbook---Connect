import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Context for handling authentication
import { useNavigate } from 'react-router-dom'; // Navigation hook
import { MantineProvider, TextInput } from '@mantine/core'; // Using Mantine for styles
import Logo from '../assets/cookbook-logo.jpeg' // Import the logo

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Auth context to check if user is logged in
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]); // State for dynamic suggestions
  const navigate = useNavigate();

  // Simulated data for search suggestions (would come from API in production)
  const mockData = [
    { type: 'recipe', name: 'Spaghetti Bolognese' },
    { type: 'recipe', name: 'Chicken Alfredo' },
    { type: 'user', name: 'John Doe' },
    { type: 'category', name: 'Italian' },
    // Add more mock suggestions...
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // Simulate dynamic search suggestions
    const filteredSuggestions = mockData.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelectSuggestion = (suggestion) => {
    // Handle selecting a suggestion (e.g., navigate to recipe/user/category page)
    if (suggestion.type === 'recipe') {
      navigate(`/recipes/${suggestion.name}`);
    } else if (suggestion.type === 'user') {
      navigate(`/users/${suggestion.name}`);
    } else if (suggestion.type === 'category') {
      navigate(`/categories/${suggestion.name}`);
    }
    setSearchTerm('');
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <header className="header" style={headerStyle}>
        {/* Left side: Login/Profile */}
        <div style={leftStyle}>
          {!isAuthenticated ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/profile">Profile</Link>
          )}
        </div>

        {/* Center: Logo */}
        <div style={centerStyle}>
          <Link to="/">
            <img src={Logo} alt="CookBook Connect Logo" style={logoStyle} />
          </Link>
        </div>

        {/* Right side: Search bar */}
        <div style={rightStyle}>
          <TextInput
            placeholder="Search for recipes, users, categories..."
            value={searchTerm}
            onChange={handleSearch}
            style={searchBarStyle}
          />

          {/* Display search suggestions dynamically */}
          {suggestions.length > 0 && (
            <ul style={suggestionsStyle}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  style={suggestionItemStyle}
                >
                  {suggestion.name} ({suggestion.type})
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </MantineProvider>
  );
};

// Basic styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  borderBottom: '1px solid #ddd',
};

const leftStyle = {
  flex: 1,
};

const centerStyle = {
  flex: 1,
  textAlign: 'center',
};

const logoStyle = {
  maxHeight: '50px',
};

const rightStyle = {
  flex: 1,
  textAlign: 'right',
};

const searchBarStyle = {
  width: '300px',
};

const suggestionsStyle = {
  listStyleType: 'none',
  padding: '0',
  margin: '0',
  position: 'absolute',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  width: '300px',
  zIndex: '1000',
};

const suggestionItemStyle = {
  padding: '8px',
  cursor: 'pointer',
  borderBottom: '1px solid #ddd',
};

export default Header;