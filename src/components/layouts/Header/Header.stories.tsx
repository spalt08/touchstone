import React from 'react'
import Header from './Header'
import { withLayout } from 'tests/storybook/decorators'

export default {
  title: 'Layouts / Header',
  component: Header,
  decorators: [withLayout],
}

export const Default = () => <Header />
