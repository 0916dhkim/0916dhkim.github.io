import React, { useState } from "react";

declare global {
  namespace Jss {
    export interface Theme {
      palette: {
        primary: string;
        secondary: string;
        background: string;
        paper: string;
        white: string;
      };
      shadow: string;
    }
  }
}

type ThemeType = "light" | "dark";
type ThemeTypeContext = {
  themeType: ThemeType;
  setThemeType: React.Dispatch<React.SetStateAction<ThemeType>>;
};

export const LIGHT_THEME: Jss.Theme = {
  palette: {
    primary: "#365DC0",
    secondary: "#826754",
    background: "#F5F5F5",
    paper: "white",
    white: "white",
  },
  shadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
};
export const DARK_THEME: Jss.Theme = {
  ...LIGHT_THEME,
};

const ThemeTypeContext = React.createContext<ThemeTypeContext>({
  themeType: "dark",
  setThemeType: () => {},
});

export const ThemeTypeProvider: React.FC = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>("light");
  return React.createElement(
    ThemeTypeContext.Provider,
    { value: { themeType, setThemeType } },
    children
  );
};
export const useThemeType = () => React.useContext(ThemeTypeContext);
