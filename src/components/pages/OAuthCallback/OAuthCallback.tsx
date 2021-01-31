import React from 'react'
import { useGithubCallbackBackgroundProcessing } from 'hooks'
import { Loader } from 'components/ui'

export function OAuthCallback() {
  useGithubCallbackBackgroundProcessing()

  return <Loader size='fullscreen' text='Hold on! We will redirect you back to the app soon...' />
}
