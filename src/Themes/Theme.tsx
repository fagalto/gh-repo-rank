import { createTheme, ThemeOptions } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff5722",
    },
    secondary: {
      main: "#ff8a65",
    },
    error: {
      main: "#2196f3",
    },
    warning: {
      main: "#cddc39",
    },
    info: {
      main: "#7e57c2",
    },
  },
});
