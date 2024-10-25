import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './context/ThemeContext'; // Import ThemeProvider
import RecipeProvider from './context/RecipeContext'; // Import RecipeProvider
import AuthProvider from './context/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RecipeProvider>
        <ThemeProvider> {/* Wrap the app with all providers */}
          <App />
        </ThemeProvider>
      </RecipeProvider>
    </AuthProvider>
  </React.StrictMode>
);