import React, { memo } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'
import * as icons from 'components/icons'

export type Props = {
  icon?: keyof typeof icons
  variant?: 'filled' | 'text' | 'outlined'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent) => unknown
}

export default memo(function Button({ onClick, children, variant = 'filled', icon }: Props) {
  const IconComponent = typeof icon === 'string' && icons[icon]

  return (
    <button onClick={onClick} className={clsx(styles.button, styles[variant])}>
      {IconComponent && <IconComponent className={styles.icon} pathClassName={styles.iconFill} />}
      {children}
    </button>
  )
})
