import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Segment, Form, Button, Icon, Message } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth'
import catchErrors from '../utils/catchErrors'

const INITIAL_USER = {
  name: '',
  email: '',
  password: '',
}

function Signup() {
  const [user, setUser] = useState(INITIAL_USER)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el))

    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  const handleChange = async (event) => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = `${baseUrl}/api/signup`
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
        icon='settings'
        header='Get Started!'
        content='Create a new account'
        color='teal'
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header='Oops!' content={error} />
        <Segment>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Name'
            placeholder='Name'
            name='name'
            value={user.name}
            onChange={handleChange}
          />
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
            icon='signup'
            type='submit'
            content='Signup'
            disabled={disabled || loading}
          />
        </Segment>
      </Form>

      <Message attached='bottom' warning>
        <Icon name='help' />
        Existing user?{' '}
        <Link href='/login'>
          <a>Log in here</a>
        </Link>{' '}
        instead.
      </Message>
    </>
  )
}

export default Signup
