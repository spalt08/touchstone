import React, { useEffect, useState } from 'react'
import { BenchmarkEdit } from 'components/layouts'
import { useBenchmarkSetup } from 'hooks/benchmark'
import { BenchmarkTestResult, BenchmarkTestSuite } from 'helpers'

export function BenchmarkEditPage() {
  const [currentRunningSuite, setCurrentRunningSuite] = useState<number>(-1)
  const [testResults, setTestResuts] = useState<BenchmarkTestResult[]>([])
  const [setupWorker, { data: workerId }] = useBenchmarkSetup()

  useEffect(() => {
    if (workerId) {
      setCurrentRunningSuite(0)
      setTestResuts([])

      const worker = new Worker(`./benchmark/${workerId}`)

      worker.addEventListener('message', (event) => {
        const message = event.data

        if (message === 'finish') {
          setCurrentRunningSuite(-1)
          worker.terminate()
        } else {
          setCurrentRunningSuite((state) => state + 1)
          setTestResuts((state) => [...state, message])
        }
      })

      return () => worker.terminate()
    }

    return () => null
  }, [workerId])

  function handleTestRun(setupCode: string, testSuites: BenchmarkTestSuite[]) {
    setupWorker({ setupCode, suites: testSuites.map(({ code }) => code) })
  }

  return <BenchmarkEdit onTestRun={handleTestRun} currentRunningSuite={currentRunningSuite} testResults={testResults} />
}
