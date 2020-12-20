import React from 'react'
import BenchmarkEdit, { Props } from './BenchmarkEdit'
import { withLayout } from 'tests/storybook/decorators'

export default {
  title: 'Layouts / Benchmark Edit',
  component: BenchmarkEdit,
  decorators: [withLayout],
}

export const Default = (args: Props) => <BenchmarkEdit {...args} onTestRun={console.log} />
