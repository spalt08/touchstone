import React from 'react'
import TestCaseEdit, { Props } from './TestCaseEdit'
import { withLayout } from 'tests/storybook/decorators'

export default {
  title: 'Layouts / Test Case Edit',
  component: TestCaseEdit,
  decorators: [withLayout],
  argTypes: { onDefferedUpdated: { action: 'submit' } },
}

export const Default = (args: Props) => <TestCaseEdit {...args} />
Default.args = {
  title: 'Test Case',
}

export const Filled = (args: Props) => <TestCaseEdit {...args} />
Filled.args = {
  testSuite: {
    title: 'Sort by default',
    code: 'data.sort()',
    isDeffered: true,
  },
}

export const Running = (args: Props) => <TestCaseEdit {...args} />
Running.args = {
  isRunning: true,
  testSuite: {
    title: 'Sort by default',
    code: 'data.sort()',
    isDeffered: true,
  },
}

export const With_Positive_Result = (args: Props) => <TestCaseEdit {...args} />
With_Positive_Result.args = {
  testSuite: {
    title: 'Sort by default',
    code: 'data.sort()',
    isDeffered: true,
  },
  testResult: {
    hz: 123456788,
    rme: 1.34,
    size: 63,
  },
  bestTestResult: {
    hz: 123456788,
  },
}

export const With_Negative_Result = (args: Props) => <TestCaseEdit {...args} />
With_Negative_Result.args = {
  testSuite: {
    title: 'Sort by default',
    code: 'data.sort()',
    isDeffered: true,
  },
  testResult: {
    hz: 123456788,
    rme: 1.34,
    size: 63,
  },
  bestTestResult: {
    hz: 923456788,
  },
}

// export const Slower = (args: Props) => <TestCaseEdit {...args} />
// Slower.args = {
//   title: 'Test Case 2',
//   resultText: '8,780,528 ops/sec ±0.41% (67 runs sampled)',
//   opsec: 50,
//   opsecMax: 100,
// }

// export const Fastest = (args: Props) => <TestCaseEdit {...args} />
// Fastest.args = {
//   title: 'Test Case 3',
//   resultText: '8,780,528 ops/sec ±0.41% (67 runs sampled)',
//   opsec: 100,
//   opsecMax: 100,
// }

// export const Running = (args: Props) => <TestCaseEdit {...args} />
// Running.args = {
//   title: 'Test Case 4',
//   isRunning: true,
// }
