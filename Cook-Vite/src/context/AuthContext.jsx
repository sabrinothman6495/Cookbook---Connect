import { createContext, useState, useEffect } from 'react';
import { auth } from '../utils/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = auth.getToken();
    console.log('Retrieved Token:', token);  // Log the token

    if (token) {
      fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        auth.removeToken();
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user
  };

  console.log('AuthContext Value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
