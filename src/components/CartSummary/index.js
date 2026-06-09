import './index.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {useState} from 'react'
import {IoBag} from 'react-icons/io5'
import {FaBox} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

const CartSummary = () => {
  const [isCodSelected, setIsCodSelected] = useState(false)
  const [isOrdConfirm, setIsOrdConfirm] = useState(false)

  return (
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

            <Popup
              overlayStyle={{
                padding: '10px',
              }}
              trigger={
                <button type="button" className="checkout-btn">
                  Checkout
                </button>
              }
              modal
              contentStyle={{
                width: '80%',
                borderRadius: '8px',
                padding: '15px',
              }}
            >
              {close => {
                const paymentMEdsAvailable = [
                  {
                    method: 'Card',
                    options: 'Credit/Debit/ATM Card',
                    status: 'disabled',
                  },
                  {
                    method: 'Net Banking',
                    options: 'All major banks',
                    status: 'disabled',
                  },
                  {
                    method: 'UPI',
                    options: 'Pay using any UPI app',
                    status: 'disabled',
                  },
                  {
                    method: 'Wallet',
                    options: 'Pay using Wallet',
                    status: 'disabled',
                  },
                  {
                    method: 'Cash on Delivery',
                    options: 'Pay when you receive',
                    status: '',
                  },
                ]

                console.log(isCodSelected)
                return (
                  <>
                    {isOrdConfirm ? (
                      <div className="order-success">
                        <h4> Your order has been placed successfully</h4>
                      </div>
                    ) : (
                      <div className="checkoutcontainer">
                        <div className="pay-close-container">
                          <h2>Payment</h2>
                          <button
                            style={{
                              cursor: 'pointer',
                              backgroundColor: 'transparent',
                              border: 'none',
                            }}
                            type="button"
                            onClick={() => close()}
                          >
                            X
                          </button>
                        </div>
                        <small>Select a payment method</small>

                        <div className="pay-meds-ord-sumry-container">
                          <div className="pay-meds">
                            {paymentMEdsAvailable.map(eachMed => (
                              <div
                                className="method-container"
                                style={{
                                  backgroundColor:
                                    eachMed.status !== 'disabled' && '#F7F3FD',
                                  border:
                                    eachMed.status !== 'disabled' &&
                                    '1px solid #A184E1',
                                }}
                                key={eachMed.method}
                              >
                                <label htmlFor={eachMed.method}>
                                  <h4>{eachMed.method}</h4>
                                  <small>{eachMed.options}</small>
                                </label>

                                <input
                                  id={eachMed.method}
                                  type="radio"
                                  checked={isCodSelected}
                                  readOnly
                                  style={{
                                    cursor:
                                      eachMed.status === 'disabled'
                                        ? 'not-allowed'
                                        : 'pointer',
                                  }}
                                  disabled={eachMed.status}
                                  onClick={() => {
                                    setIsCodSelected(prev => !prev)
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="ord-sumary">
                            <h2>Order Summary</h2>
                            <span className="item-icon-container">
                              <IoBag size={20} fill="purple" />
                              <p className="ord-items">
                                {cartList?.length > 1
                                  ? `${cartList.length} items`
                                  : `${cartList.length} item`}
                              </p>
                            </span>

                            <hr />

                            <span className="ord-sumary-price">
                              <small>Total MRP</small>
                              <strong>₹{totalPrice}.00</strong>
                            </span>
                            <hr />
                          </div>
                        </div>

                        <div className="confirm-ord-btn-container">
                          <button
                            disabled={!isCodSelected}
                            style={{
                              cursor: isCodSelected ? 'pointer' : 'not-allowed',
                            }}
                            type="button"
                            className="confirm-ord-btn"
                            onClick={() => {
                              setIsOrdConfirm(true)
                            }}
                          >
                            <FaBox />
                            <span> Confirm Order</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )
              }}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartSummary
