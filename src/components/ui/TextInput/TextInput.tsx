import React, { memo, useEffect, useRef } from 'react'
import clsx from 'clsx'
import styles from './TextInput.module.scss'
import * as icons from 'components/icons'

export type Props = {
  className?: string
  name?: string
  type?: string
  defaultValue?: string
  placeholder?: string
  icon?: keyof typeof icons
}

export default memo(function TextInput({ className, name, icon, type, placeholder, defaultValue }: Props) {
  const IconComponent = typeof icon === 'string' && icons[icon]
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current && defaultValue) {
      ref.current.value = defaultValue
    }
  }, [ref])

  return (
    <div className={clsx(styles.container, className)}>
      {IconComponent && <IconComponent className={styles.icon} pathClassName={styles.iconFill} />}
      <input className={styles.input} type={type} name={name} ref={ref} placeholder={placeholder} />
    </div>
  )
})
