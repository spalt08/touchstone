import { generateId } from 'helpers'

// TODO: replace with env constant
const githubClientId = '56beab967846d0088cbe'
const githubClientSecret = '9283fe766c8ae966abdd9e7a5719959f216786e6'
const origin = document.location.origin

/**
 * Ref: https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#1-request-a-users-github-identity
 */
export function useGithubRedirect() {
  const redirectUri = encodeURIComponent(origin + '/oauth')
  const state = generateId(20)

  localStorage.setItem('github_oauth_state', state)
  localStorage.setItem('github_oauth_redirect_url', document.location.href)

  return (
    `https://github.com/login/oauth/authorize` +
    `?client_id=${githubClientId}` +
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
  const searchString = document.location.search.slice(1)
  const { code, state } = searchString.split('&').reduce<Record<string, string>>((acc, subString) => {
    const [key, value] = subString.split('=')
    acc[key] = value

    return acc
  }, {})

  const localState = localStorage.getItem('github_oauth_state')
  const localRedirectUrl = localStorage.getItem('github_oauth_redirect_url') || origin

  // TODO: display error
  function redirect() {
    document.location.replace(localRedirectUrl)
  }

  if (localState !== state) {
    redirect()
    return
  }

  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: githubClientId,
      client_secret: githubClientSecret,
      state,
      code,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch(redirect)
}
