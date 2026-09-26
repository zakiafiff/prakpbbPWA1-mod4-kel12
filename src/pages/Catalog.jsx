import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const FILTERS = ['All', 'Pistol', 'Rifle', 'Shotgun', 'Rocket Launcher', 'Heavy Machine Gun']
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'name-asc', label: 'Nama (A-Z)' },
  { value: 'name-desc', label: 'Nama (Z-A)' },
  { value: 'price-asc', label: 'Harga (Termurah)' },
  { value: 'price-desc', label: 'Harga (Termahal)' },
]

function Catalog({ onAddToCart }) {
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')
  const visibleGuns = GUNS
    .filter((gun) => selectedType === 'All' || gun.type === selectedType)
    .filter((gun) => gun.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    .sort((firstGun, secondGun) => {
      switch (sortBy) {
        case 'name-asc':
          return firstGun.name.localeCompare(secondGun.name)
        case 'name-desc':
          return secondGun.name.localeCompare(firstGun.name)
        case 'price-asc':
          return firstGun.price - secondGun.price
        case 'price-desc':
          return secondGun.price - firstGun.price
        default:
          return 0
      }
    })

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
        <div className="catalog-controls">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search guns by name"
            aria-label="Search guns by name"
          />
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort guns"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {visibleGuns.length === 0 ? (
          <p>no guns match</p>
        ) : (
          <ul className="stock" style={{ gridAutoRows: '1fr' }}>
            {visibleGuns.map((gun) => (
              <GunCard key={gun.name} gun={gun} onAddToCart={onAddToCart} />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default Catalog
