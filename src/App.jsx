import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Checkout from './pages/Checkout.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])

  function addToCart(gun) {
    setCart((currentCart) => [...currentCart, gun])
  }

  function handleCheckout() {
    setCart([])
  }

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={cart.length} />

      <main className="main">
        {tab === 'Catalog' && <Catalog onAddToCart={addToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
        {tab === 'Checkout' && <Checkout cart={cart} onCheckout={handleCheckout} />}
      </main>

      <Footer />
    </div>
  )
}

export default App
