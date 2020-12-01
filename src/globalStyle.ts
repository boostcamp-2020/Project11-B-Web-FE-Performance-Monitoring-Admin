import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
  },
});

theme.typography.h1 = {
  fontSize: '2rem',
};

theme.typography.h2 = {
  fontSize: '1.5rem',
};

export default theme;
