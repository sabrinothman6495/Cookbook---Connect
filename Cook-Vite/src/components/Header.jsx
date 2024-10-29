import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MantineProvider, TextInput } from '@mantine/core';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/cookbook-logo.jpeg';

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSuggestions(value ? searchSuggestions(value) : []);
  };

  const handleSelectSuggestion = (suggestion) => {
    const routes = {
      recipe: '/recipes/',
      user: '/users/',
      category: '/categories/'
    };
    navigate(`${routes[suggestion.type]}${suggestion.name}`);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <header className={styles.header}>
        <div className={styles.left}>
          {!isAuthenticated ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/profile">Profile</Link>
          )}
        </div>

        <div className={styles.center}>
          <Link to="/">
            <img src={Logo} alt="CookBook Connect Logo" className={styles.logo} />
          </Link>
        </div>

        <div className={styles.right}>
          <TextInput
            placeholder="Search recipes, users, categories..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchBar}
          />
          {suggestions.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={styles.suggestionItem}
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

export default Header;