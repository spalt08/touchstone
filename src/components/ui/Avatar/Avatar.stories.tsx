import React from 'react'
import Avatar, { Props } from './Avatar'

export default {
  title: 'UI / Avatar',
  component: Avatar,
}

export const Small = (args: Props) => <Avatar {...args} />
Small.args = {
  size: 'small',
  src: 'https://avatars3.githubusercontent.com/u/9950313?s=64&v=4',
}
