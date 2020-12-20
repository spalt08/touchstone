import React, { memo } from 'react'
import { IconProps } from './types'

export default memo(function ({ className, pathClassName }: IconProps) {
  return (
    <svg
      className={className}
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path className={pathClassName} d='M1 1L13 13' stroke='#9A9CA8' strokeWidth='2' strokeLinecap='round' />
      <path className={pathClassName} d='M1 13L13 0.999999' stroke='#9A9CA8' strokeWidth='2' strokeLinecap='round' />
    </svg>
  )
})
