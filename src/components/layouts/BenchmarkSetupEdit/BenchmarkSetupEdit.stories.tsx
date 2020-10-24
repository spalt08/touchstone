import React from 'react'
import BenchmarkSetupEdit, { Props } from './BenchmarkSetupEdit'
import { withLayout } from 'tests/storybook/decorators'

export default {
  title: 'Layouts / Benchmark Setup Edit',
  component: BenchmarkSetupEdit,
  decorators: [withLayout],
}

export const Default = (args: Props) => <BenchmarkSetupEdit {...args} />
