import React, { createContext, useContext, useState, useCallback } from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from '../styles/theme';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setColorScheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value = {
    colorScheme,
    toggleTheme,
    theme: {
      ...theme,
      colorScheme,
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      <MantineProvider theme={value.theme} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext.Provider;
