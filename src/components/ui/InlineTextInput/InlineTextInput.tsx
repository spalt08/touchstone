import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './InlineTextInput.module.scss'

export type Props = {
  onChange?: (value: string) => unknown
  className?: string
  placeholder?: string
  defaultValue?: string
}

export default function InlineTextInput({ onChange, className, defaultValue, placeholder }: Props) {
  const [value, setValue] = useState(defaultValue?.toString() || '')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  const handleBlur = useCallback(() => {
    if (!value && defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  // notify all changes
  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value])

  return (
    <div className={clsx(styles.container, className)}>
      {value}
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        className={clsx(styles.input, className)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}
