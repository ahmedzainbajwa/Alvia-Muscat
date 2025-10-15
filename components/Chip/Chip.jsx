'use client'

import styles from './Chip.module.css'
import clsx from 'clsx'

export default function Chip({ 
  children, 
  active = false,
  onClick,
  ariaLabel,
  ...props 
}) {
  return (
    <button
      className={clsx(styles.chip, active && styles.active)}
      onClick={onClick}
      aria-label={ariaLabel || children}
      aria-pressed={active}
      {...props}
    >
      {children}
    </button>
  )
}

