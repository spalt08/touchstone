import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './FullscreenProgressBar.module.scss'

export type Props = {
  className?: string
  progress: number
}

export default function FullscreenProgressBar({ className, progress }: Props) {
  const [width, setWidth] = useState(progress * 100)

  useEffect(() => {
    if (progress === 0) {
      setWidth(0)
    } else {
      setWidth(Math.max(0, Math.min(progress * 100, 100)))
    }
  }, [progress])

  return <div className={clsx(styles.container, className)} style={{ width: `${width}%` }} />
}
