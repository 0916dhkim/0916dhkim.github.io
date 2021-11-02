import React, { useState } from "react";

// Augment global theme.
declare global {
  namespace Jss {
    export interface Theme {
      palette: {
        background: string;
        paper: string;
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
    background: "#F5F5F5",
    paper: "white",
  },
  shadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
  return (
    <ThemeTypeContext.Provider value={{ themeType, setThemeType }}>
      {children}
    </ThemeTypeContext.Provider>
  );
};
export const useThemeType = () => React.useContext(ThemeTypeContext);
