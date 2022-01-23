import {
  createGlobalTheme,
  createThemeContract,
  globalStyle,
} from "@vanilla-extract/css";

export const theme = createThemeContract({
  palette: {
    default: {
      background: null,
      text: null,
    },
    paper: {
      background: null,
      text: null,
    },
    primary: {
      background: null,
      text: null,
    },
    secondary: {
      background: null,
      text: null,
    },
  },
  shadow: null,
});

/** Light Theme */
createGlobalTheme(":root", theme, {
  palette: {
    default: {
      background: "#FDF4ED",
      text: "#3A405A",
    },
    paper: {
      background: "#F9DEC9",
      text: "#3A405A",
    },
    primary: {
      background: "#3D6AB8",
      text: "#FDF4ED",
    },
    secondary: {
      background: "#D3614A",
      text: "#FDF4ED",
    },
  },
  shadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
});

/** Dark theme */
createGlobalTheme(':root[data-theme="dark"]', theme, {
  palette: {
    default: {
      background: "#282C3E",
      text: "#F9DEC9",
    },
    paper: {
      background: "#3A405A",
      text: "#F9DEC9",
    },
    primary: {
      background: "#99B2DD",
      text: "#3A405A",
    },
    secondary: {
      background: "#AA6373",
      text: "#F9DEC9",
    },
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

/** Override browser default styles */
globalStyle("a", {
  color: theme.palette.primary.background,
  textDecoration: "none",
});
globalStyle("a:hover", {
  color: theme.palette.primary.text,
  backgroundColor: theme.palette.primary.background,
});

globalStyle(
  'input[type="email"], input[type="text"], input[type="password"], select',
  {
    boxShadow: "none",
    border: "none",
    padding: "0.25rem",
    borderRadius: "0.25rem",
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.secondary.text,
    outline: "none",
  }
);

globalStyle('button, input[type="submit"]', {
  padding: "1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: theme.palette.primary.text,
  backgroundColor: theme.palette.primary.background,
  border: "none",
  borderRadius: "0.25rem",
  cursor: "pointer",
});

globalStyle("ul li", {
  paddingLeft: "0.5rem",
});

globalStyle("ul li::marker", {
  content: "›",
});

globalStyle("*", {
  padding: 0,
  margin: 0,
  boxSizing: "border-box",
});
