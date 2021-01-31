export type BenchmarkTestSuite = {
  title: string
  code: string
  isDeffered: boolean
}

export type BenchmarkTestResult = {
  hz: number
  rme: number
  size: number
}
