import React, { memo } from 'react'
import { IconProps } from './types'

export default memo(function ({ className, pathClassName }: IconProps) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        className={pathClassName}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.66664 10.6667V3.60947L10.8619 5.80474L11.8047 4.86193L7.99997 1.05719L4.19524 4.86193L5.13805 5.80474L7.33331 3.60947V10.6667H8.66664ZM14 13.3333V7.33333H12.6667V13.3333H3.33333V7.33333H2V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333Z'
        fill='#141137'
      />
    </svg>
  )
})
