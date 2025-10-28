'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './CustomCountrySelect.module.css'

export default function CustomCountrySelect({ countryCodes, value, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)

  // Find selected country
  const selectedCountry = countryCodes.find(country => country.code === value) || countryCodes[0]

  // Filter countries based on search query
  const filteredCountries = countryCodes.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.includes(searchQuery)
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Find and scroll to selected option when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const selectedIndex = filteredCountries.findIndex(
        country => country.code === value
      )
      if (selectedIndex >= 0) {
        const option = inputRef.current.querySelectorAll('li')[selectedIndex]
        if (option) {
          option.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
      }
    }
  }, [isOpen, value, filteredCountries])

  const handleSelect = (code) => {
    onChange({ target: { value: code } })
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSearchQuery('')
    }
  }

  return (
    <div ref={dropdownRef} className={`${styles.customSelect} ${className}`}>
      {/* Selected value display - clickable button */}
      <button
        type="button"
        onClick={handleToggle}
        className={styles.selectButton}
        aria-label="Select country code"
        aria-expanded={isOpen}
      >
        <span className={styles.selectedText}>
          {selectedCountry.flag} {selectedCountry.code}
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className={styles.dropdown}>
          {/* Search input */}
          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Country list */}
          <ul ref={inputRef} className={styles.optionsList}>
            {filteredCountries.length === 0 ? (
              <li className={styles.noResults}>No countries found</li>
            ) : (
              filteredCountries.map((country, index) => (
                <li
                  key={`${country.code}-${index}`}
                  className={`${styles.option} ${country.code === value ? styles.selected : ''}`}
                  onClick={() => handleSelect(country.code)}
                  role="option"
                  aria-selected={country.code === value}
                >
                  <span className={styles.optionFlag}>{country.flag}</span>
                  <span className={styles.optionText}>
                    {country.name} {country.code}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

