import React, { memo } from 'react'
import { IconProps } from './types'

export default memo(function ({ className, pathClassName }: IconProps) {
  return (
    <svg
      width='14'
      height='14'
      className={className}
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        className={pathClassName}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.8125 9.1875H18.375V11.8125H11.8125V18.375H9.1875V11.8125H2.625V9.1875H9.1875V2.625H11.8125V9.1875Z'
        fill='#2136F2'
      />
    </svg>
  )
})
