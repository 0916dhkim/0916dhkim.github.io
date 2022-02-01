import "@0916dhkim/theme/theme.css";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../components/Layout"), { ssr: false });

function App({ pageProps, Component }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* eslint-disable-next-line @next/next/no-sync-scripts*/}
      <script src="/darkmode.js"></script>
    </>
  );
}

export default App;
