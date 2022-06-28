import type { AppProps } from 'next/app';

import '../styles/globals.css';

function MyApp({ Component: AppComponent, pageProps }: AppProps) {
  return <AppComponent {...pageProps} />;
}

export default MyApp;
