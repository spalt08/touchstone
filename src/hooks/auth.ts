import { api } from './api/api'

const FIELD_AUTH_TOKEN = 'user_token'

export function useAuthorization() {
  return {
    token: localStorage.getItem(FIELD_AUTH_TOKEN),
    setToken: (token: string) => {
      localStorage.setItem(FIELD_AUTH_TOKEN, token)
      api.setSecurityData(token)
    },
    removeToken: () => {
      localStorage.removeItem(FIELD_AUTH_TOKEN)
      api.setSecurityData('')
    },
  }
}

export function initAuthorization() {
  const token = localStorage.getItem(FIELD_AUTH_TOKEN)

  if (token) {
    api.setSecurityData(token)
  }
}
