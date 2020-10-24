import React, { memo } from 'react'
import styles from './Wrapper.module.scss'

type Props = {
  children: React.ReactNode
}

export default memo(function Wrapper({ children }: Props) {
  return <section className={styles.wrapper}>{children}</section>
})
