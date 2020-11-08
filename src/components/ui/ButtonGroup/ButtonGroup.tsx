import React, { memo, useCallback, useState } from 'react'
import clsx from 'clsx'
import styles from './ButtonGroup.module.scss'

export type Props = {
  className?: string
  name: string
  displayValues: string[]
  values: string[]
  defaultValue?: string
}

export default memo(function ButtonGroup({ className, name, displayValues, values, defaultValue = values[0] }: Props) {
  const [selected, setSelected] = useState(defaultValue)

  const onSelect = useCallback((event) => {
    setSelected(event.currentTarget.value)
  }, [])

  return (
    <div className={clsx(styles.container, className)}>
      {values.map((val, index) => (
        <div key={val} className={clsx(styles.option, { [styles.available]: val !== selected })}>
          <input type='radio' name={name} value={val} className={styles.radio} onChange={onSelect} />
          {displayValues[index]}
        </div>
      ))}
    </div>
  )
})
