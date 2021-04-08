import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
});

const theme = extendTheme({
  fonts: {
    body: `Poppins,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    light: 300,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  breakpoints,
  styles: {
    global: {
      html: {
        minWidth: 360,
        scrollBehavior: 'smooth',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      },
      body: {
        overflowX: 'hidden',
      },
    },
  },
});

export default theme;
