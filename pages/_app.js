import 'tailwindcss/tailwind.css'
import 'styles/global.scss'

import Layout from 'components/layout'

function CustomApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default CustomApp
