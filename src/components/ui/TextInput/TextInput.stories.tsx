import React from 'react'
import TextInput, { Props } from './TextInput'
import styles from './TextInput.module.scss'

export default {
  title: 'UI / Text Input',
  component: TextInput,
}

export const Default = (args: Props) => <TextInput {...args} />
Default.args = {
  placeholder: 'Type text here',
}

export const With_Icon = (args: Props) => <TextInput {...args} />
With_Icon.args = {
  className: styles.__storybook,
  placeholder: 'Paste a link to required script or search for NPM package...',
  icon: 'Search',
}
