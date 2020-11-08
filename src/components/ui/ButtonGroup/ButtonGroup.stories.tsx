import React from 'react'
import ButtonGroup, { Props } from './ButtonGroup'

export default {
  title: 'UI / Button Group',
  component: ButtonGroup,
}

export const Default = (args: Props) => <ButtonGroup {...args} />
Default.args = {
  name: 'platform',
  values: ['javascript', 'html', 'ts'],
  displayValues: ['JavaScript', 'HTML', 'TypeScript'],
}
