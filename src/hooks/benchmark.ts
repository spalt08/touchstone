import { useMutation } from 'react-query'
import { serviceWorkerRequest } from 'worker/client'
import { BenchmarkRequest } from 'worker/extensions/benchmark_builder'

export function useBenchmarkSetup() {
  return useMutation<string, Error, BenchmarkRequest>((request) => {
    return serviceWorkerRequest('register_benchmmark', request)
  })
}
