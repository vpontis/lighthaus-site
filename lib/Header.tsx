import React from 'react';
import Head from 'next/head';
import Router from 'next/router'

import * as gtag from './gtag'

Router
  .events
  .on('routeChangeComplete', (url : string) => gtag.pageview(url))

const Header = () => (
  <Head>
    <title>Lighthaus</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    <link rel="shortcut icon" href="/static/lighthaus-favicon.png"/>
  </Head>
)

export default Header;