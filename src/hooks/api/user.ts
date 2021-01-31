import { GithubLoginRequest } from 'helpers/api'
import { useAuthorization } from 'hooks/auth'
import { queryCache, useMutation, useQuery } from 'react-query'
import { api } from './api'

const meQueryCacheKey = 'user/me'

export function useGithubLoginMutation() {
  const { setToken } = useAuthorization()

  return useMutation((data: GithubLoginRequest) => api.user.login(data), {
    onSuccess: (data) => {
      setToken(data.token)
      queryCache.setQueryData(meQueryCacheKey, data.user)
    },
  })
}

export function useAccount() {
  return useQuery(meQueryCacheKey, () => {
    if (api.hasSecurityData()) {
      return api.user.me()
    } else {
      return Promise.resolve(undefined)
    }
  })
}
