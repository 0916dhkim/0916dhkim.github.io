import "@0916dhkim/theme/theme.css";
import "highlight.js/styles/github-dark.css";

import type { AppProps } from "next/app";
import { Layout } from "components/layout";
import Script from "next/script";

function App({ pageProps, Component }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Script src="/darkmode.js" strategy="beforeInteractive" />
    </Layout>
  );
}

export default App;
