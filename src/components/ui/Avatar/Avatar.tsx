import React, { memo } from 'react'
import clsx from 'clsx'
import styles from './Avatar.module.scss'

export type Props = {
  className?: string
  src?: string
  size?: 'small'
}

export default memo(function Avatar({ className, src, size = 'small' }: Props) {
  return <img src={src} className={clsx(styles.avatar, className, styles[size])} />
})
