import React, { useCallback, useMemo, useState } from 'react'
import { BenchmarkSetupEdit, Header, Section, Wrapper } from 'components/layouts'
import { Button, FullscreenProgressBar } from 'components/ui'
import { BenchmarkTestResult, BenchmarkTestSuite, generateId } from 'helpers'
import TestCaseEdit from '../TestCaseEdit/TestCaseEdit'

const defaultSetupCode = 'const data = [...Array(1000).keys()]'
const defaultTestSuiteCode = ['data.find((x) => x == 100)', 'data.find((x) => x == 200)']

function createTestSuite(code = ''): BenchmarkTestSuite {
  return { title: 'Test Case', code, isDeffered: false }
}

export type Props = {
  setupCodeJS?: string
  testSuites?: BenchmarkTestSuite[]
  testResults?: BenchmarkTestResult[]
  currentRunningSuite?: number
  onTestRun: (setupCodeJS: string, testSuites: BenchmarkTestSuite[]) => unknown
}

export default function BenchmarkEdit({ testSuites, setupCodeJS, currentRunningSuite, testResults, onTestRun }: Props) {
  const testSuiteMap = useMemo(() => {
    const map = new Map<string, BenchmarkTestSuite>()

    if (testSuites) {
      for (const testSuite of testSuites) {
        const localId = generateId()
        map.set(localId, { ...testSuite })
      }
    } else {
      for (const defaultCodeItem of defaultTestSuiteCode) {
        const localId = generateId()
        map.set(localId, createTestSuite(defaultCodeItem))
      }
    }

    return map
  }, [testSuites])

  function getTestSuitesList() {
    return Array.from(testSuiteMap.keys())
  }

  const [setupCode, setSetupCode] = useState(setupCodeJS || defaultSetupCode)
  const [testSuitesList, setTestSuitesList] = useState(getTestSuitesList())
  const updateTestSuitesList = setTestSuitesList.bind(null, getTestSuitesList)

  const handleTestSuiteAdd = useCallback(() => {
    const localId = generateId()
    testSuiteMap.set(localId, createTestSuite())
    updateTestSuitesList()
  }, [testSuiteMap])

  const handleTestSuiteDelete = useCallback(
    (localId: string) => {
      testSuiteMap.delete(localId)
      updateTestSuitesList()
    },
    [testSuiteMap]
  )

  const handleTestSuiteCodeUpdate = useCallback(
    (localId: string, data: string) => {
      const testSuite = testSuiteMap.get(localId)

      if (testSuite) {
        testSuite.code = data
      }
    },
    [testSuiteMap]
  )

  const handleTestSuiteDeferredUpdate = useCallback(
    (localId: string, data: boolean) => {
      const testSuite = testSuiteMap.get(localId)

      if (testSuite) {
        testSuite.isDeffered = data
      }
    },
    [testSuiteMap]
  )

  const handleTestRunIntent = useCallback(() => {
    onTestRun(setupCode, Array.from(testSuiteMap.values()))
  }, [setupCode, testSuiteMap])

  const bestTestResult =
    testResults && testResults.length > 0
      ? testResults.reduce((max, current) => (current.hz > max.hz ? current : max))
      : undefined

  const progress =
    typeof currentRunningSuite === 'number' && currentRunningSuite > -1
      ? (currentRunningSuite + 1) / testSuitesList.length
      : 0

  return (
    <>
      {currentRunningSuite !== testSuitesList.length && <FullscreenProgressBar progress={progress} />}
      <Header />
      <Section>
        <Wrapper>
          <BenchmarkSetupEdit
            javaScriptCode={setupCode}
            onJavaScriptCodeUpdated={setSetupCode}
            onTestRunClick={handleTestRunIntent}
          />
        </Wrapper>
      </Section>
      {testSuitesList.map((localId, index) => (
        <Wrapper key={localId}>
          <TestCaseEdit
            localId={localId}
            testSuite={testSuiteMap.get(localId)}
            testResult={testResults?.[index]}
            bestTestResult={bestTestResult}
            isRunning={currentRunningSuite === index}
            onDeleteIntent={handleTestSuiteDelete}
            onCodeUpdated={handleTestSuiteCodeUpdate}
            onDefferedUpdated={handleTestSuiteDeferredUpdate}
          />
        </Wrapper>
      ))}
      <Wrapper>
        <Button variant='area' icon='Plus' onClick={handleTestSuiteAdd}>
          Add Test Case
        </Button>
      </Wrapper>
      <div style={{ height: '80px' }}></div>
    </>
  )
}
