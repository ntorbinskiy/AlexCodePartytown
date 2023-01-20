import "../styles/root.scss";

import { Partytown } from "@builder.io/partytown/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { Provider } from "react-redux";
import store from "redux/store";

import ThemeProvider from "@/components/ThemeProvider";

const GA_TRACKING_ID = "G-1JHZSH8YH4";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    {/* Google Analytics */}
    <Head>
      <Partytown debug={true} forward={["dataLayer.push"]} />
      <script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        type="text/partytown"
        async
      />
    </Head>
    <Script
      type="text/partytown"
      id="google-analytics"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
          
        gtag('config', '${GA_TRACKING_ID}');
      `,
      }}
    />

    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
);

export default MyApp;
