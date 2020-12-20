import React, { memo } from 'react'
import { IconProps } from './types'

export default memo(function ({ className, pathClassName }: IconProps) {
  return (
    <svg
      width='16'
      className={className}
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        className={pathClassName}
        d='M7.5 3C7.22386 3 7 3.22386 7 3.5V4H9V3.5C9 3.22386 8.77614 3 8.5 3H7.5ZM5 3.5V4H2C1.44772 4 1 4.44772 1 5C1 5.55228 1.44772 6 2 6H3V12.5C3 13.8807 4.11929 15 5.5 15H10.5C11.8807 15 13 13.8807 13 12.5V6H14C14.5523 6 15 5.55228 15 5C15 4.44772 14.5523 4 14 4H11V3.5C11 2.11929 9.88071 1 8.5 1H7.5C6.11929 1 5 2.11929 5 3.5ZM11 6H5V12.5C5 12.7761 5.22386 13 5.5 13H10.5C10.7761 13 11 12.7761 11 12.5V6Z'
        fill='#9A9CA8'
      />
    </svg>
  )
})
