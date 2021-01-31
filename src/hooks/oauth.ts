import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { GITHUB_CLIENT_ID } from 'const'
import { generateId } from 'helpers'
import { useGithubLoginMutation } from './api/user'
import { useAuthorization } from './auth'

const origin = document.location.origin
const fieldGithubState = 'github_oauth_state'
const fieldRedirectUrl = 'github_oauth_redirect_url'

/**
 * Ref: https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#1-request-a-users-github-identity
 */
export function useGithubRedirect() {
  const redirectUri = encodeURIComponent(origin + '/oauth')
  const state = generateId(20)
  const redirectUrl = document.location.href.slice(document.location.origin.length)

  localStorage.setItem(fieldGithubState, state)
  localStorage.setItem(fieldRedirectUrl, redirectUrl)

  return (
    `https://github.com/login/oauth/authorize` +
    `?client_id=${GITHUB_CLIENT_ID}` +
    `&state=${state}` +
    `&allow_signup=true` +
    `&scope=user:email` +
    `&redirect_uri=${redirectUri}`
  )
}

/**
 * Obtain an access_token and send it to API to obtain an authorization token
 * Ref: https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
 */
export function useGithubCallbackBackgroundProcessing() {
  const [sendLoginRequest] = useGithubLoginMutation()
  const { setToken } = useAuthorization()
  const { search } = useLocation()
  const history = useHistory()

  const { code, state } = search
    .replace('?', '')
    .split('&')
    .reduce<Record<string, string>>((acc, subString) => {
      const [key, value] = subString.split('=')
      acc[key] = value
      return acc
    }, {})

  const localState = localStorage.getItem(fieldGithubState)
  const localRedirectUrl = localStorage.getItem(fieldRedirectUrl) || origin

  // TODO: display error
  function redirect() {
    localStorage.removeItem(fieldGithubState)
    localStorage.removeItem(fieldRedirectUrl)
    history.replace(localRedirectUrl)
  }

  if (localState !== state) {
    redirect()
    return
  }

  if (!code || !state) {
    redirect()
    return
  }

  useEffect(() => {
    sendLoginRequest({ code, state })
      .then((data) => {
        if (!data) {
          throw new Error('Unexpected error')
        }

        setToken(data.token)
        redirect()
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
        redirect()
      })
  }, [])
}
