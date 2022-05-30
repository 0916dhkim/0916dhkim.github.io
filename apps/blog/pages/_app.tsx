import "highlight.js/styles/github-dark.css";

import type { AppProps } from "next/app";
import { BlogLayout } from "@blog-monorepo/ui";

function App({ pageProps, Component }: AppProps) {
  return (
    <BlogLayout>
      <Component {...pageProps} />
    </BlogLayout>
  );
}

export default App;
