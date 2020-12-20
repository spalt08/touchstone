import React, { memo } from 'react'
import clsx from 'clsx'

import styles from './PopupContainer.module.scss'

export type Props = {
  children: React.ReactNode
  isMounted: boolean
  shouldClose: boolean
}

export default memo(function PopupContainer({ children, isMounted, shouldClose }: Props) {
  if (isMounted) {
    return <div className={clsx(styles.opaco, { [styles.closing]: shouldClose })}>{children}</div>
  }

  return null
})
