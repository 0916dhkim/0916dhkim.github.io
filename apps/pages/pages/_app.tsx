import "@0916dhkim/theme/theme.css";
import "highlight.js/styles/github-dark.css";

import type { AppProps } from "next/app";
import { Layout } from "components/layout";

function App({ pageProps, Component }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <script defer src="/darkmode.js"></script>
    </Layout>
  );
}

export default App;
