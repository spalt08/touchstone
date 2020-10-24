import React from 'react'
import InlineTextInput, { Props } from './InlineTextInput'

export default {
  title: 'UI /Inline Text Input',
  component: InlineTextInput,
}

export const Default = (args: Props) => <InlineTextInput {...args} />
Default.args = {
  defaultValue: 'Some text',
}
