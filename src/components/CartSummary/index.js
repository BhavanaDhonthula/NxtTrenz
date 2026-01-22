import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalPrice = cartList.reduce(
        (sum, eachProduct) => sum + eachProduct.price * eachProduct.quantity,
        0,
      )

      return (
        <div className="cart-summary-bg-container">
          <h1 className="total-order-amt">
            Order Total <span className="amount">Rs {totalPrice}/-</span>
          </h1>
          <p className="no-of-cart-items">{cartList.length} Items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
