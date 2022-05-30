import type { AppProps } from "next/app";
import { EditorLayout } from "@blog-monorepo/ui";
import dynamic from "next/dynamic";

function App({ pageProps, Component }: AppProps) {
  return (
    <EditorLayout>
      <Component {...pageProps} />
    </EditorLayout>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });
