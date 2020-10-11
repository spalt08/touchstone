import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Grid, TextareaAutosize, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useBenchmarkSetup } from 'hooks/benchmark'

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

  for (let i = 0; i < suitesCount; i++) {
    const key = `suite_${i}`
    editors[i] = (
      <TextareaAutosize
        key={key}
        ref={register()}
        name={key}
        defaultValue={localStorage.getItem(key) || undefined}
        placeholder={`Suite #${i + 1}`}
        rowsMin={5}
      />
    )
  }

  return (
    <Box p={4} component='form' onSubmit={handleSubmit(onRunBenchmark)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4'>Setup code:</Typography>
          <Box display='flex' flexDirection='column' alignItems='stretch' marginTop={1}>
            <TextareaAutosize
              defaultValue={localStorage.getItem('setupCode') || undefined}
              name='setupCode'
              ref={register()}
              placeholder='Insert your setup code here'
              rowsMin={5}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h4'>Suites:</Typography>
          <Box display='flex' flexDirection='column' alignItems='stretch' marginTop={1}>
            {editors}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={onAddMore}>Add more</Button>
          <Button type='submit'>Run benchmark</Button>
        </Grid>

        <Grid item xs={12}>
          <pre>{results.join('\n')}</pre>
          {isRunning && <CircularProgress />}
        </Grid>
      </Grid>
    </Box>
  )
}
