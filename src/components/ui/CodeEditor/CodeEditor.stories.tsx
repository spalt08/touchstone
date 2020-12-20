import React from 'react'
import CodeEditor, { Props } from './CodeEditor'
import { withLayout } from 'tests/storybook/decorators'

export default {
  title: 'UI / Code Editor',
  component: CodeEditor,
  decorators: [withLayout],
}

export const Default = (args: Props) => <CodeEditor {...args} />
Default.args = {
  defaultValue: 'const hello = "world"',
}
