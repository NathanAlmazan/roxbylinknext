import { alpha } from '@mui/material/styles';
import { Theme } from "@mui/material/styles/createTheme";

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none'
          }
        },
        sizeLarge: {
          height: 48
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.shadows[10],
          '&:hover': {
            backgroundColor: theme.palette.grey[400]
          }
        },
        containedPrimary: {
          boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`
        },
        containedSecondary: {
          boxShadow: `0 8px 16px 0 ${alpha(theme.palette.secondary.main, 0.24)}`
        },
        outlinedInherit: {
          border: `1px solid ${alpha('#919EAB', 0.32)}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}
