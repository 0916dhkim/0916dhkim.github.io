import "../styles/globals.css";

import {
  DARK_THEME,
  LIGHT_THEME,
  SupabaseProvider,
  ThemeTypeProvider,
  useThemeType,
} from "@0916dhkim/core";

import type { AppProps } from "next/app";
import { ThemeProvider } from "react-jss";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../components/Layout"), { ssr: false });

function Inner({ pageProps, Component }: AppProps) {
  const { themeType } = useThemeType();
  return (
    <SupabaseProvider>
      <ThemeProvider theme={themeType === "light" ? LIGHT_THEME : DARK_THEME}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SupabaseProvider>
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
