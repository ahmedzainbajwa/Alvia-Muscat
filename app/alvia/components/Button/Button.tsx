'use client'

import styles from './Button.module.css'
import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'circular';
  size?: 'small' | 'medium' | 'large' | 'cta';
  href?: string;
  download?: boolean | string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  [key: string]: any;
}

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
}: ButtonProps) {
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
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
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
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      {...props}
    >
      {children}
    </button>
  )
}

