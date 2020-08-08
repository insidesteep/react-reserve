import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Segment, Form, Button, Icon, Message } from 'semantic-ui-react'
import { handleLogin } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

const INITIAL_USER = {
  email: '',
  password: '',
}

function Login() {
  const [user, setUser] = useState(INITIAL_USER)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el))

    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  const handleChange = (event) => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = `${baseUrl}/api/login`
      const payload = { ...user }

      const response = await axios.post(url, payload)

      handleLogin(response.data)
    } catch (error) {
      catchErrors(error, setError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Message
        attached
        icon='privacy'
        header='Welcome Back!!'
        content='Log in with email and password'
        color='blue'
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header='Oops!' content={error} />
        <Segment>
          <Form.Input
            icon='envelope'
            iconPosition='left'
            label='Email'
            placeholder='Email'
            name='email'
            type='email'
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            value={user.password}
            onChange={handleChange}
          />
          <Button
            color='orange'
            icon='sign in'
            type='submit'
            content='Login'
            disabled={disabled || loading}
          />
        </Segment>
      </Form>

      <Message attached='bottom' warning>
        <Icon name='help' />
        New user?{' '}
        <Link href='/signup'>
          <a>Sign up here</a>
        </Link>{' '}
        instead.
      </Message>
    </>
  )
}

export default Login
