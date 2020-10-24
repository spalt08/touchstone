import React, { memo } from 'react'
import { Logo, Button, InlineTextInput } from 'components/ui'
import styles from './Header.module.scss'
import clsx from 'clsx'

export default memo(function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.section}>
        <Logo className={styles.logo} />
        <Button variant='text' icon='Plus'>
          Create New
        </Button>
      </div>
      <div className={clsx(styles.section, styles.name)}>
        <InlineTextInput className={styles.nameEdit} defaultValue='Untitled benchmark' /> 3 min ago
      </div>
      <div className={styles.section}>
        <Button variant='outlined' icon='Share'>
          Share
        </Button>
      </div>
    </header>
  )
})
