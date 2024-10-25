import React from 'react';
import { MantineProvider } from '@mantine/core';

export const theme = {
  colorScheme: 'light', // or 'dark'
  colors: {
    brand: ['#f0f', '#d0d', '#a0a', '#707', '#404', '#202', '#101', '#000'],
  },
  fontFamily: 'Arial, sans-serif',
  headings: {
    fontFamily: 'Verdana, sans-serif',
    sizes: {
      h1: { fontSize: 30 },
      h2: { fontSize: 25 },
      h3: { fontSize: 20 },
    },
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
};

const ThemeProvider = ({ children }) => (
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    {children}
  </MantineProvider>
);

export default ThemeProvider;
