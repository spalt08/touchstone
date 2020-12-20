import React, { memo } from 'react'
import { Button, Logo, PopupRegular } from 'components/ui'
import styles from './LoginRequiredPopup.module.scss'
import { PopupDefaultProps } from '../types'

export type Props = PopupDefaultProps

export default memo(function LoginRequiredPopup({ isOpen, onClose }: Props) {
  return (
    <PopupRegular isOpen={isOpen} className={styles.container} onClose={onClose}>
      <Logo />
      <div className={styles.description}>
        <h3>Nice to meet you!</h3>
        <div>Log in to save and share your benchmarks</div>
      </div>
      <Button size='big-stretched' icon='Github'>
        Login with GitHub
      </Button>
    </PopupRegular>
  )
})
