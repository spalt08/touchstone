import React, { memo } from 'react'
import { IconProps } from './types'

export default memo(function ({ className, pathClassName }: IconProps) {
  return (
    <svg
      className={className}
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        className={pathClassName}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 1.66666H12C12.7364 1.66666 13.3333 2.41286 13.3333 3.33333V4.16666H15.8333C16.7538 4.16666 17.5 4.91286 17.5 5.83333V7.5C17.5 8.36422 16.8422 9.07481 16 9.15843V16.5C16 17.6046 15.1046 18.5 14 18.5H6C4.89543 18.5 4 17.6046 4 16.5V9.15843C3.15778 9.07481 2.5 8.36422 2.5 7.5V5.83333C2.5 4.91286 3.24619 4.16666 4.16667 4.16666H6.66667V3.33333C6.66667 2.41286 7.26362 1.66666 8 1.66666ZM4.16667 5.83333H6.66667H13.3333H15.8333V7.5H4.16667V5.83333ZM6 9.16666H14V16.5L6 16.5V9.16666ZM11.6667 3.33333V4.16666H8.33333V3.33333H11.6667Z'
        fill='#7F8194'
      />
    </svg>
  )
})
