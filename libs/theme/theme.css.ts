import {
  createGlobalTheme,
  createThemeContract,
  globalStyle,
} from "@vanilla-extract/css";

export const theme = createThemeContract({
  palette: {
    primary: null,
    secondary: null,
    background: null,
    paper: null,
    white: null,
  },
  shadow: null,
});

/** Light Theme */
createGlobalTheme(":root", theme, {
  palette: {
    primary: "#365DC0",
    secondary: "#826754",
    background: "#F5F5F5",
    paper: "white",
    white: "white",
  },
  shadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
});

/** Dark theme */
createGlobalTheme(':root[data-theme="dark"]', theme, {
  palette: {
    primary: "#365DC0",
    secondary: "#826754",
    background: "black",
    paper: "black",
    white: "black",
  },
  shadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
});

/** Reset */
globalStyle("html, body", {
  padding: 0,
  margin: 0,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("*", {
  padding: 0,
  margin: 0,
  boxSizing: "border-box",
});
