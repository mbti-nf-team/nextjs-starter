import type { AppProps } from 'next/app';

import { ThemeProvider } from '@emotion/react';

import lightTheme from '@/styles/theme';

import '../../styles/globals.css';

function MyApp({ Component: AppComponent, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppComponent {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
