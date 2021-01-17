import { GithubLoginRequest } from 'helpers/api'
import { useMutation } from 'react-query'
import { useApi } from './api'

export function useGithubLoginMutation() {
  const api = useApi()

  return useMutation((data: GithubLoginRequest) => {
    const result = api.login.userLogin(data)
    console.log(result)
    return result
  })
}
