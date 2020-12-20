import React from 'react'
import FullscreenProgressBar, { Props } from './FullscreenProgressBar'

export default {
  title: 'UI / Fullscreen Progress Bar',
  component: FullscreenProgressBar,
}

export const Default = (args: Props) => <FullscreenProgressBar {...args} />
Default.args = {
  progress: 0.5,
}
