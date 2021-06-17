import '../styles/globals.css';
import {ThemeProvider} from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import theme from './theme';
import Head from 'next/head';
import Layout from '../components/layout'
import { AppProvider } from '../components/AppContext'



function MyApp({ Component, pageProps }) {


  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppProvider>
    <Head>
      <title>Family Tree</title>
    </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AppProvider>
    )
}

export default MyApp;
