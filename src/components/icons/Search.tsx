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
        d='M8.33329 15C4.65139 15 1.66663 12.0153 1.66663 8.33335C1.66663 4.65145 4.65139 1.66669 8.33329 1.66669C12.0152 1.66669 15 4.65145 15 8.33335C15 9.87395 14.4774 11.2925 13.5998 12.4214L18.0892 16.9108L16.9107 18.0893L12.4213 13.5999C11.2924 14.4775 9.87388 15 8.33329 15ZM13.3333 8.33335C13.3333 11.0948 11.0947 13.3334 8.33331 13.3334C5.57189 13.3334 3.33331 11.0948 3.33331 8.33335C3.33331 5.57193 5.57189 3.33335 8.33331 3.33335C11.0947 3.33335 13.3333 5.57193 13.3333 8.33335Z'
        fill='#9A9CA8'
      />
    </svg>
  )
})
