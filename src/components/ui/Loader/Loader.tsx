import React from 'react'
import clsx from 'clsx'
import styles from './Loader.module.scss'

export type Props = {
  className?: string
  size?: 'medium' | 'small' | 'fullscreen'
  text?: string
}

export default function Loader({ text, size = 'medium', className }: Props) {
  return (
    <div className={clsx(styles.container, className, styles[size])}>
      <div className={styles.loader} />
      {text && <div className={styles.text}>{text}</div>}
    </div>
  )
}
