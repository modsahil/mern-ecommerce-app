import React from 'react'
import Header from './Header'
import Footer from './Footer'
import App from '../../App'
import { Helmet } from 'react-helmet'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ height: 'auto' }}>
        {children}
      </main>
      <Footer />


    </div>
  )
}


Layout.defaultProps = {
  title: 'Ecommerce App - shop now',
  description:'MERN Stack project',
  keywords: 'mern,react,node,mongodb',
  author:'Sahil',

}

export default Layout