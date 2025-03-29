import { createTheme } from '@mui/material/styles';

// Japandi-inspired color palette
const colors = {
  primary: {
    main: '#9B8B7E',      // Warm gray
    light: '#D4CDC8',     // Light warm gray
    dark: '#625750',      // Dark warm gray
  },
  secondary: {
    main: '#B8C5BD',      // Sage green
    light: '#D9E3DD',     // Light sage
    dark: '#8A9B91',      // Dark sage
  },
  neutral: {
    main: '#F5F2F0',      // Off-white
    light: '#FFFFFF',     // Pure white
    dark: '#E5E0DD',      // Light gray
  },
  text: {
    primary: '#2C2420',   // Deep warm brown
    secondary: '#625750',  // Medium warm gray
  },
  background: {
    default: '#F5F2F0',   // Off-white
    paper: '#FFFFFF',     // Pure white
  },
};

const theme = createTheme({
  palette: {
    ...colors,
    mode: 'light',
  },
  typography: {
    fontFamily: '"Noto Sans JP", "Noto Serif", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 300,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      letterSpacing: '0em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.00938em',
      lineHeight: 1.75,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 24px',
          borderRadius: '8px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme; 