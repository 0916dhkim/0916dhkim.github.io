/**
 * Source: https://github.com/vercel/next.js/tree/canary/examples/with-react-jss
 */

import Document, { DocumentContext } from "next/document";
import { JssProvider, SheetsRegistry, createGenerateId } from "react-jss";

import { AppType } from "next/dist/shared/lib/utils";

export default class JssDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => {
          const EnhancedApp: AppType = (props) => (
            <JssProvider registry={registry} generateId={generateId}>
              <App {...props} />
            </JssProvider>
          );
          return EnhancedApp;
        },
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      ),
    };
  }
}
