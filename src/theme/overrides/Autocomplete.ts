import { Theme } from "@mui/material/styles/createTheme";

// ----------------------------------------------------------------------

export default function Autocomplete(theme: Theme) {
    return {
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            boxShadow: theme.shadows[20]
          }
        }
      }
    };
  }
  