import { Theme } from "@mui/material/styles/createTheme";

// ----------------------------------------------------------------------

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2)
        },
        gutterBottom: {
          marginBottom: theme.spacing(1)
        }
      }
    }
  };
}
