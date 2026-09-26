import { useState } from 'react'

function Checkout({ cart, onCheckout }) {
  const [paymentComplete, setPaymentComplete] = useState(false)
  const total = cart.reduce((sum, gun) => sum + gun.price, 0)

  function handlePay() {
    onCheckout()
    setPaymentComplete(true)
  }

  return (
    <section className="page checkout">
      <h1 className="display">Checkout</h1>

      {paymentComplete && cart.length === 0 && (
        <p className="checkout-message" role="status">Payment complete. Thank you for your order.</p>
      )}

      {cart.length === 0 ? (
        <p className="lede">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((gun, index) => (
              <li className="cart-item" key={`${gun.name}-${index}`}>
                <span>
                  <strong>{gun.name}</strong>
                  <span className="cart-type">{gun.type} · {gun.caliber}</span>
                </span>
                <span className="price">${gun.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total</span>
            <strong className="price">${total.toLocaleString()}</strong>
          </div>
          <button className="pay-btn" type="button" onClick={handlePay}>
            Checkout / Pay
          </button>
        </>
      )}
    </section>
  )
}

export default Checkout