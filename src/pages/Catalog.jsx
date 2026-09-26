import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const FILTERS = ['All', 'Pistol', 'Rifle', 'Shotgun', 'Rocket Launcher', 'Heavy Machine Gun']

function Catalog({ onAddToCart }) {
  const [selectedType, setSelectedType] = useState('All')
  const visibleGuns = selectedType === 'All'
    ? GUNS
    : GUNS.filter((gun) => gun.type === selectedType)

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A compact catalog of firearms and heavy hardware. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{visibleGuns.length} pieces</span>
        </div>
        <div className="filters" aria-label="Filter by weapon type">
          {FILTERS.map((type) => (
            <button
              key={type}
              type="button"
              className={selectedType === type ? 'filter-btn active' : 'filter-btn'}
              aria-pressed={selectedType === type}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <ul className="stock">
          {visibleGuns.map((gun) => (
            <GunCard key={gun.name} gun={gun} onAddToCart={onAddToCart} />
          ))}
        </ul>
      </section>
    </>
  )
}

export default Catalog
