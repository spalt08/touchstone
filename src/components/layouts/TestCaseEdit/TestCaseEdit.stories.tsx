import React from 'react'
import TestCaseEdit, { Props } from './TestCaseEdit'
import { withLayout } from 'tests/storybook/decorators'

export default {
  title: 'Layouts / Test Case Edit',
  component: TestCaseEdit,
  decorators: [withLayout],
}

export const Default = (args: Props) => <TestCaseEdit {...args} />
Default.args = {
  title: 'Test Case 1',
  resultText: '8,780,528 ops/sec ±0.41% (67 runs sampled)',
}
