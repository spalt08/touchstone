import React from 'react'
import Loader, { Props } from './Loader'

export default {
  title: 'UI / Loader',
  component: Loader,
}

export const Default = (args: Props) => <Loader {...args} />

export const With_Text = (args: Props) => <Loader {...args} />
With_Text.args = {
  text: 'Hold on! We will redirect you back to the app soon...',
}

export const Small = (args: Props) => <Loader {...args} />
Small.args = {
  size: 'small',
}
