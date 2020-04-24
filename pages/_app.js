// import App from 'next/app';
import "semantic-ui-css/semantic.min.css";
import { CookieProvider } from "../components/providers/cookies";
import { LocationProvider } from "../components/providers/location";
import { UnitProvider } from "../components/providers/unit";

function MyApp({ Component, pageProps }) {
  return (
    <CookieProvider>
      <LocationProvider>
        <UnitProvider>
          <Component {...pageProps} />
        </UnitProvider>
      </LocationProvider>
    </CookieProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
