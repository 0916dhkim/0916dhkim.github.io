import "@0916dhkim/theme/theme.css";

import type { AppProps } from "next/app";
import { SupabaseProvider } from "@0916dhkim/core/supabase";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../components/Layout"), { ssr: false });

function App({ pageProps, Component }: AppProps) {
  return (
    <SupabaseProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <script defer src="/darkmode.js"></script>
    </SupabaseProvider>
  );
}

export default App;
