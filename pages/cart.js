import { useState } from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { Segment } from 'semantic-ui-react'
import CartItemLList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import baseUrl from '../utils/baseUrl'
import cookie from 'js-cookie'
import catchErrors from '../utils/catchErrors'

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleCheckout = async (paymentData) => {
    const url = `${baseUrl}/api/checkout`
    const token = cookie.get('token')
    const payload = { paymentData }
    const headers = { headers: { Authorization: token } }

    try {
      setLoading(true)

      await axios.post(url, payload, headers)

      setSuccess(true)
    } catch (error) {
      catchErrors(error, window.alert)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromCart = async (productId) => {
    const url = `${baseUrl}/api/cart`
    const token = cookie.get('token')
    const payload = {
      params: { productId },
      headers: { Authorization: token },
    }

    try {
      const response = await axios.delete(url, payload)

      setCartProducts(response.data)
    } catch (error) {
      catchErrors(error, window.alert)
    }
  }

  return (
    <Segment loading={loading}>
      <CartItemLList
        user={user}
        products={cartProducts}
        success={success}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <CartSummary
        products={cartProducts}
        success={success}
        handleCheckout={handleCheckout}
      />
    </Segment>
  )
}

Cart.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx)

  if (!token) {
    return { products: [] }
  }

  const url = `${baseUrl}/api/cart`
  const payload = { headers: { Authorization: token } }
  const response = await axios.get(url, payload)

  return { products: response.data }
}

export default Cart
