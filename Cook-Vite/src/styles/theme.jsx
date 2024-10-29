import { MantineProvider } from '@mantine/core';

export const theme = {
  colorScheme: 'light',
  colors: {
    brand: [
      '#F0F0FF',
      '#D0D0FF',
      '#A0A0FF',
      '#7070FF',
      '#4040FF',
      '#2020FF',
      '#1010FF',
      '#0000FF',
    ],
    accent: [
      '#FFE8E8',
      '#FFD1D1',
      '#FFBABA',
      '#FFA3A3',
      '#FF8C8C',
      '#FF7575',
      '#FF5E5E',
      '#FF4747',
    ],
  },
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
    sizes: {
      h1: { fontSize: 32, lineHeight: 1.4 },
      h2: { fontSize: 26, lineHeight: 1.35 },
      h3: { fontSize: 22, lineHeight: 1.3 },
      h4: { fontSize: 18, lineHeight: 1.25 },
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
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
};

const ThemeProvider = ({ children }) => (
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    {children}
  </MantineProvider>
);

export default ThemeProvider;
