import "@0916dhkim/theme/theme.css";
import "highlight.js/styles/github-dark.css";

import type { AppProps } from "next/app";
import { DarkMode } from "@0916dhkim/core/darkmode";
import { Layout } from "components/layout";

function App({ pageProps, Component }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <DarkMode />
    </Layout>
  );
}

export default App;
