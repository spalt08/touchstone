import React from 'react'
import Checkbox, { Props } from './Checkbox'

export default {
  title: 'UI / Checkbox',
  component: Checkbox,
}

export const Default = (args: Props) => <Checkbox {...args} />
Default.args = {
  label: 'Deferred',
}
