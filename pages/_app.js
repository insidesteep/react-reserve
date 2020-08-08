import App from 'next/app'
import axios from 'axios'
import { parseCookies, destroyCookie } from 'nookies'
import Layout from '../components/_App/Layout'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import Router from 'next/router'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx)

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (!token) {
      const isProtected =
        ctx.pathname === '/account' || ctx.pathname === '/create'

      if (isProtected) {
        redirectUser(ctx, '/login')
      }
    } else {
      const payload = { headers: { Authorization: token } }
      const url = `${baseUrl}/api/account`

      try {
        const response = await axios.get(url, payload)
        const user = response.data

        const isRoot = user.role === 'root'
        const isAdmin = user.role === 'admin'
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === '/create'

        if (isNotPermitted) {
          redirectUser(ctx, '/')
        }

        pageProps.user = user
      } catch (error) {
        console.error('Error getting user', error)

        destroyCookie(ctx, 'token')
        redirectUser(ctx, '/login')
      }
    }

    return { pageProps }
  }

  componentDidMount() {
    window.addEventListener('storage', this.syncHandler)
  }

  syncHandler = (event) => {
    if (event.key === 'logout') {
      console.log('Logged out frim storage')
      Router.push('/login')
    } else if (event.key === 'login') {
      Router.push('/account')
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
