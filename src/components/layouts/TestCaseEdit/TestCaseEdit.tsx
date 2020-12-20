import React from 'react'

import { TrashCan } from 'components/icons'
import { CodeEditor, InlineTextInput, Checkbox, RunningIndicator, RelativePerformanceIndicator } from 'components/ui'
import { BenchmarkTestResult, BenchmarkTestSuite } from 'helpers'

import styles from './TestCaseEdit.module.scss'

export type Props = {
  localId: string
  testSuite?: BenchmarkTestSuite
  testResult?: BenchmarkTestResult
  bestTestResult?: BenchmarkTestResult
  isRunning?: boolean
  onDeleteIntent?: (localId: string) => unknown
  onCodeUpdated?: (localId: string, data: string) => unknown
  onDefferedUpdated?: (localId: string, data: boolean) => unknown
}

export default function TestCaseEdit({
  localId,
  testSuite,
  testResult,
  bestTestResult,
  isRunning,
  onDeleteIntent,
  onCodeUpdated,
  onDefferedUpdated,
}: Props) {
  let suiteDescription = 'Have not tested yet'
  let suiteIndicator = null
  const defaultTitle = testSuite?.title || 'Test Suite'

  if (testResult && bestTestResult) {
    suiteIndicator = (
      <RelativePerformanceIndicator className={styles.relativeResults} max={bestTestResult.hz} value={testResult.hz} />
    )
  }

  if (isRunning) {
    suiteIndicator = <RunningIndicator />
    suiteDescription = ''
  }

  if (testResult) {
    suiteDescription =
      testResult.hz.toFixed(0) +
      ' ops/sec \xb1' +
      testResult.rme.toFixed(2) +
      '% (' +
      testResult.size +
      ' runs sampled)'
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <InlineTextInput defaultValue={defaultTitle} className={styles.title} />
        <Checkbox
          label='Deferred'
          defaultValue={testSuite?.isDeffered}
          onChange={onDefferedUpdated?.bind(null, localId)}
        />
        <div className={styles.operations}>{suiteDescription}</div>
        {suiteIndicator}
      </div>
      <CodeEditor defaultValue={testSuite?.code} onBlur={onCodeUpdated?.bind(null, localId)} />
      <div className={styles.deleteIcon} onClick={onDeleteIntent?.bind(null, localId)}>
        <TrashCan pathClassName={styles.deleteIconFill} />
      </div>
    </div>
  )
}
