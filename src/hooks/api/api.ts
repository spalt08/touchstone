import { Api } from 'helpers/api'

// Ref: https://github.com/acacode/swagger-typescript-api
const api = new Api()

export function useApi() {
  return api
}
