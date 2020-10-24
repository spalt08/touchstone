import React from 'react'
import clsx from 'clsx'
import styles from './RelativePerformanceIndicator.module.scss'
import { CircleArrowBottom, CircleTarget } from 'components/icons'

export type Props = {
  max: number
  value: number
  className?: string
}

export default function RelativePerformanceIndicator({ className, max = 1, value = 1 }: Props) {
  const percentage = Math.ceil((1 - value / max) * 100)

  return percentage < 1 ? (
    <div className={clsx(styles.container, styles.fastest, className)}>
      <CircleTarget className={styles.icon} pathClassName={styles.iconFill} /> Fastest
    </div>
  ) : (
    <div className={clsx(styles.container, styles.slower, className)}>
      <CircleArrowBottom className={styles.icon} pathClassName={styles.iconFill} /> {percentage}% Slower
    </div>
  )
}
