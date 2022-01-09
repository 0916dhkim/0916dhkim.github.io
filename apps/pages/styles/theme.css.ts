import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  palette: {
    primary: null,
    secondary: null,
    background: null,
    paper: null,
    white: null,
  },
  shadow: null,
});

export const lightTheme = createTheme(vars, {
  palette: {
    primary: "#365DC0",
    secondary: "#826754",
    background: "#F5F5F5",
    paper: "white",
    white: "white",
  },
  shadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
});
