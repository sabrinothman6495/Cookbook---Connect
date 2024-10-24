import React, { createContext } from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from '../styles/theme'; // Import your custom theme configuration

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;