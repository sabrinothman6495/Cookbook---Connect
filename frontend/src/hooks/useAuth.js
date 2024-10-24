import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { user, login, logout, loading } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  return { user, handleLogin, logout, loading, authError };
};

export default useAuth;