import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error
    try {
      await axios.post('http://localhost:3002/api/auth/signup', { username, password });
      console.log('User created successfully');
      // Optionally, redirect or clear the form
    } catch (error) {
      setError('Signup error: ' + (error.response?.data || 'Unknown error'));
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Signup</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Signup;
