import { API_BASE_URL_OVERRIDE } from 'const'
import { API } from 'helpers/api'

// Ref: https://github.com/acacode/swagger-typescript-api
export const api = new API({
  securityWorker: (token: string) => {
    return {
      headers: { Authorization: `Bearer ${token}` },
    }
  },
})

// Useful for deploy previews and local development with local API server
if (API_BASE_URL_OVERRIDE) {
  api.baseUrl = API_BASE_URL_OVERRIDE
}

export function useApi() {
  return api
}
