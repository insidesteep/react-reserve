import { Container, Menu, Image, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { handleLogout } from '../../utils/auth'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function Header({ user }) {
  const router = useRouter()

  const isActive = (route) => route === router.pathname

  const isRoot = user && user.role === 'root'
  const isAdmin = user && user.role === 'admin'
  const isRootOrAdmin = isRoot || isAdmin

  return (
    <Menu stackable fluid inverted id='menu'>
      <Container text>
        <Link href='/'>
          <Menu.Item header active={isActive('/')}>
            <Image
              size='mini'
              src='/static/logo.svg'
              style={{ marginRight: '1em' }}
            />
            React Reverse
          </Menu.Item>
        </Link>

        <Link href='/cart'>
          <Menu.Item header active={isActive('/cart')}>
            <Icon size='large' name='cart' />
            Cart
          </Menu.Item>
        </Link>

        {isRootOrAdmin && (
          <Link href='/create'>
            <Menu.Item header active={isActive('/create')}>
              <Icon size='large' name='add square' />
              Create
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href='/account'>
              <Menu.Item header active={isActive('/account')}>
                <Icon size='large' name='user' />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item header onClick={handleLogout}>
              <Icon size='large' name='sign out' />
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href='/login'>
              <Menu.Item header active={isActive('/login')}>
                <Icon size='large' name='sign in' />
                Login
              </Menu.Item>
            </Link>

            <Link href='/signup'>
              <Menu.Item header active={isActive('/signup')}>
                <Icon size='large' name='signup' />
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  )
}

export default Header
