import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import componentsOverride from './overrides';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette,
  shape: { borderRadius: 8 },
  typography,
  shadows
});

theme.components = componentsOverride(theme);

export default theme;