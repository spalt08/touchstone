import React, { memo } from 'react'
import styles from './Section.module.scss'

type Props = {
  children: React.ReactNode
}

export default memo(function Section({ children }: Props) {
  return <section className={styles.section}>{children}</section>
})
