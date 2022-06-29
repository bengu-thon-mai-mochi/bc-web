import "../styles/reset.css";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import SEO from "../components/seo";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
