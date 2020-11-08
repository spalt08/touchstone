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
}

export const Slower = (args: Props) => <TestCaseEdit {...args} />
Slower.args = {
  title: 'Test Case 2',
  resultText: '8,780,528 ops/sec ±0.41% (67 runs sampled)',
  opsec: 50,
  opsecMax: 100,
}

export const Fastest = (args: Props) => <TestCaseEdit {...args} />
Fastest.args = {
  title: 'Test Case 3',
  resultText: '8,780,528 ops/sec ±0.41% (67 runs sampled)',
  opsec: 100,
  opsecMax: 100,
}

export const Running = (args: Props) => <TestCaseEdit {...args} />
Running.args = {
  title: 'Test Case 4',
  isRunning: true,
}
