import React, { memo } from 'react'
import { IconProps } from './types'

export default memo(function ({ className, pathClassName }: IconProps) {
  return (
    <svg
      width='12'
      height='12'
      className={className}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        className={pathClassName}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75ZM4.5 7.875V10.125H13.5V7.875H4.5Z'
        fill='#2B38AE'
      />
    </svg>
  )
})
