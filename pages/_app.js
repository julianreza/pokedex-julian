import '../styles/index.css'

import React from "react"
import NoSSR from "react-no-ssr"
import withData from "../config/apollo"
import Provider from "../components/provider/provider.component";

function MyApp({ Component, pageProps, apollo }) {
  return (
    <>
      <NoSSR>
        <Provider client={apollo}>
          <Component {...pageProps} />
        </Provider>
      </NoSSR>
    </>
  )
}

export default withData(MyApp)
