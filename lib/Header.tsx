import React from 'react';
import Link from 'next/link'
import Head from 'next/head';
import Router from 'next/router'

import * as gtag from './gtag'

Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url))

const Header = () => (
  <>
    <Head>
      <title>Lighthaus</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>
  </>
)

export default Header;