import "styles/globals.css";
import "highlight.js/styles/github-dark.css";

import type { AppProps } from "next/app";
import { Layout } from "components/layout";

function MyApp({ pageProps, Component }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
