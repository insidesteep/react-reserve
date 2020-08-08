import { useState, useEffect } from 'react'
import RreactStripeCheckout from 'react-stripe-checkout'
import { Segment, Button } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'

function CartSummary({ products, success, handleCheckout }) {
  const [isCartEmpty, setCartEmpty] = useState(false)
  const [cartAmount, setCartAmount] = useState(0)
  const [stripeAmount, setStripeAmount] = useState(0)

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(products.length === 0)
  }, [products])

  return (
    <Segment clearing size='large'>
      <strong>Sub total: </strong> ${cartAmount}
      <RreactStripeCheckout
        name='React Reserve'
        amount={Number(cartAmount)}
        image={products.length > 0 ? products[0].product.mediaUrl : ''}
        currency='USD'
        shippingAddress
        billingAddress
        zipCode
        stripeKey='pk_test_51HBe7mHT3X81MwJQezbetpgm9Qx779HNE6KP3mTnnHPJ9DBZdcnkgZdDwEiHjFxwuP93IB4Fu8CCzRzicNTYcdW700WCL6avlz'
        token={handleCheckout}
        triggerEvent='onClick'
      >
        <Button
          color='teal'
          icon='cart'
          content='Checkout'
          floated='right'
          disabled={isCartEmpty || success}
        />
      </RreactStripeCheckout>
    </Segment>
  )
}

export default CartSummary
