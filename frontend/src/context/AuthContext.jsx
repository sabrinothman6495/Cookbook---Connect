import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken, generateToken } from '../utils/tokenUtils';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = verifyToken(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const token = await generateToken(credentials); // Replace with your auth API call
    localStorage.setItem('token', token);
    const decoded = verifyToken(token);
    setUser(decoded);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;