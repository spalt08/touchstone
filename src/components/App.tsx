import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useBenchmarkSetup } from 'hooks/benchmark'
import { BenchmarkSetupEdit, Header, Section, TestCaseEdit, Wrapper } from './layouts'
import { Button } from './ui'

// temporary onboarding
if (localStorage.getItem('setupCode') === null) {
  localStorage.setItem('setupCode', 'const data = [...Array(1000).keys()]')
  localStorage.setItem('suitesCount', '4')
  localStorage.setItem('suite_0', 'data.find(x => x == 100)')
  localStorage.setItem('suite_1', 'data.find(x => x == 200)')
  localStorage.setItem('suite_2', 'data.find(x => x == 400)')
  localStorage.setItem('suite_3', 'data.find(x => x == 800)')
}

export default function App() {
  const { register, handleSubmit } = useForm()
  const [setupBenchmark, { data: benchmarkId, isSuccess: isBenchmarkReady }] = useBenchmarkSetup()
  const [suitesCount, setSuitesCount] = useState(+(localStorage.getItem('suitesCount') || 1))
  const [isRunning, setRunning] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const editors = new Array(suitesCount)

  const onDeleteCase = useCallback(() => {
    setSuitesCount((value) => value - 1)
  }, [])

  const onAddMore = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    setSuitesCount((value) => value + 1)
  }, [])

  const onRunBenchmark = useCallback(
    (payload) => {
      const suites = new Array(suitesCount)

      for (let i = 0; i < suitesCount; i++) {
        suites[i] = payload[`suite_${i}`]
        localStorage.setItem(`suite_${i}`, suites[i])
      }

      localStorage.setItem('setupCode', payload.setupCode)
      localStorage.setItem('suitesCount', suites.length.toString())

      setupBenchmark({
        setupCode: payload.setupCode,
        suites,
      })
    },
    [suitesCount]
  )

  useEffect(() => {
    if (isBenchmarkReady && benchmarkId) {
      setRunning(true)
      setResults([])

      const worker = new Worker(`./benchmark/${benchmarkId}`)

      worker.addEventListener('message', (event) => {
        const message = event.data

        if (message === 'finish') {
          setRunning(false)
          worker.terminate()
        } else {
          setResults((state) => [...state, message])
        }
      })

      return () => worker.terminate()
    }

    return () => null
  }, [isBenchmarkReady, benchmarkId])

  const opsec = []

  for (let i = 0; i < results.length; i++) {
    const match = results[i].match(/x ([0-9,]+)/)

    if (match) {
      opsec[i] = +match[1].replace(/,/g, '')
    }
  }

  const opsecMax = Math.max(...opsec) || 0

  for (let i = 0; i < suitesCount; i++) {
    const key = `suite_${i}`
    editors[i] = (
      <Wrapper key={key}>
        <TestCaseEdit
          opsec={opsec[i]}
          opsecMax={opsecMax}
          register={register}
          isRunning={isRunning && opsec.length === i}
          inputName={key}
          defaultCode={localStorage.getItem(key) || undefined}
          title={`Test Case #${i + 1}`}
          resultText={results[i]}
          onDelete={onDeleteCase}
        />
      </Wrapper>
    )
  }
  return (
    <>
      <Header />
      <form
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        onSubmit={handleSubmit(onRunBenchmark)}
      >
        <Section>
          <Wrapper>
            <BenchmarkSetupEdit javaScriptCode={localStorage.getItem('setupCode') || undefined} register={register} />
          </Wrapper>
        </Section>
        {editors}
        <Wrapper>
          <Button variant='area' icon='Plus' onClick={onAddMore}>
            Add Test Case
          </Button>
        </Wrapper>
        <div style={{ height: '80px' }}></div>
      </form>
    </>
  )
}
