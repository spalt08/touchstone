import React, { memo } from 'react'

export type Props = {
  className?: string
}

export default memo(function Logo({ className }: Props) {
  return (
    <svg
      width='20'
      className={className}
      height='24'
      viewBox='0 0 20 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 1.6C0 0.716345 0.767512 0 1.71429 0H11.4286C16.1624 0 20 3.58172 20 8C20 12.4183 16.1624 16 11.4286 16H0V1.6Z'
        fill='url(#paint0_linear)'
      />
      <path
        d='M0 8H11.4286C16.1624 8 20 11.5817 20 16C20 20.4183 16.1624 24 11.4286 24H1.71429C0.767512 24 0 23.2837 0 22.4V8Z'
        fill='url(#paint1_linear)'
      />
      <defs>
        <linearGradient id='paint0_linear' x1='20' y1='0' x2='0' y2='0' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2136F2' />
          <stop offset='1' stopColor='#2136F2' stopOpacity='0.25' />
        </linearGradient>
        <linearGradient id='paint1_linear' x1='20' y1='8' x2='0' y2='8' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#1BF2D8' />
          <stop offset='1' stopColor='#1BF2D8' stopOpacity='0.4' />
        </linearGradient>
      </defs>
    </svg>
  )
})
