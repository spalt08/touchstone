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
        d='M3.33325 2.00003V14C3.33325 14.5275 3.91675 14.846 4.36042 14.5608L13.6938 8.56082C14.102 8.29839 14.102 7.70167 13.6938 7.43925L4.36042 1.43925C3.91675 1.15403 3.33325 1.47259 3.33325 2.00003ZM12.1004 8.00003L4.66659 12.7789V3.22114L12.1004 8.00003Z'
        fill='white'
      />
    </svg>
  )
})
