import React, { useState } from 'react'
import { Button } from 'components/ui'
import PopupRegular, { Props as PopupRegularProps } from './PopupRegular/PopupRegular'

export default {
  title: 'UI / Popups',
}

export const Regular = (args: PopupRegularProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Popup</Button>
      <PopupRegular {...args} isOpen={isOpen} onClose={() => setOpen(false)}>
        <h3>Example Popup</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis ligula nisl. Phasellus lobortis
          tempor neque a commodo. Ut tincidunt ipsum justo, ac ullamcorper erat consequat eget. Aenean viverra purus non
          mattis sodales.
        </p>
      </PopupRegular>
    </>
  )
}
