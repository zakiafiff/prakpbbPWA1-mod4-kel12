import { useRef } from 'react'

function GunCard({ gun, onAddToCart }) {
  const popup = useRef(null)

  return (
    <li className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <button
        type="button"
        className="card-btn"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
          padding: '12px',
          width: '100%'
        }}
        onClick={() => popup.current.showModal()}
      >
        {/* Gambar diset tinggi & lebar tetap agar proporsional */}
        <img
          className="card-img"
          src={gun.image}
          alt={gun.name}
          style={{ width: '100%', height: '120px', objectFit: 'contain', marginBottom: '12px' }}
        />
        
        {/* Konten teks menggunakan flex-grow agar mengisi sisa area */}
        <span
          className="card-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            width: '100%',
            flexGrow: 1,
            justifyContent: 'flex-start'
          }}
        >
          <span className="name display">{gun.name}</span>
          <span className="type">
            {gun.type} · {gun.caliber}
          </span>
          <span className="price">${gun.price.toLocaleString()}</span>
        </span>
      </button>

      {/* Tombol Add to Cart tetap di paling bawah */}
      <button
        type="button"
        className="add-cart-btn"
        style={{ marginTop: 'auto', width: '100%' }}
        onClick={() => onAddToCart(gun)}
      >
        Add to Cart
      </button>

      {/* Popup Dialog Modal */}
      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img
          className="popup-img"
          src={gun.image}
          alt={gun.name}
          style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
        />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <form method="dialog">
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </li>
  )
}

export default GunCard