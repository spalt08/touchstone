import React from 'react'
import { useGithubCallbackBackgroundProcessing } from 'hooks'

export function OAuthCallback() {
  useGithubCallbackBackgroundProcessing()

  // TODO: display a loader or something
  return <div />
}
