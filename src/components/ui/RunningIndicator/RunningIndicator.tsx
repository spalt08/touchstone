import React from 'react'
import clsx from 'clsx'
import styles from './RunningIndicator.module.scss'
import { CircleTarget } from 'components/icons'

export type Props = {
  className?: string
}

export default function RunningIndicator({ className }: Props) {
  return (
    <div className={clsx(styles.container, className)}>
      Running now <CircleTarget className={styles.icon} pathClassName={styles.iconFill} />
    </div>
  )
}
