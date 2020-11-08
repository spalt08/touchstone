import React, { memo } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'
import * as icons from 'components/icons'

export type Props = {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: keyof typeof icons
  variant?: 'filled' | 'text' | 'outlined' | 'area'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent) => unknown
}

export default memo(function Button({
  onClick,
  type = 'button',
  children,
  className,
  variant = 'filled',
  icon,
}: Props) {
  const IconComponent = typeof icon === 'string' && icons[icon]

  return (
    <button onClick={onClick} type={type} className={clsx(styles.button, className, styles[variant])}>
      {IconComponent && <IconComponent className={styles.icon} pathClassName={styles.iconFill} />}
      {children}
    </button>
  )
})
