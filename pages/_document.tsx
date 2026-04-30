import Document, { Head, Html, Main, NextScript } from "next/document";
import { withBasePath } from "../lib/paths";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href={withBasePath("/favicon.svg")} type="image/svg+xml" />
          <link rel="shortcut icon" href={withBasePath("/favicon.svg")} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
