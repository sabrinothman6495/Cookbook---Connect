import { createContext, useState, useEffect } from "react";
import { auth } from "../utils/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = auth.getToken();
    console.log('Retrieved Token:', token); // Log the token

    if (token) {
      fetch('/api/users/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch user data');
          return res.json();
        })
        .then(data => {
          console.log('Fetched User Data:', data); // Log the fetched user data
          setUser(data.user); // Assume the user data structure has a user field
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          auth.removeToken();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData.user); // Assuming userData contains user info with a user field
    auth.setToken(userData.token); // Save the token
  };

  const logout = () => {
    setUser(null);
    auth.removeToken();
  };

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  };

  console.log('AuthContext Value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;





