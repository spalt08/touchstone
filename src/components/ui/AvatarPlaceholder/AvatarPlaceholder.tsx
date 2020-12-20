import React, { memo } from 'react'
import clsx from 'clsx'
import styles from './AvatarPlaceholder.module.scss'
import { Person } from 'components/icons'

export type Props = {
  className?: string
  onClick?: (event: React.MouseEvent) => unknown
}

export default memo(function AvatarPlaceholder({ className, onClick }: Props) {
  return (
    <a className={clsx(styles.container, className)} onClick={onClick}>
      <Person className={styles.icon} pathClassName={styles.iconFill} />
    </a>
  )
})
