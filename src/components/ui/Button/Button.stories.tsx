import React from 'react'
import Button, { Props } from './Button'

export default {
  title: 'UI / Button',
  component: Button,
}

export const Filled = (args: Props) => <Button {...args}>Button</Button>

export const Filled_With_Icon = (args: Props) => <Button {...args}>Run tests</Button>
Filled_With_Icon.args = {
  icon: 'Play',
}

export const Text = (args: Props) => <Button {...args}>Show setup settings</Button>
Text.args = {
  icon: 'CirclePlus',
  variant: 'text',
}

export const Outlined = (args: Props) => <Button {...args}>Share</Button>
Outlined.args = {
  icon: 'Share',
  variant: 'outlined',
}
