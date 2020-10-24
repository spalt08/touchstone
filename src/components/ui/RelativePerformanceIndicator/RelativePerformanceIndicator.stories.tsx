import React from 'react'
import RelativePerformanceIndicator, { Props } from './RelativePerformanceIndicator'

export default {
  title: 'UI / Relative Performance Indicator',
  component: RelativePerformanceIndicator,
}

export const Slower = (args: Props) => <RelativePerformanceIndicator {...args} />
Slower.args = {
  max: 100,
  value: 66,
}

export const Fastest = (args: Props) => <RelativePerformanceIndicator {...args} />
Fastest.args = {
  max: 100,
  value: 100,
}
