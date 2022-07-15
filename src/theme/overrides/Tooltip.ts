import { Theme } from "@mui/material/styles/createTheme";

// ----------------------------------------------------------------------

export default function Tooltip(theme: Theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[800]
        },
        arrow: {
          color: theme.palette.grey[800]
        }
      }
    }
  };
}
