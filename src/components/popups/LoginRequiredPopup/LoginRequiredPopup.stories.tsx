import React from 'react'
import LoginRequiredPopup, { Props } from './LoginRequiredPopup'

export default {
  title: 'Popups / Login Required Popup',
  component: LoginRequiredPopup,
}

export const Default = (args: Props) => <LoginRequiredPopup {...args} />
Default.args = {
  isOpen: true,
}
