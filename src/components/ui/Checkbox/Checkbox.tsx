import React, { memo, useCallback, useState } from 'react'
import clsx from 'clsx'
import styles from './Checkbox.module.scss'

export type Props = {
  className?: string
  label?: string
  name?: string
  defaultValue?: boolean
  onChange?: (value: boolean) => unknown
}

export default memo(function Checkbox({ className, defaultValue, label, name, onChange }: Props) {
  const [isChecked, setChecked] = useState(defaultValue || false)

  const handleCheckboxClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)

    if (onChange) {
      onChange(event.target.checked)
    }
  }, [])

  return (
    <label className={clsx(styles.container, className)}>
      <input name={name} type='checkbox' checked={isChecked} className={styles.input} onChange={handleCheckboxClick} />
      <div className={styles.fakeCheckbox} />
      <span className={styles.label}>{label}</span>
    </label>
  )
})
