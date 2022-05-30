import { Global, Theme, ThemeProvider, css } from "@emotion/react";
import { useEffect, useState } from "react";

declare module "@emotion/react" {
  export interface Theme {
    palette: {
      default: {
        background: string;
        text: string;
        link: string;
      };
      paper: {
        background: string;
        text: string;
        link: string;
      };
      primary: {
        background: string;
        text: string;
      };
      secondary: {
        background: string;
        text: string;
      };
    };
    shadow: string;
  }
}

export const LIGHT_THEME: Theme = {
  palette: {
    default: {
      background: "#FDF4ED",
      text: "#3A405A",
      link: "#3D6AB8",
    },
    paper: {
      background: "#F9DEC9",
      text: "#3A405A",
      link: "#3D6AB8",
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
};

export const DARK_THEME: Theme = {
  palette: {
    default: {
      background: "#282C3E",
      text: "#F9DEC9",
      link: "#99B2DD",
    },
    paper: {
      background: "#3A405A",
      text: "#F9DEC9",
      link: "#99B2DD",
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
};

export const resetStyles = (theme: Theme) =>
  css({
    body: {
      padding: 0,
      margin: 0,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    },
    a: {
      color: theme.palette.paper.link,
      textDecoration: "none",
    },
    'input[type="email"], input[type="text"], input[type="password"], select': {
      boxShadow: "none",
      border: "none",
      padding: "0.5rem",
      borderRadius: "0.25rem",
      backgroundColor: theme.palette.secondary.background,
      outline: "none",

      fontSize: "1rem",
      color: theme.palette.secondary.text,
    },
    'button, input[type="submit"]': {
      padding: "1rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      color: theme.palette.primary.text,
      backgroundColor: theme.palette.primary.background,
      border: "none",
      borderRadius: "0.25rem",
      cursor: "pointer",
    },
  });

function getPreferredTheme(): Theme {
  const isDark =
    typeof window === "object"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : true;
  return isDark ? DARK_THEME : LIGHT_THEME;
}

export function Provider(props: {
  children: React.ReactNode;
}): React.ReactElement {
  const [theme, setTheme] = useState(getPreferredTheme());

  useEffect(() => {
    setTheme(getPreferredTheme());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={resetStyles} />
      {props.children}
    </ThemeProvider>
  );
}
