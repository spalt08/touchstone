import React, { memo, useCallback, useState } from 'react'
import clsx from 'clsx'
import { Logo, Button, InlineTextInput, AvatarPlaceholder, Avatar } from 'components/ui'
import { LoginRequiredPopup } from 'components/popups'
import { useAccount } from 'hooks'
import styles from './Header.module.scss'

export type Props = {
  className?: string
}

export default memo(function Header() {
  const { data: user } = useAccount()
  const [isLoginPopupOpened, setLoginPopupOpened] = useState(false)

  const handleLoginIntent = useCallback(() => setLoginPopupOpened(true), [])

  return (
    <>
      <header className={styles.container}>
        <div className={styles.section}>
          <Logo className={styles.logo} />
          <Button variant='text' icon='Plus'>
            Create New
          </Button>
        </div>
        <div className={clsx(styles.section, styles.name)}>
          <InlineTextInput className={styles.nameEdit} defaultValue='Untitled benchmark' />
          {/* 3 min ago */}
        </div>
        <div className={styles.section}>
          <div className={styles.disclaimer}>Save to fork or share</div>
          <Button variant='outlined' onClick={handleLoginIntent}>
            Save
          </Button>
          {user?.avatar_url ? (
            <Avatar className={styles.avatar} src={user?.avatar_url} size='small' />
          ) : (
            <AvatarPlaceholder className={styles.avatar} onClick={handleLoginIntent} />
          )}
        </div>
      </header>
      <LoginRequiredPopup isOpen={isLoginPopupOpened} onClose={() => setLoginPopupOpened(false)} />
    </>
  )
})
