import React from 'react'
import Header, { Props } from './Header'
import { withLayout } from 'tests/storybook/decorators'

export default {
  title: 'Layouts / Header',
  component: Header,
  decorators: [withLayout],
}

export const Annonymous = (args: Props) => <Header {...args} />

export const Signed_In = (args: Props) => <Header {...args} />
Signed_In.args = {
  user: {
    name: 'John Doe',
    profileURL: 'https://avatars3.githubusercontent.com/u/9950313?s=64&v=4',
  },
}
