import React from 'react'
import '../src/styles/global.scss'
import './styles.scss'

export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
}

export const decorators = [
  (Story) => (
    <Story />
  ),
]
