import React, { memo } from 'react'
import clsx from 'clsx'
import styles from './Checkbox.module.scss'

export type Props = {
  className?: string
  label?: string
  name?: string
}

export default memo(function Checkbox({ className, label, name }: Props) {
  return (
    <label className={clsx(styles.container, className)}>
      <input name={name} type='checkbox' className={styles.input} />
      <div className={styles.fakeCheckbox} />
      <span className={styles.label}>{label}</span>
    </label>
  )
})
