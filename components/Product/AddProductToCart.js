import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import cookie from 'js-cookie'
import { Input } from 'semantic-ui-react'
import baseUrl from '../../utils/baseUrl'
import cathErrors from '../../utils/catchErrors'

function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let timeout

    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [success])

  const handleRoute = () => router.push('/login')

  const handleChange = (event) => setQuantity(Number(event.target.value))

  const handleAddProductToCart = async () => {
    setLoading(true)

    const url = `${baseUrl}/api/cart`
    const payload = { quantity, productId }
    const token = cookie.get('token')
    const headers = { headers: { Authorization: token } }

    try {
      await axios.put(url, payload, headers)

      setSuccess(true)
    } catch (error) {
      console.error(error)
      cathErrors(error, window.alert)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Input
      min={1}
      value={quantity}
      type='number'
      placeholder='Qunatity'
      onChange={handleChange}
      action={
        user && success
          ? {
              color: 'blue',
              content: 'Item Added!',
              icon: 'plus cart',
              disabled: true,
            }
          : user
          ? {
              color: 'orange',
              content: 'Add to Cart',
              icon: 'plus cart',
              loading,
              disabled: loading,
              onClick: handleAddProductToCart,
            }
          : {
              color: 'blue',
              content: 'Sign Up To Purchase',
              icon: 'signup',
              onClick: handleRoute,
            }
      }
    />
  )
}

export default AddProductToCart
