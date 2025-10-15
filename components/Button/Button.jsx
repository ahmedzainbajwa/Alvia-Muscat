'use client'

import styles from './Button.module.css'
import clsx from 'clsx'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  href,
  download,
  onClick,
  type = 'button',
  className,
  ariaLabel,
  ...props 
}) {
  const classes = clsx(
    styles.button,
    styles[variant],
    styles[size],
    className
  )

  if (href) {
    return (
      <a 
        href={href} 
        className={classes}
        download={download}
        aria-label={ariaLabel || children}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button 
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel || children}
      {...props}
    >
      {children}
    </button>
  )
}

