import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Cross } from 'components/icons'
import PopupContainer from '../PopupContainer/PopupContainer'
import styles from './PopupRegular.module.scss'

export type Props = {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => unknown
}

export default memo(function PopupRegular({ className, children, onClose, isOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldClosePopup, setShouldClosePopup] = useState(false)
  const [isMounted, setMounted] = useState(isOpen)

  const handleKeyboardEvent = useCallback((event: KeyboardEvent) => {
    const key = event.key || event.keyCode

    if (key === 'Escape' || key === 'Esc' || key === 27) {
      event.preventDefault()
      onClose()
    }
  }, [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!ref.current || !(event.target instanceof Node)) {
      return
    }

    // TODO: handling click outside when popup was just opened
    if (!ref.current.parentElement?.contains(event.target)) {
      return
    }

    if (!ref.current.contains(event.target)) {
      onClose()
    }
  }, [])

  const handleAnimationEnd = useCallback(() => {
    if (shouldClosePopup && isMounted && !isOpen) {
      setMounted(false)
      setShouldClosePopup(false)
    }
  }, [isOpen, isMounted, shouldClosePopup])

  // detach listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keyup', handleKeyboardEvent)
    }
  }, [])

  // attach listeners
  useEffect(() => {
    if (isMounted) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keyup', handleKeyboardEvent)
    } else {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keyup', handleKeyboardEvent)
    }
  }, [isMounted])

  // handle popup animations
  useEffect(() => {
    if (isOpen === false && isMounted === true && !shouldClosePopup) {
      setShouldClosePopup(true)
    }

    if (isOpen === true && isMounted === false) {
      setMounted(true)
    }
  }, [isOpen])

  const containerClassName = clsx(styles.container, className, { [styles.containerClosing]: shouldClosePopup })

  return (
    <PopupContainer isMounted={isMounted} shouldClose={shouldClosePopup}>
      <div ref={ref} className={containerClassName} onAnimationEnd={handleAnimationEnd}>
        <div className={styles.close} onClick={onClose}>
          <Cross pathClassName={styles.closeFill} />
        </div>
        {children}
      </div>
    </PopupContainer>
  )
})
