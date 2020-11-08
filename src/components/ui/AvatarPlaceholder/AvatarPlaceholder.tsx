import React, { memo } from 'react'
import clsx from 'clsx'
import styles from './AvatarPlaceholder.module.scss'
import * as icons from 'components/icons'

export type Props = {
  className?: string
}

export default memo(function AvatarPlaceholder({ className }: Props) {
  return (
    <a className={clsx(styles.container, className)}>
      <icons.Person className={styles.icon} />
    </a>
  )
})
