'use client'

import styles from './Chip.module.css'
import clsx from 'clsx'

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  [key: string]: any;
}

export default function Chip({ 
  children, 
  active = false,
  onClick,
  ariaLabel,
  ...props 
}: ChipProps) {
  return (
    <button
      className={clsx(styles.chip, active && styles.active)}
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-pressed={active}
      {...props}
    >
      {children}
    </button>
  )
}

