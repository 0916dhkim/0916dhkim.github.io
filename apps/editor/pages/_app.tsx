import "../styles/globals.css";

import {
  DARK_THEME,
  LIGHT_THEME,
  ThemeTypeProvider,
  useThemeType,
} from "@0916dhkim/core";

import type { AppProps } from "next/app";
import { ThemeProvider } from "react-jss";

function Inner({ pageProps, Component }: AppProps) {
  const { themeType } = useThemeType();
  return (
    <ThemeProvider theme={themeType === "light" ? LIGHT_THEME : DARK_THEME}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

function MyApp(appProps: AppProps) {
  return (
    <ThemeTypeProvider>
      <Inner {...appProps} />
    </ThemeTypeProvider>
  );
}

export default MyApp;
