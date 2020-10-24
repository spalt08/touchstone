import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
import styles from './CodeEditor.module.scss'

export type Props = {
  name?: string
  register?: () => (ref: HTMLTextAreaElement) => void
  className?: string
  placeholder?: string
  defaultValue?: string
}

export default function CodeEditor({ name, register, placeholder, defaultValue, className }: Props) {
  const [value, setValue] = useState(defaultValue || '')
  const lines = value.split('\n').length
  const height = lines * 20 + 40

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  return (
    <textarea
      name={name}
      ref={register && register()}
      spellCheck={false}
      value={value}
      onChange={handleChange}
      style={{ height }}
      className={clsx(styles.editor, className)}
      placeholder={placeholder}
    />
  )
}
